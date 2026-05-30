(() => {
"use strict";

const TABTAB_STORAGE_KEY = "aiDirectPrompts";
const TABTAB_PROMPT_TOKEN_PARAM = "_tabtab_prompt";
const TABTAB_MAX_PROMPT_LENGTH = 12000;
const TABTAB_PROMPT_TTL_MS = 2 * 60 * 1000;
const TABTAB_SUBMIT_TIMEOUT_MS = 12000;
const TABTAB_EDITOR_SYNC_DELAY_MS = 260;
const TABTAB_BOOT_DELAY_MS = 500;
const TABTAB_BOOT_MAX_ATTEMPTS = 18;
const TABTAB_TOKEN_CLEANUP_DURATION_MS = 15000;

const PROVIDERS = {
  "chatgpt.com": {
    engineId: "chatgpt",
    inputSelectors: [
      "#prompt-textarea",
      "textarea[placeholder]",
      "div[contenteditable=\"true\"]"
    ],
    submitSelectors: [
      "#composer-submit-button",
      "button[data-testid=\"send-button\"]",
      "button[aria-label*=\"发送提示\"]",
      "button[aria-label*=\"Send\"]",
      "button[aria-label*=\"发送\"]"
    ]
  },
  "claude.ai": {
    engineId: "claude",
    inputSelectors: [
      "div.ProseMirror[contenteditable=\"true\"]",
      "[contenteditable=\"true\"][data-testid]",
      "div[contenteditable=\"true\"]",
      "textarea"
    ],
    submitSelectors: [
      "button[data-testid=\"send-button\"]",
      "button[aria-label*=\"Send message\"]",
      "button[aria-label*=\"Send Message\"]",
      "button[aria-label*=\"Send\"]",
      "button[aria-label*=\"Submit\"]",
      "button[aria-label*=\"发送\"]",
      "button[aria-label*=\"提交\"]",
      "button[aria-label*=\"傳送\"]",
      "button[type=\"submit\"]"
    ]
  },
  "gemini.google.com": {
    engineId: "gemini",
    inputSelectors: [
      "rich-textarea div[contenteditable=\"true\"]",
      "div[contenteditable=\"true\"]",
      "textarea"
    ],
    submitSelectors: [
      "button[aria-label*=\"Send\"]",
      "button[aria-label*=\"Send message\"]",
      "button[aria-label*=\"发送\"]",
      "button[aria-label*=\"提交\"]",
      "button[aria-label*=\"傳送\"]",
      "button[aria-label*=\"Submit\"]"
    ]
  },
  "grok.com": {
    engineId: "grok",
    inputSelectors: [
      "div.ProseMirror[contenteditable=\"true\"]",
      "div[contenteditable=\"true\"]",
      "textarea"
    ],
    submitSelectors: [
      "button[data-testid=\"chat-submit\"]",
      "button[aria-label*=\"Send\"]",
      "button[aria-label*=\"发送\"]",
      "button[aria-label*=\"提交\"]",
      "button[type=\"submit\"]"
    ]
  }
};

window.tabTabSubmitStoredPrompt = submitStoredPrompt;
window.tabTabSubmitPrompt = submitPrompt;

consumeStoredPromptForCurrentProvider();
watchPromptTokenCleanup();

function providerForLocation(currentLocation) {
  const host = currentLocation.hostname.replace(/^www\./, "");
  return PROVIDERS[host] || null;
}

async function submitStoredPrompt(token) {
  const promptText = await readPromptFromStorage(token);
  const result = await submitPrompt(promptText);
  if (shouldRemoveStoredPrompt(result.status)) {
    await removePromptFromStorage(token);
  }
  return result;
}

async function submitPrompt(promptText) {
  const provider = providerForLocation(location);
  if (!provider) {
    return { status: "unsupported-host" };
  }
  if (!promptText) {
    return { status: "missing-prompt" };
  }
  const status = await submitPromptWhenReady(provider, promptText);
  return { status };
}

async function readPromptFromStorage(token) {
  if (!token || !chrome.storage?.local) {
    return "";
  }
  const result = await chrome.storage.local.get({ [TABTAB_STORAGE_KEY]: {} });
  const prompts = result[TABTAB_STORAGE_KEY] || {};
  const item = prompts[token];
  return String(item?.prompt || "").trim().slice(0, TABTAB_MAX_PROMPT_LENGTH);
}

async function removePromptFromStorage(token) {
  if (!token || !chrome.storage?.local) {
    return;
  }
  const result = await chrome.storage.local.get({ [TABTAB_STORAGE_KEY]: {} });
  const prompts = result[TABTAB_STORAGE_KEY] || {};
  delete prompts[token];
  await chrome.storage.local.set({ [TABTAB_STORAGE_KEY]: prompts });
}

async function consumeStoredPromptForCurrentProvider() {
  if (!chrome.storage?.local) {
    return;
  }
  const provider = providerForLocation(location);
  if (!provider) {
    return;
  }
  const token = promptTokenFromLocation(location);
  cleanupPromptTokenFromUrl();
  for (let attempt = 0; attempt < TABTAB_BOOT_MAX_ATTEMPTS; attempt += 1) {
    const entry = await findStoredPromptForProvider(provider, token);
    if (!entry) {
      await delay(TABTAB_BOOT_DELAY_MS);
      continue;
    }
    const result = await submitStoredPrompt(entry.token);
    if (isTerminalStatus(result.status)) {
      return;
    }
    await delay(TABTAB_BOOT_DELAY_MS);
  }
}

async function findStoredPromptForProvider(provider, targetToken) {
  const result = await chrome.storage.local.get({ [TABTAB_STORAGE_KEY]: {} });
  const prompts = result[TABTAB_STORAGE_KEY] || {};
  const now = Date.now();
  let changed = false;
  for (const [storedToken, item] of Object.entries(prompts)) {
    const createdAt = Number(item?.createdAt || 0);
    const expired = now - createdAt >= TABTAB_PROMPT_TTL_MS;
    if (expired) {
      delete prompts[storedToken];
      changed = true;
      continue;
    }
  }
  if (changed) {
    await chrome.storage.local.set({ [TABTAB_STORAGE_KEY]: prompts });
  }
  const item = targetToken
    ? prompts[targetToken]
    : latestStoredPromptForProvider(prompts, provider);
  if (!item || item.engineId !== provider.engineId || !item.prompt) {
    return null;
  }
  return { token: targetToken || item.token, createdAt: Number(item.createdAt || 0) };
}

function latestStoredPromptForProvider(prompts, provider) {
  return Object.entries(prompts)
    .filter(([, item]) => item?.engineId === provider.engineId && item.prompt)
    .map(([token, item]) => ({ ...item, token }))
    .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))[0] || null;
}

function promptTokenFromLocation(currentLocation) {
  try {
    return new URL(currentLocation.href).searchParams.get(TABTAB_PROMPT_TOKEN_PARAM) || "";
  } catch {
    return "";
  }
}

function urlWithoutPromptToken(currentLocation) {
  try {
    const url = new URL(currentLocation.href);
    url.searchParams.delete(TABTAB_PROMPT_TOKEN_PARAM);
    return url.href;
  } catch {
    return currentLocation.href;
  }
}

function cleanupPromptTokenFromUrl() {
  if (!promptTokenFromLocation(location)) {
    return false;
  }
  history.replaceState(null, "", urlWithoutPromptToken(location));
  return true;
}

function watchPromptTokenCleanup() {
  const startedAt = Date.now();
  cleanupPromptTokenFromUrl();
  const intervalId = window.setInterval(() => {
    cleanupPromptTokenFromUrl();
    if (Date.now() - startedAt >= TABTAB_TOKEN_CLEANUP_DURATION_MS) {
      window.clearInterval(intervalId);
    }
  }, 500);
}

function isTerminalStatus(status) {
  return status === "submitted"
    || status === "missing-prompt"
    || status === "unsupported-host";
}

function shouldRemoveStoredPrompt(status) {
  return status === "submitted"
    || status === "missing-prompt"
    || status === "unsupported-host";
}

async function submitPromptWhenReady(config, prompt) {
  const input = await waitForElement(config.inputSelectors, isWritableInput, TABTAB_SUBMIT_TIMEOUT_MS);
  if (!input) {
    return "input-not-found";
  }
  focusAndSetInputValue(input, prompt);
  await delay(TABTAB_EDITOR_SYNC_DELAY_MS);
  const submitButton = await waitForElement(config.submitSelectors, isClickableButton, 6000);
  if (submitButton && await clickSubmitButton(submitButton)) {
    return "submitted";
  }
  submitWithEnter(input);
  await delay(900);
  return inputText(input).trim() === prompt.trim() ? "filled" : "submitted";
}

function waitForElement(selectors, predicate, timeoutMs) {
  const startedAt = Date.now();
  return new Promise((resolve) => {
    const find = () => {
      for (const selector of selectors) {
        const nodes = [...document.querySelectorAll(selector)];
        const match = nodes.find(predicate);
        if (match) {
          resolve(match);
          return true;
        }
      }
      if (Date.now() - startedAt > timeoutMs) {
        resolve(null);
        return true;
      }
      return false;
    };

    if (find()) {
      return;
    }
    const observer = new MutationObserver(() => {
      if (find()) {
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["aria-disabled", "disabled", "data-disabled", "class"],
      childList: true,
      subtree: true
    });
    window.setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeoutMs + 100);
  });
}

function isWritableInput(node) {
  if (!(node instanceof HTMLElement)) {
    return false;
  }
  if (node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement) {
    return !node.disabled && !node.readOnly && isVisible(node);
  }
  return node.isContentEditable && isVisible(node);
}

function isClickableButton(node) {
  return node instanceof HTMLButtonElement
    && !node.disabled
    && node.getAttribute("aria-disabled") !== "true"
    && node.getAttribute("data-disabled") !== "true"
    && isVisible(node);
}

function isVisible(node) {
  const rect = node.getBoundingClientRect();
  const style = window.getComputedStyle(node);
  return rect.width > 0
    && rect.height > 0
    && style.visibility !== "hidden"
    && style.display !== "none";
}

function focusAndSetInputValue(input, value) {
  input.focus();
  if (input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) {
    const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), "value")?.set;
    if (setter) {
      setter.call(input, value);
    } else {
      input.value = value;
    }
    dispatchInputLikeEvent(input, "input", value);
    dispatchBasicEvent(input, "change");
    return;
  }
  setContentEditableValue(input, value);
}

function setContentEditableValue(input, value) {
  input.focus();
  const selection = window.getSelection?.();
  if (selection) {
    const range = document.createRange();
    range.selectNodeContents(input);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  const inserted = document.execCommand?.("insertText", false, value);
  if (!inserted || inputText(input).trim() !== value.trim()) {
    input.textContent = "";
    input.appendChild(document.createTextNode(value));
  }
  dispatchInputLikeEvent(input, "input", value);
  dispatchBasicEvent(input, "change");
}

async function clickSubmitButton(button) {
  button.focus({ preventScroll: true });
  const rect = button.getBoundingClientRect();
  const eventOptions = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    button: 0,
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2
  };
  for (const type of ["pointerdown", "mousedown", "pointerup", "mouseup", "click"]) {
    dispatchMouseLikeEvent(button, type, eventOptions);
  }
  await delay(900);
  return true;
}

function submitWithEnter(input) {
  input.focus();
  for (const type of ["keydown", "keypress", "keyup"]) {
    dispatchKeyboardLikeEvent(input, type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13
    });
  }
}

function dispatchInputLikeEvent(target, type, data) {
  try {
    target.dispatchEvent(new InputEvent(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      inputType: "insertText",
      data
    }));
    return;
  } catch {
    dispatchBasicEvent(target, type);
  }
}

function dispatchMouseLikeEvent(target, type, options) {
  try {
    target.dispatchEvent(new MouseEvent(type, options));
    return;
  } catch {
    dispatchBasicEvent(target, type, options);
  }
}

function dispatchKeyboardLikeEvent(target, type, options) {
  try {
    target.dispatchEvent(new KeyboardEvent(type, options));
    return;
  } catch {
    dispatchBasicEvent(target, type, options);
  }
}

function dispatchBasicEvent(target, type, options = {}) {
  try {
    target.dispatchEvent(new Event(type, { bubbles: true, cancelable: true, composed: true, ...options }));
    return;
  } catch {
    const event = document.createEvent("Event");
    event.initEvent(type, true, true);
    target.dispatchEvent(event);
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function inputText(input) {
  return input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement
    ? input.value
    : input.textContent || "";
}
})();
