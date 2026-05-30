# tab-tab Chrome 扩展

`tab-tab` 是一个给 Chrome 新标签页用的本地扩展。它把搜索、常用网站、AI 入口、书签和最近浏览放在同一页，让你打开新标签页时能直接回到要去的地方。

## 预览

| 日间模式 | 夜间模式 |
| --- | --- |
| ![tab-tab 日间模式](docs/previews/tab-tab-light.png) | ![tab-tab 夜间模式](docs/previews/tab-tab-dark.png) |

## 适合谁

如果你每天会反复打开 Google、GitHub、Notion、Figma、Gmail、ChatGPT、Claude 这类网站，也经常从浏览历史里找刚看过的页面，`tab-tab` 会把这些动作收在一个更安静的新标签页里。

它不需要账号，不上传浏览数据，也不要求你迁移书签。安装后打开新标签页，就可以直接搜索、进入常用网站，或从最近浏览里继续刚才的页面。

## 主要功能

- **常用网站**：把搜索、效率工具、社交、设计、开发和 AI 入口整理成清楚的分组。
- **最近浏览**：自动显示近期反复访问的网站，适合继续阅读、继续工作或找回刚打开过的页面。
- **自选书签**：选择一个 Chrome 书签文件夹，在新标签页里直接浏览。
- **快速搜索**：在页面中央输入关键词或网址，直接搜索或跳转。
- **AI 直达**：可从新标签页把问题送到常用 AI 页面，少一次复制和切换。
- **本地偏好**：主题、常用入口、置顶历史和书签选择都保存在浏览器本地。

## 下载和安装

建议直接到 [Releases 页面](https://github.com/je44/tab-tab-chrome-extension/releases/latest) 下载最新打包产物。

当前版本安装包：[tab-tab-v1.0.0.zip](https://github.com/je44/tab-tab-chrome-extension/releases/download/v1.0/tab-tab-v1.0.0.zip)

1. 下载 `tab-tab-v1.0.0.zip` 并解压。
2. 打开 Chrome 的 `chrome://extensions/`。
3. 打开右上角「开发者模式」。
4. 点击「加载已解压的扩展程序」。
5. 选择刚才解压出来的文件夹。
6. 新建一个标签页，确认页面已经切换为 `tab-tab`。

## 权限说明

- `bookmarks`：读取你选择展示的书签文件夹。
- `history`：读取最近浏览记录，用来生成最近浏览区域。
- `favicon`：显示网站图标。
- `storage`：保存主题、入口、置顶和布局偏好。
- `tabs`、`scripting`：支持 AI 页面直达和自动填入。
- `http://*/*`、`https://*/*`：让扩展可以识别和展示网页入口。

所有偏好和浏览相关数据都保存在本地浏览器里。

## 项目结构

这是一个无构建步骤的 Chrome Manifest V3 扩展，整个目录可以直接交给 Chrome 加载。

- `manifest.json`：扩展声明、版本号、权限、图标和新标签页入口。
- `newtab.html`：新标签页页面结构。
- `newtab.css`：布局、主题、响应式规则和动效。
- `newtab.js`：页面运行逻辑，负责 Chrome API 读取、状态保存、渲染和交互。
- `ai-submit.js`：AI 页面直达后的输入辅助脚本。
- `icons/`：扩展图标、常用网站图标和 AI 图标。
- `docs/`：预览图、产品说明和图标来源记录。

## 打包发布

```sh
mkdir -p dist
zip -r -X dist/tab-tab-v1.0.0.zip manifest.json newtab.html newtab.css newtab.js ai-submit.js icons
jq empty manifest.json
node --check newtab.js
node --check ai-submit.js
unzip -t dist/tab-tab-v1.0.0.zip
```

发布包要求 `manifest.json` 位于 zip 根目录，并与 GitHub Release 版本保持一致。
