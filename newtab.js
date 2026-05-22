"use strict";

const PORTALS = [
  { title: "百度", url: "https://www.baidu.com", icon: "icons/portals/baidu.svg", category: "search" },
  { title: "知乎", url: "https://www.zhihu.com", icon: "icons/portals/zhihu.svg", category: "social" },
  { title: "哔哩哔哩", url: "https://www.bilibili.com", icon: "icons/portals/bilibili.svg", category: "media" },
  { title: "微博", url: "https://weibo.com", icon: "icons/portals/weibo.svg", category: "social" },
  { title: "淘宝", url: "https://www.taobao.com", icon: "icons/portals/taobao.svg", category: "shopping" },
  { title: "京东", url: "https://www.jd.com", icon: "icons/portals/jd.ico", category: "shopping" },
  { title: "GitHub", url: "https://github.com", icon: "icons/portals/github.svg", category: "developer" },
  { title: "MDN", url: "https://developer.mozilla.org", icon: "icons/portals/mdn.svg", category: "developer" },
  { title: "YouTube", url: "https://www.youtube.com", icon: "icons/portals/youtube.svg", category: "media" },
  { title: "Google", url: "https://www.google.com", icon: "icons/portals/google.svg", category: "search" },
  { title: "ChatGPT", url: "https://chatgpt.com", icon: "icons/portals/chatgpt.svg", category: "ai" },
  { title: "Claude", url: "https://claude.ai", icon: "icons/portals/claude.svg", category: "ai" },
  { title: "Gemini", url: "https://gemini.google.com", icon: "icons/portals/gemini.svg", category: "ai" },
  { title: "Perplexity", url: "https://www.perplexity.ai", icon: "icons/portals/perplexity.svg", category: "ai" },
  { title: "Notion", url: "https://www.notion.so", icon: "icons/portals/notion.svg", category: "productivity" },
  { title: "Figma", url: "https://www.figma.com", icon: "icons/portals/figma.svg", category: "design" },
  { title: "Vercel", url: "https://vercel.com", icon: "icons/portals/vercel.svg", category: "developer" },
  { title: "Cloudflare", url: "https://www.cloudflare.com", icon: "icons/portals/cloudflare.svg", category: "developer" },
  { title: "Gmail", url: "https://mail.google.com", icon: "icons/portals/gmail.svg", category: "productivity" },
  { title: "Google Drive", url: "https://drive.google.com", icon: "icons/portals/google-drive.svg", category: "productivity" },
  { title: "Discord", url: "https://discord.com", icon: "icons/portals/discord.svg", category: "social" },
  { title: "小红书", url: "https://www.xiaohongshu.com", icon: "icons/portals/xiaohongshu.svg", category: "social" },
  { title: "LinkedIn", url: "https://www.linkedin.com", icon: "icons/portals/linkedin.ico", category: "social" },
  { title: "Canva", url: "https://www.canva.com", icon: "icons/portals/canva.ico", category: "design" },
  { title: "飞书", url: "https://www.feishu.cn", icon: "icons/portals/feishu.png", category: "productivity" }
];
const CUSTOM_PORTALS_STORAGE_KEY = "customPortals";
const PINNED_HISTORY_STORAGE_KEY = "pinnedHistory";
const BOOKMARK_FOLDER_STORAGE_KEY = "bookmarkFolderId";
const BOOKMARK_LAYOUT_STORAGE_KEY = "bookmarkLayout";
const PORTAL_SECTION_ORDER_STORAGE_KEY = "portalSectionOrder";
const PORTAL_CATEGORIES_EXPANDED_STORAGE_KEY = "portalCategoriesExpanded";
const FEATURED_PORTALS_EXPANDED_STORAGE_KEY = "featuredPortalsExpanded";
const THEME_STORAGE_KEY = "themeMode";
const THEME_PALETTE_STORAGE_KEY = "themePalette";
const SEARCH_ENGINE_STORAGE_KEY = "quickSearchEngine";
const MAX_HISTORY_SITE_GROUPS = 9;
const MAX_HISTORY_PAGES_PER_SITE = 4;
const MAX_PINNED_HISTORY_ITEMS = 6;
const RECENT_HISTORY_LOOKBACK_MS = 24 * 60 * 60 * 1000;
const MIN_RECENT_DOMAIN_VISITS = 2;
const MAX_CUSTOM_PORTALS = 48;
const MAX_PORTAL_TITLE_LENGTH = 32;
const MAX_PORTAL_URL_LENGTH = 512;
const MAX_BOOKMARK_FOLDER_OPTIONS = 160;
const MAX_PORTAL_FEATURED_ITEMS = 6;
const COLLAPSED_FEATURED_PORTAL_ITEMS = 2;
const MAX_BOOKMARK_PORTAL_ITEMS = 120;
const MAX_BOOKMARK_HISTORY_ITEMS = 180;
const MAX_RECENT_BOOKMARK_ITEMS = 2;
const BOOKMARK_HISTORY_LOOKBACK_DAYS = 45;
const MEDIA_FEED_SOURCES = [
  { id: "infoq-cn", title: "InfoQ 中文", language: "zh", url: "https://www.infoq.cn/feed" },
  { id: "solidot", title: "Solidot", language: "zh", url: "https://www.solidot.org/index.rss" },
  { id: "qbitai", title: "量子位", language: "zh", url: "https://www.qbitai.com/feed" },
  { id: "oschina", title: "OSCHINA", language: "zh", url: "https://www.oschina.net/news/rss" },
  { id: "ruanyifeng", title: "科技爱好者周刊", language: "zh", url: "https://feeds.feedburner.com/ruanyifeng" },
  { id: "openai-news", title: "OpenAI News", language: "en", url: "https://openai.com/news/rss.xml" },
  { id: "huggingface-blog", title: "Hugging Face Blog", language: "en", url: "https://huggingface.co/blog/feed.xml" },
  { id: "latent-space", title: "Latent Space", language: "en", url: "https://www.latent.space/feed" },
  { id: "pragmatic-engineer", title: "The Pragmatic Engineer", language: "en", url: "https://newsletter.pragmaticengineer.com/feed" },
  { id: "github-engineering", title: "GitHub Engineering", language: "en", url: "https://github.blog/engineering/feed/" },
  { id: "cloudflare-blog", title: "Cloudflare Blog", language: "en", url: "https://blog.cloudflare.com/rss/" },
  { id: "netflix-techblog", title: "Netflix TechBlog", language: "en", url: "https://netflixtechblog.com/feed" },
  { id: "dan-luu", title: "Dan Luu", language: "en", url: "https://danluu.com/atom.xml" },
  { id: "lethain", title: "Irrational Exuberance", language: "en", url: "https://lethain.com/feeds.xml" },
  { id: "mit-tech-review", title: "MIT Technology Review", language: "en", url: "https://www.technologyreview.com/feed/" },
  { id: "ieee-spectrum", title: "IEEE Spectrum", language: "en", url: "https://spectrum.ieee.org/rss/fulltext" }
];
const MEDIA_FEED_SOURCE_PROFILES = {
  "infoq-cn": { topic: "engineering", score: 9 },
  solidot: { topic: "science", score: 8 },
  qbitai: { topic: "ai", score: 9 },
  oschina: { topic: "engineering", score: 8 },
  ruanyifeng: { topic: "engineering", score: 9 },
  "openai-news": { topic: "ai", score: 11 },
  "huggingface-blog": { topic: "ai", score: 10 },
  "latent-space": { topic: "ai", score: 10 },
  "pragmatic-engineer": { topic: "engineering", score: 10 },
  "github-engineering": { topic: "engineering", score: 10 },
  "cloudflare-blog": { topic: "engineering", score: 10 },
  "netflix-techblog": { topic: "engineering", score: 9 },
  "dan-luu": { topic: "engineering", score: 10 },
  lethain: { topic: "engineering", score: 9 },
  "mit-tech-review": { topic: "ai", score: 9 },
  "ieee-spectrum": { topic: "science", score: 9 }
};
const MEDIA_FEED_TOPIC_RULES = [
  {
    id: "ai",
    labelKey: "mediaFeedTopicAi",
    reasonKey: "mediaFeedReasonAi",
    keywords: ["ai", "agent", "agents", "llm", "model", "openai", "google ai", "anthropic", "deepseek", "gemini", "gpt", "机器学习", "模型", "智能体", "大模型", "人工智能", "生成式"]
  },
  {
    id: "engineering",
    labelKey: "mediaFeedTopicEngineering",
    reasonKey: "mediaFeedReasonEngineering",
    keywords: ["developer", "github", "open source", "api", "kubernetes", "database", "security", "cloud", "linux", "javascript", "python", "rust", "go ", "工程", "开源", "开发者", "数据库", "云原生", "安全", "漏洞", "代码"]
  },
  {
    id: "business",
    labelKey: "mediaFeedTopicBusiness",
    reasonKey: "mediaFeedReasonBusiness",
    keywords: ["startup", "funding", "ipo", "acquisition", "market", "business", "revenue", "company", "founder", "融资", "上市", "收购", "商业", "创业", "公司", "市场"]
  },
  {
    id: "product",
    labelKey: "mediaFeedTopicProduct",
    reasonKey: "mediaFeedReasonProduct",
    keywords: ["product", "launch", "app", "workflow", "design", "tool", "productivity", "发布", "产品", "工具", "效率", "设计", "体验", "应用"]
  },
  {
    id: "science",
    labelKey: "mediaFeedTopicScience",
    reasonKey: "mediaFeedReasonScience",
    keywords: ["research", "science", "chip", "robot", "quantum", "energy", "space", "ieee", "研究", "科学", "芯片", "机器人", "量子", "航天", "能源"]
  },
  {
    id: "consumer",
    labelKey: "mediaFeedTopicConsumer",
    reasonKey: "mediaFeedReasonConsumer",
    keywords: ["apple", "android", "iphone", "tesla", "ev", "device", "hardware", "gadget", "小米", "苹果", "手机", "硬件", "汽车", "设备", "消费"]
  }
];
const MEDIA_FEED_TYPE_FILTERS = new Set(["all", ...MEDIA_FEED_TOPIC_RULES.map((rule) => rule.id)]);
const MEDIA_FEED_DISCOVERY_SOURCES = [
  { id: "v2ex-hot", sourceTitle: "V2EX 热门", language: "zh", topic: "engineering", type: "v2ex", url: "https://www.v2ex.com/api/topics/hot.json", score: 9 },
  { id: "hackernews-top", sourceTitle: "Hacker News Top", language: "en", topic: "engineering", type: "hn", listUrl: "https://hacker-news.firebaseio.com/v0/topstories.json", score: 10 },
  { id: "hackernews-best", sourceTitle: "Hacker News Best", language: "en", topic: "engineering", type: "hn", listUrl: "https://hacker-news.firebaseio.com/v0/beststories.json", score: 11 },
  { id: "hackernews-show", sourceTitle: "Show HN", language: "en", topic: "product", type: "hn", listUrl: "https://hacker-news.firebaseio.com/v0/showstories.json", score: 9 },
  { id: "lobsters-hot", sourceTitle: "Lobsters", language: "en", topic: "engineering", type: "lobsters", url: "https://lobste.rs/hottest.json", score: 9 },
  { id: "arxiv-ai", sourceTitle: "arXiv AI", language: "en", topic: "ai", type: "arxiv", category: "cs.AI", score: 10 },
  { id: "devto-ai", sourceTitle: "DEV.to AI", language: "en", topic: "engineering", type: "devto", tag: "ai", score: 7 },
  { id: "devto-webdev", sourceTitle: "DEV.to Web Dev", language: "en", topic: "engineering", type: "devto", tag: "webdev", score: 7 }
];
const CUSTOM_MEDIA_FEEDS_STORAGE_KEY = "customMediaFeeds";
const MEDIA_FEED_FEEDBACK_STORAGE_KEY = "mediaFeedFeedback";
const MEDIA_FEED_ITEM_LIMIT = 48;
const MEDIA_FEED_SOURCE_ITEM_LIMIT = 8;
const MEDIA_FEED_DISCOVERY_ITEM_LIMIT = 8;
const MEDIA_FEED_INITIAL_ITEMS = 12;
const MEDIA_FEED_PAGE_SIZE = 8;
const MEDIA_FEED_TIMEOUT_MS = 8500;
const MAX_CUSTOM_MEDIA_FEEDS = 12;
const MAX_MEDIA_FEED_FEEDBACK_KEYS = 120;
const MEDIA_FEED_LARGE_CARD_INTERVAL = 5;
const LOW_VALUE_MEDIA_FEED_PATTERNS = [
  /早报|晚报|日报|周报|一周|盘点|合集|汇总|速览|快讯|活动|直播|中奖|优惠|招聘|促销|广告|发布会邀请/,
  /newsletter|roundup|daily brief|weekly recap|sponsored|webinar|event|hiring|coupon|deal/i
];
const DEFAULT_PORTAL_CATEGORY = "developer";
const DEFAULT_SEARCH_ENGINE = "google";
const DEFAULT_PORTAL_SECTION_ORDER = ["featured", "active"];
const COLLAPSED_PORTAL_CATEGORY_COUNT = 2;
const DEFAULT_THEME_MODE = "system";
const DEFAULT_THEME_PALETTE = "forest";
const CUSTOM_THEME_PALETTE_ID = "custom";
const DEFAULT_CUSTOM_THEME_COLORS = Object.freeze({ light: "#0d6d59", dark: "#82c8ae" });
const THEME_PALETTES = [
  {
    id: "forest",
    label: "松石",
    light: "#0d6d59",
    dark: "#82c8ae",
    modes: {
      light: {
        accent: "#0d6d59",
        accentStrong: "#074b3e",
        focus: "#2f82c4",
        paper: "#f7f8f3",
        panel: "#fffefa",
        panelSoft: "#f0f4ef",
        inputBg: "#fffefa",
        hoverBg: "#e8f2ee",
        ink: "#131915",
        muted: "#59655f",
        faint: "#6d7872"
      },
      dark: {
        accent: "#82c8ae",
        accentStrong: "#a8dcc8",
        focus: "#8abfe8",
        paper: "#101512",
        panel: "#171d1a",
        panelSoft: "#202922",
        inputBg: "#121815",
        hoverBg: "#25332d",
        ink: "#eff6f3",
        muted: "#b6c2bd",
        faint: "#83918b",
        onAccent: "#102019"
      }
    }
  },
  {
    id: "cobalt",
    label: "钴蓝",
    light: "#2f6fd6",
    dark: "#91c2ff",
    modes: {
      light: {
        accent: "#2f6fd6",
        accentStrong: "#1d4f9d",
        focus: "#0f8e8e",
        paper: "#f6f8fb",
        panel: "#ffffff",
        panelSoft: "#edf3fb",
        inputBg: "#ffffff",
        hoverBg: "#e5eefb",
        ink: "#111827",
        muted: "#586575",
        faint: "#728093"
      },
      dark: {
        accent: "#91c2ff",
        accentStrong: "#b4d6ff",
        focus: "#77d5c7",
        paper: "#0f141a",
        panel: "#161d25",
        panelSoft: "#202a36",
        inputBg: "#111820",
        hoverBg: "#273545",
        ink: "#eef5fb",
        muted: "#b5c1ce",
        faint: "#8291a1",
        onAccent: "#0d1b2a"
      }
    }
  },
  {
    id: "rose",
    label: "玫瑰",
    light: "#aa4d65",
    dark: "#eda2b4",
    modes: {
      light: {
        accent: "#aa4d65",
        accentStrong: "#7c3046",
        focus: "#7367c7",
        paper: "#faf7f5",
        panel: "#fffdfb",
        panelSoft: "#f5eeee",
        inputBg: "#fffdfb",
        hoverBg: "#f2e6e8",
        ink: "#1c1618",
        muted: "#675b5f",
        faint: "#827376"
      },
      dark: {
        accent: "#eda2b4",
        accentStrong: "#f3bdca",
        focus: "#b4abf0",
        paper: "#151112",
        panel: "#21171b",
        panelSoft: "#2b2024",
        inputBg: "#181316",
        hoverBg: "#35272d",
        ink: "#f8eff1",
        muted: "#c9b7bd",
        faint: "#97858b",
        onAccent: "#271116"
      }
    }
  }
];
const SEARCH_ENGINES = [
  { id: "google", label: "Google", icon: "icons/portals/google.svg", searchUrl: "https://www.google.com/search", queryParam: "q" },
  { id: "baidu", label: "百度", icon: "icons/portals/baidu.svg", searchUrl: "https://www.baidu.com/s", queryParam: "wd" },
  { id: "bing", label: "Bing", icon: "icons/portals/bing.svg", searchUrl: "https://www.bing.com/search", queryParam: "q" },
  { id: "duckduckgo", label: "DuckDuckGo", icon: "icons/portals/duckduckgo.svg", searchUrl: "https://duckduckgo.com/", queryParam: "q" },
  { id: "kagi", label: "Kagi", icon: "icons/portals/kagi.svg", searchUrl: "https://kagi.com/search", queryParam: "q" }
];
const PORTAL_CATEGORY_ORDER = [
  "custom",
  "developer",
  "ai",
  "productivity",
  "design",
  "search",
  "social",
  "shopping",
  "media",
  "other"
];
const BOOKMARK_CATEGORY_RULES = {
  developer: {
    hosts: ["github", "gitlab", "bitbucket", "stackoverflow", "stackexchange", "developer", "mozilla", "mdn", "npm", "vercel", "cloudflare", "docs", "api", "react", "vue", "svelte", "python", "nodejs", "docker"],
    text: ["开发", "代码", "工程", "编程", "技术", "文档", "接口", "源码", "仓库", "developer", "docs", "api", "code", "engineering", "programming"]
  },
  ai: {
    hosts: ["chatgpt", "openai", "claude", "anthropic", "gemini", "perplexity", "poe", "midjourney", "replicate", "huggingface", "cursor"],
    text: ["ai", "人工智能", "大模型", "模型", "提示词", "prompt", "agent", "智能体", "生成", "llm", "gpt", "Claude", "Gemini"]
  },
  productivity: {
    hosts: ["notion", "drive", "docs.google", "gmail", "calendar", "slack", "teams", "feishu", "larksuite", "office", "dropbox", "linear", "trello", "asana"],
    text: ["效率", "工作", "协作", "办公", "项目", "任务", "笔记", "文档", "productivity", "work", "office", "notes", "task", "calendar"]
  },
  design: {
    hosts: ["figma", "canva", "dribbble", "behance", "framer", "webflow", "uizard", "iconfont"],
    text: ["设计", "素材", "图片", "图标", "排版", "原型", "design", "ui", "ux", "mockup", "prototype", "icon"]
  },
  search: {
    hosts: ["google", "bing", "duckduckgo", "baidu", "kagi", "yandex", "sogou"],
    text: ["搜索", "搜尋", "search", "query", "检索"]
  },
  social: {
    hosts: ["x.com", "twitter", "linkedin", "discord", "weibo", "zhihu", "xiaohongshu", "reddit", "facebook", "instagram", "threads"],
    text: ["社交", "社区", "论坛", "问答", "social", "community", "forum"]
  },
  shopping: {
    hosts: ["taobao", "tmall", "jd", "amazon", "pinduoduo", "1688", "aliexpress", "ebay", "shopify"],
    text: ["购物", "商城", "电商", "订单", "优惠", "shopping", "shop", "store", "deal"]
  },
  media: {
    hosts: ["youtube", "bilibili", "netflix", "spotify", "music", "twitch", "douyin", "vimeo", "podcasts"],
    text: ["影音", "视频", "音乐", "播客", "直播", "media", "video", "music", "podcast", "stream"]
  }
};
const SITE_NAME_BY_KEY = {
  "b.ai": "B.AI",
  "bilibili.com": "哔哩哔哩",
  "chatgpt.com": "ChatGPT",
  "cloudflare.com": "Cloudflare",
  "developer.mozilla.org": "MDN",
  "discord.com": "Discord",
  "docs.b.ai": "B.AI Docs",
  "drive.google.com": "Google Drive",
  "figma.com": "Figma",
  "github.com": "GitHub",
  "gmail.com": "Gmail",
  "google.com": "Google",
  "linkedin.com": "LinkedIn",
  "npmjs.com": "npm",
  "notion.so": "Notion",
  "react.dev": "React",
  "stackoverflow.com": "Stack Overflow",
  "taobao.com": "淘宝",
  "trip.com": "Trip.com",
  "vercel.com": "Vercel",
  "x.com": "X",
  "xiaohongshu.com": "小红书",
  "youtube.com": "YouTube",
  "zhihu.com": "知乎"
};
const SITE_GROUP_OVERRIDES = {
  "docs.b.ai": "docs.b.ai",
  "drive.google.com": "drive.google.com",
  "console.firebase.google.com": "firebase.google.com",
  "firebase.google.com": "firebase.google.com",
  "mail.google.com": "gmail.com",
  "music.163.com": "music.163.com",
  "developer.mozilla.org": "developer.mozilla.org",
  "gemini.google.com": "gemini.google.com",
  "web.wechat.com": "wechat.com",
  "weixin.qq.com": "wechat.com"
};
const HOME_URL_BY_KEY = {
  "developer.mozilla.org": "https://developer.mozilla.org/",
  "docs.b.ai": "https://docs.b.ai/",
  "drive.google.com": "https://drive.google.com/",
  "gemini.google.com": "https://gemini.google.com/",
  "gmail.com": "https://mail.google.com/",
  "google.com": "https://www.google.com/",
  "react.dev": "https://react.dev/"
};
const SITE_GROUP_SUFFIXES = [
  "bilibili.com",
  "cloudflare.com",
  "github.com",
  "google.com",
  "linkedin.com",
  "npmjs.com",
  "notion.so",
  "stackoverflow.com",
  "taobao.com",
  "twitter.com",
  "vercel.com",
  "x.com",
  "xiaohongshu.com",
  "youtube.com",
  "zhihu.com"
];
const MULTIPART_PUBLIC_SUFFIXES = new Set([
  "com.cn",
  "net.cn",
  "org.cn",
  "com.hk",
  "com.tw",
  "com.au",
  "co.jp",
  "co.kr",
  "co.uk"
]);
const TITLE_SUFFIX_SEPARATORS = [
  " - ",
  " — ",
  " – ",
  " | ",
  "_",
  "-"
];
const AUTH_RELATED_HISTORY_HOSTS = new Set([
  "accounts.google.com",
  "appleid.apple.com",
  "auth.openai.com",
  "id.atlassian.com",
  "login.live.com",
  "login.microsoftonline.com",
  "oauth.telegram.org"
]);
const AUTH_RELATED_HISTORY_HOST_SUFFIXES = [
  ".auth0.com",
  ".okta.com",
  ".okta-emea.com",
  ".onelogin.com"
];
const AUTH_RELATED_HISTORY_HOST_PARTS = new Set([
  "auth",
  "login",
  "oauth",
  "signin",
  "sso"
]);
const STRONG_AUTH_HISTORY_PATH_SEGMENTS = new Set([
  "authorize",
  "authorization",
  "callback",
  "callbacks",
  "oauth",
  "oauth2",
  "saml",
  "sso"
]);
const AUTH_HISTORY_PATH_SEGMENTS = new Set([
  ...STRONG_AUTH_HISTORY_PATH_SEGMENTS,
  "auth",
  "login",
  "signin",
  "sign-in"
]);
const AUTH_HISTORY_QUERY_PARAMS = new Set([
  "client_id",
  "code",
  "oauth_token",
  "redirect_uri",
  "response_type",
  "samlrequest",
  "samlresponse",
  "scope",
  "state"
]);
const PORTAL_ICON_BY_SITE_KEY = Object.freeze(Object.fromEntries(PORTALS.map((portal) => {
  const url = new URL(portal.url);
  return [canonicalSiteHost(url.hostname), portal.icon];
})));
const DEFAULT_SITE_ICON_BY_SITE_KEY = Object.freeze({
  "airbnb.com": "icons/sites/airbnb.svg",
  "airtable.com": "icons/sites/airtable.svg",
  "alibabacloud.com": "icons/sites/alibabacloud.svg",
  "aliexpress.com": "icons/sites/aliexpress.svg",
  "alipay.com": "icons/sites/alipay.svg",
  "amd.com": "icons/sites/amd.svg",
  "angular.dev": "icons/sites/angular.svg",
  "anthropic.com": "icons/sites/anthropic.svg",
  "apple.com": "icons/sites/apple.svg",
  "arxiv.org": "icons/sites/arxiv.svg",
  "asana.com": "icons/sites/asana.svg",
  "atlassian.com": "icons/sites/atlassian.svg",
  "behance.net": "icons/sites/behance.svg",
  "bitbucket.org": "icons/sites/bitbucket.svg",
  "booking.com": "icons/sites/bookingdotcom.svg",
  "box.com": "icons/sites/box.svg",
  "bsky.app": "icons/sites/bluesky.svg",
  "bytedance.com": "icons/sites/bytedance.svg",
  "codesandbox.io": "icons/sites/codesandbox.svg",
  "coursera.org": "icons/sites/coursera.svg",
  "deepseek.com": "icons/sites/deepseek.svg",
  "digitalocean.com": "icons/sites/digitalocean.svg",
  "docker.com": "icons/sites/docker.svg",
  "douban.com": "icons/sites/douban.svg",
  "dribbble.com": "icons/sites/dribbble.svg",
  "dropbox.com": "icons/sites/dropbox.svg",
  "duolingo.com": "icons/sites/duolingo.svg",
  "ebay.com": "icons/sites/ebay.svg",
  "epicgames.com": "icons/sites/epicgames.svg",
  "expedia.com": "icons/sites/expedia.svg",
  "facebook.com": "icons/sites/facebook.svg",
  "firebase.google.com": "icons/sites/firebase.svg",
  "gitbook.io": "icons/sites/gitbook.svg",
  "gitlab.com": "icons/sites/gitlab.svg",
  "huggingface.co": "icons/sites/huggingface.svg",
  "icloud.com": "icons/sites/icloud.svg",
  "ieee.org": "icons/sites/ieee.svg",
  "instagram.com": "icons/sites/instagram.svg",
  "intel.com": "icons/sites/intel.svg",
  "itch.io": "icons/sites/itchdotio.svg",
  "khanacademy.org": "icons/sites/khanacademy.svg",
  "kuaishou.com": "icons/sites/kuaishou.svg",
  "kubernetes.io": "icons/sites/kubernetes.svg",
  "leetcode.com": "icons/sites/leetcode.svg",
  "line.me": "icons/sites/line.svg",
  "linear.app": "icons/sites/linear.svg",
  "mastodon.social": "icons/sites/mastodon.svg",
  "medium.com": "icons/sites/medium.svg",
  "messenger.com": "icons/sites/messenger.svg",
  "music.163.com": "icons/sites/neteasecloudmusic.svg",
  "netflix.com": "icons/sites/netflix.svg",
  "netlify.com": "icons/sites/netlify.svg",
  "nodejs.org": "icons/sites/nodedotjs.svg",
  "npmjs.com": "icons/sites/npm.svg",
  "nvidia.com": "icons/sites/nvidia.svg",
  "obsidian.md": "icons/sites/obsidian.svg",
  "paypal.com": "icons/sites/paypal.svg",
  "pinterest.com": "icons/sites/pinterest.svg",
  "producthunt.com": "icons/sites/producthunt.svg",
  "proton.me": "icons/sites/protonmail.svg",
  "pypi.org": "icons/sites/pypi.svg",
  "python.org": "icons/sites/python.svg",
  "quora.com": "icons/sites/quora.svg",
  "react.dev": "icons/sites/react.svg",
  "reddit.com": "icons/sites/reddit.svg",
  "replit.com": "icons/sites/replit.svg",
  "roblox.com": "icons/sites/roblox.svg",
  "shopify.com": "icons/sites/shopify.svg",
  "soundcloud.com": "icons/sites/soundcloud.svg",
  "spotify.com": "icons/sites/spotify.svg",
  "stackoverflow.com": "icons/sites/stackoverflow.svg",
  "steamcommunity.com": "icons/sites/steam.svg",
  "steampowered.com": "icons/sites/steam.svg",
  "stripe.com": "icons/sites/stripe.svg",
  "substack.com": "icons/sites/substack.svg",
  "supabase.com": "icons/sites/supabase.svg",
  "svelte.dev": "icons/sites/svelte.svg",
  "telegram.org": "icons/sites/telegram.svg",
  "threads.net": "icons/sites/threads.svg",
  "tiktok.com": "icons/sites/tiktok.svg",
  "trello.com": "icons/sites/trello.svg",
  "tripadvisor.com": "icons/sites/tripadvisor.svg",
  "tumblr.com": "icons/sites/tumblr.svg",
  "twitch.tv": "icons/sites/twitch.svg",
  "udemy.com": "icons/sites/udemy.svg",
  "vimeo.com": "icons/sites/vimeo.svg",
  "vuejs.org": "icons/sites/vuedotjs.svg",
  "wechat.com": "icons/sites/wechat.svg",
  "whatsapp.com": "icons/sites/whatsapp.svg",
  "wikipedia.org": "icons/sites/wikipedia.svg",
  "wolfram.com": "icons/sites/wolfram.svg",
  "wordpress.com": "icons/sites/wordpress.svg",
  "x.com": "icons/sites/x.svg",
  "yelp.com": "icons/sites/yelp.svg",
  "zoom.us": "icons/sites/zoom.svg"
});
const SITE_ICON_BY_SITE_KEY = Object.freeze({
  ...DEFAULT_SITE_ICON_BY_SITE_KEY,
  ...PORTAL_ICON_BY_SITE_KEY
});
const PORTAL_CATEGORY_BY_SITE_KEY = Object.freeze(Object.fromEntries(PORTALS.map((portal) => {
  const url = new URL(portal.url);
  return [canonicalSiteHost(url.hostname), portal.category];
})));
const DEFAULT_LOCALE = "zh-CN";
const SUPPORTED_LOCALES = ["zh-CN", "zh-TW", "en", "ja", "ko", "es", "fr", "de"];
const MESSAGES = {
  "zh-CN": {
    topbarLabel: "顶部功能区",
    shellLabel: "tab-tab 控制台",
    portalTitle: "导航中枢",
    mobilePortalTab: "快捷",
    mobileMediaTab: "信息",
    mobileHistoryTab: "历史",
    smartPortalTab: "智能常用",
    bookmarkPortalTab: "自选书签",
    portalCategoryFeatured: "常用入口",
    portalCategoryRecentBookmarks: "最近加入书签",
    portalCategoryCustom: "自定义",
    portalCategoryShopping: "购物",
    portalCategoryAi: "AI",
    portalCategorySocial: "社交",
    portalCategorySearch: "搜索",
    portalCategoryDeveloper: "开发",
    portalCategoryProductivity: "效率",
    portalCategoryMedia: "影音",
    portalCategoryDesign: "设计",
    portalCategoryOther: "其他",
    portalCategories: "智能分类",
    portalCategoriesExpand: "展开",
    portalCategoriesCollapse: "收起",
    featuredPortalsExpand: "展开",
    featuredPortalsCollapse: "收起",
    addPortal: "添加入口",
    portalName: "名称",
    portalUrl: "网址",
    portalCategory: "归类",
    portalNamePlaceholder: "例如：Notion",
    portalUrlPlaceholder: "https://www.notion.so",
    cancel: "取消",
    add: "添加",
    mediaTitle: "信息流",
    mediaFeedLoadingTitle: "正在读取信息流",
    mediaFeedLoadingBody: "稍后会显示最新资讯。",
    mediaFeedUpdated: "刚刚更新",
    mediaFeedFailedTitle: "暂时无法读取",
    mediaFeedFailedBody: "接口没有返回可显示内容，请稍后刷新。",
    mediaFeedEmptyTitle: "暂无资讯",
    mediaFeedEmptyBody: "接口暂时没有返回可显示内容。",
    mediaFeedRefresh: "刷新信息流",
    mediaFeedMore: "更多",
    mediaFeedNotInterested: "不感兴趣",
    mediaFeedNotInterestedDone: "已减少类似内容",
    mediaFeedAutoLoad: "继续滚动加载更多",
    mediaFeedAgentFocus: "Agent 重点",
    mediaFeedAgentStream: "继续跟踪",
    mediaFeedTopicAi: "AI",
    mediaFeedTopicEngineering: "工程",
    mediaFeedTopicBusiness: "商业",
    mediaFeedTopicProduct: "产品",
    mediaFeedTopicScience: "深科技",
    mediaFeedTopicConsumer: "消费科技",
    mediaFeedReasonAi: "模型、智能体或 AI 基础设施信号",
    mediaFeedReasonEngineering: "工程实践、开源或开发者生态信号",
    mediaFeedReasonBusiness: "公司、市场或商业模式变化",
    mediaFeedReasonProduct: "新产品、工具或效率工作流",
    mediaFeedReasonScience: "研究、硬件或前沿技术进展",
    mediaFeedReasonConsumer: "设备、平台或消费科技变化",
    mediaFeedReasonDefault: "来源多样化后的高价值条目",
    mediaFeedMetricHn: "{score} 分 · {comments} 条讨论",
    mediaFeedMetricReplies: "{count} 条回复",
    mediaFeedMetricReactions: "{reactions} 个反应 · {comments} 条讨论",
    mediaFeedAdd: "添加信息源",
    mediaFeedTypeTabs: "资讯流类型",
    mediaFeedTypeAll: "全部",
    mediaFeedUrl: "RSS 地址",
    mediaFeedLanguage: "语言",
    mediaFeedUrlPlaceholder: "https://example.com/feed.xml",
    mediaFeedDefaultSources: "默认源",
    mediaFeedInvalidUrl: "请输入 http 或 https 开头的 RSS 地址。",
    mediaFeedLimit: "自定义信息源最多 {count} 个。",
    mediaFeedSaveFailed: "保存信息源失败，请稍后重试。",
    mediaFeedLanguageZh: "中文",
    mediaFeedLanguageEn: "English",
    refreshBookmarkFolder: "刷新当前书签文件夹",
    switchBookmarkLayoutToList: "切换为列表显示",
    switchBookmarkLayoutToGrid: "切换为一行 4 个显示",
    chooseBookmarkFolder: "选择书签文件夹",
    back: "返回",
    chooseBookmarkFolderPrompt: "选择一个书签文件夹",
    historyTitle: "最近浏览",
    refreshHistory: "刷新历史记录",
    pinnedTitle: "置顶",
    recentTitle: "最近 · 时间流",
    quickSearchPlaceholder: "搜索或输入网址",
    quickSearch: "搜索",
    quickSearchEngine: "搜索引擎",
    quickSearchWith: "使用 {engine} 搜索",
    portalCategoryItems: "{count} 个入口",
    deleteCustomPortal: "删除自定义入口",
    openSettings: "设置中心",
    closeSettings: "关闭设置中心",
    settingsTitle: "设置中心",
    appearanceModeTitle: "外观模式",
    themeModeSystem: "跟随",
    themeModeLight: "日间",
    themeModeDark: "夜间",
    presetPaletteTitle: "主题配色",
    customPaletteTitle: "自定义强调色",
    lightAccent: "日间",
    darkAccent: "夜间",
    portalNameRequired: "请填写入口名称。",
    portalUrlRequired: "请输入 http 或 https 开头的网址。",
    customPortalLimit: "自定义入口最多 {count} 个。",
    savePortalFailed: "保存入口失败，请减少数量或缩短内容后重试。",
    loadCustomPortalsFailed: "读取自定义入口失败，请刷新后重试。",
    deletePortalFailed: "删除入口失败，请刷新后重试。",
    bookmarkNoFolder: "还没有选择书签文件夹。点击右上角 + 后选择一个文件夹。",
    bookmarkFolderMissing: "已选文件夹不存在，请重新选择。",
    unnamedFolder: "未命名文件夹",
    bookmarkMeta: "{folder} · {count} 个网站",
    bookmarkEmpty: "这个文件夹里没有可显示的网站书签。",
    bookmarkReadFailed: "无法读取书签，请确认扩展已获得 bookmarks 权限。",
    deleteBookmark: "删除 {title}",
    deleteBookmarkAction: "删除",
    deleteBookmarkFailed: "删除失败，可能已在其他位置变更。",
    loadingBookmarkFolders: "正在读取书签文件夹。",
    bookmarkFolderReadFailed: "无法读取书签文件夹。",
    noBookmarkFolders: "没有找到包含网站书签的文件夹。",
    bookmarkRoot: "书签",
    bookmarkCount: "{count} 个网站",
    pageCount: "{count} 个页面",
    historySitePageMeta: "{count} 个相关页面",
    historyExpandPages: "展开 {count} 个相关页面",
    historyCollapsePages: "收起相关页面",
    historyRelatedPages: "相关页面",
    historyPrimaryPage: "最近页面",
    historyJustNow: "刚刚",
    historyMinutesAgo: "{count} 分钟前",
    historyHoursAgo: "{count} 小时前",
    historyReadFailed: "无法读取历史记录，请确认扩展已获得 history 权限。",
    deleteHistory: "删除 {title}",
    deleteHistoryFailed: "删除失败，可能已在其他位置变更。",
    noPinnedItems: "还没有置顶项目。",
    noHistoryItems: "暂无最近浏览记录。",
    openSiteHome: "打开 {name} 首页",
    openPage: "打开 {title}",
    unpin: "取消置顶",
    pin: "置顶",
    unnamedPage: "未命名页面",
    website: "网站"
  },
  "zh-TW": {
    portalTitle: "導航中樞",
    mobilePortalTab: "快捷",
    mobileMediaTab: "資訊",
    smartPortalTab: "智能常用",
    bookmarkPortalTab: "自選書籤",
    mobileHistoryTab: "歷史",
    quickSearchPlaceholder: "搜尋或輸入網址",
    quickSearch: "搜尋",
    quickSearchEngine: "搜尋引擎",
    quickSearchWith: "使用 {engine} 搜尋",
    portalCategoryItems: "{count} 個入口",
    portalCategories: "智能分類",
    portalCategoriesExpand: "展開",
    portalCategoriesCollapse: "收起",
    featuredPortalsExpand: "展开",
    featuredPortalsCollapse: "收起",
    portalCategoryFeatured: "常用入口",
    portalCategoryRecentBookmarks: "最近加入書籤",
    historyJustNow: "剛剛",
    historyMinutesAgo: "{count} 分鐘前",
    historyHoursAgo: "{count} 小時前",
    portalName: "名稱",
    portalUrl: "網址",
    cancel: "取消",
    add: "新增",
    addPortal: "新增入口",
    mediaTitle: "資訊流",
    mediaFeedLoadingTitle: "正在讀取資訊流",
    mediaFeedLoadingBody: "稍後會顯示最新資訊。",
    mediaFeedUpdated: "剛剛更新",
    mediaFeedFailedTitle: "暫時無法讀取",
    mediaFeedFailedBody: "介面沒有返回可顯示內容，請稍後刷新。",
    mediaFeedEmptyTitle: "暫無資訊",
    mediaFeedEmptyBody: "介面暫時沒有返回可顯示內容。",
    mediaFeedRefresh: "刷新資訊流",
    mediaFeedMore: "更多",
    mediaFeedNotInterested: "不感興趣",
    mediaFeedNotInterestedDone: "已減少類似內容",
    mediaFeedAutoLoad: "繼續滾動載入更多",
    mediaFeedAgentFocus: "Agent 重點",
    mediaFeedAgentStream: "繼續跟蹤",
    mediaFeedTopicAi: "AI",
    mediaFeedTopicEngineering: "工程",
    mediaFeedTopicBusiness: "商業",
    mediaFeedTopicProduct: "產品",
    mediaFeedTopicScience: "深科技",
    mediaFeedTopicConsumer: "消費科技",
    mediaFeedReasonAi: "模型、智能體或 AI 基礎設施信號",
    mediaFeedReasonEngineering: "工程實踐、開源或開發者生態信號",
    mediaFeedReasonBusiness: "公司、市場或商業模式變化",
    mediaFeedReasonProduct: "新產品、工具或效率工作流",
    mediaFeedReasonScience: "研究、硬體或前沿技術進展",
    mediaFeedReasonConsumer: "設備、平台或消費科技變化",
    mediaFeedReasonDefault: "來源多樣化後的高價值條目",
    mediaFeedMetricHn: "{score} 分 · {comments} 條討論",
    mediaFeedMetricReplies: "{count} 條回覆",
    mediaFeedMetricReactions: "{reactions} 個反應 · {comments} 條討論",
    mediaFeedAdd: "新增資訊源",
    mediaFeedTypeTabs: "資訊流類型",
    mediaFeedTypeAll: "全部",
    mediaFeedUrl: "RSS 地址",
    mediaFeedLanguage: "語言",
    mediaFeedUrlPlaceholder: "https://example.com/feed.xml",
    mediaFeedDefaultSources: "預設源",
    mediaFeedInvalidUrl: "請輸入 http 或 https 開頭的 RSS 地址。",
    mediaFeedLimit: "自訂資訊源最多 {count} 個。",
    mediaFeedSaveFailed: "儲存資訊源失敗，請稍後重試。",
    mediaFeedLanguageZh: "中文",
    mediaFeedLanguageEn: "English",
    back: "返回",
    chooseBookmarkFolderPrompt: "選擇一個書籤資料夾",
    historyTitle: "最近瀏覽",
    pinnedTitle: "釘選",
    recentTitle: "最近",
    unnamedFolder: "未命名資料夾",
    bookmarkRoot: "書籤",
    bookmarkMeta: "{folder} · {count} 個網站",
    bookmarkCount: "{count} 個網站",
    deleteBookmarkAction: "刪除",
    historyExpandPages: "展開 {count} 個相關頁面",
    historyCollapsePages: "收起相關頁面",
    historyRelatedPages: "相關頁面",
    historyPrimaryPage: "最近頁面",
    unnamedPage: "未命名頁面",
    website: "網站"
  },
  en: {
    topbarLabel: "Top bar",
    shellLabel: "tab-tab dashboard",
    portalTitle: "Navigation hub",
    mobilePortalTab: "Shortcuts",
    mobileMediaTab: "Media",
    mobileHistoryTab: "History",
    smartPortalTab: "Smart",
    bookmarkPortalTab: "Bookmarks",
    portalCategoryFeatured: "Frequent shortcuts",
    portalCategoryRecentBookmarks: "Recently bookmarked",
    portalCategoryCustom: "Custom",
    portalCategoryShopping: "Shopping",
    portalCategoryAi: "AI",
    portalCategorySocial: "Social",
    portalCategorySearch: "Search",
    portalCategoryDeveloper: "Developer",
    portalCategoryProductivity: "Productivity",
    portalCategoryMedia: "Media",
    portalCategoryDesign: "Design",
    portalCategoryOther: "Other",
    portalCategories: "Smart categories",
    portalCategoriesExpand: "Expand",
    portalCategoriesCollapse: "Collapse",
    featuredPortalsExpand: "Expand",
    featuredPortalsCollapse: "Collapse",
    addPortal: "Add portal",
    portalName: "Name",
    portalUrl: "URL",
    portalCategory: "Category",
    portalNamePlaceholder: "Example: Notion",
    portalUrlPlaceholder: "https://www.notion.so",
    cancel: "Cancel",
    add: "Add",
    mediaTitle: "Media feed",
    mediaFeedLoadingTitle: "Loading feed",
    mediaFeedLoadingBody: "Latest stories will appear here shortly.",
    mediaFeedUpdated: "Updated just now",
    mediaFeedFailedTitle: "Could not load feed",
    mediaFeedFailedBody: "The feed API did not return displayable items. Refresh later.",
    mediaFeedEmptyTitle: "No stories",
    mediaFeedEmptyBody: "The feed API has no displayable stories right now.",
    mediaFeedRefresh: "Refresh feed",
    mediaFeedMore: "More",
    mediaFeedAutoLoad: "Scroll for more",
    mediaFeedAgentFocus: "Agent focus",
    mediaFeedAgentStream: "Tracking next",
    mediaFeedTopicAi: "AI",
    mediaFeedTopicEngineering: "Engineering",
    mediaFeedTopicBusiness: "Business",
    mediaFeedTopicProduct: "Product",
    mediaFeedTopicScience: "Deep tech",
    mediaFeedTopicConsumer: "Consumer tech",
    mediaFeedReasonAi: "Model, agent, or AI infrastructure signal",
    mediaFeedReasonEngineering: "Engineering, open-source, or developer ecosystem signal",
    mediaFeedReasonBusiness: "Company, market, or business model shift",
    mediaFeedReasonProduct: "New product, tool, or productivity workflow",
    mediaFeedReasonScience: "Research, hardware, or frontier technology progress",
    mediaFeedReasonConsumer: "Device, platform, or consumer technology shift",
    mediaFeedReasonDefault: "High-value item after source diversification",
    mediaFeedMetricHn: "{score} points · {comments} comments",
    mediaFeedMetricReplies: "{count} replies",
    mediaFeedMetricReactions: "{reactions} reactions · {comments} comments",
    mediaFeedAdd: "Add feed",
    mediaFeedTypeTabs: "Feed type",
    mediaFeedTypeAll: "All",
    mediaFeedUrl: "RSS URL",
    mediaFeedLanguage: "Language",
    mediaFeedUrlPlaceholder: "https://example.com/feed.xml",
    mediaFeedDefaultSources: "Default feeds",
    mediaFeedInvalidUrl: "Enter an RSS URL that starts with http or https.",
    mediaFeedLimit: "You can add up to {count} custom feeds.",
    mediaFeedSaveFailed: "Could not save this feed. Try again later.",
    mediaFeedLanguageZh: "Chinese",
    mediaFeedLanguageEn: "English",
    refreshBookmarkFolder: "Refresh current bookmark folder",
    switchBookmarkLayoutToList: "Switch to list view",
    switchBookmarkLayoutToGrid: "Switch to 4-column grid view",
    chooseBookmarkFolder: "Choose bookmark folder",
    back: "Back",
    chooseBookmarkFolderPrompt: "Choose a bookmark folder",
    historyTitle: "Recent browsing",
    refreshHistory: "Refresh history",
    pinnedTitle: "Pinned",
    recentTitle: "Recent timeline",
    quickSearchPlaceholder: "Search or enter URL",
    quickSearch: "Search",
    quickSearchEngine: "Search engine",
    quickSearchWith: "Search with {engine}",
    portalCategoryItems: "{count} shortcuts",
    deleteCustomPortal: "Remove custom portal",
    openSettings: "Settings",
    closeSettings: "Close settings",
    settingsTitle: "Settings",
    appearanceModeTitle: "Appearance",
    themeModeSystem: "Follow",
    themeModeLight: "Light",
    themeModeDark: "Dark",
    presetPaletteTitle: "Theme palettes",
    customPaletteTitle: "Custom accents",
    lightAccent: "Light",
    darkAccent: "Dark",
    portalNameRequired: "Enter a portal name.",
    portalUrlRequired: "Enter an http or https URL.",
    customPortalLimit: "You can add up to {count} custom portals.",
    savePortalFailed: "Could not save this portal. Try fewer or shorter entries.",
    loadCustomPortalsFailed: "Could not load custom portals. Refresh and try again.",
    deletePortalFailed: "Could not remove this portal. Refresh and try again.",
    bookmarkNoFolder: "No bookmark folder selected. Use + in the top right to choose one.",
    bookmarkFolderMissing: "The selected folder no longer exists. Choose another folder.",
    unnamedFolder: "Untitled folder",
    bookmarkMeta: "{folder} · {count} sites",
    bookmarkEmpty: "This folder has no website bookmarks to show.",
    bookmarkReadFailed: "Could not read bookmarks. Check that the extension has bookmarks permission.",
    deleteBookmark: "Remove {title}",
    deleteBookmarkAction: "Remove",
    deleteBookmarkFailed: "Could not remove it. It may have changed elsewhere.",
    loadingBookmarkFolders: "Loading bookmark folders.",
    bookmarkFolderReadFailed: "Could not read bookmark folders.",
    noBookmarkFolders: "No bookmark folders with website bookmarks found.",
    bookmarkRoot: "Bookmarks",
    bookmarkCount: "{count} sites",
    pageCount: "{count} pages",
    historySitePageMeta: "{count} related pages",
    historyExpandPages: "Show {count} related pages",
    historyCollapsePages: "Hide related pages",
    historyRelatedPages: "Related pages",
    historyPrimaryPage: "Latest page",
    historyJustNow: "Just now",
    historyMinutesAgo: "{count} min ago",
    historyHoursAgo: "{count} hr ago",
    historyReadFailed: "Could not read history. Check that the extension has history permission.",
    deleteHistory: "Remove {title}",
    deleteHistoryFailed: "Could not remove it. It may have changed elsewhere.",
    noPinnedItems: "No pinned items yet.",
    noHistoryItems: "No recent browsing yet.",
    openSiteHome: "Open {name} home page",
    openPage: "Open {title}",
    mediaFeedMore: "More",
    mediaFeedNotInterested: "Not interested",
    mediaFeedNotInterestedDone: "Showing fewer like this",
    unpin: "Unpin",
    pin: "Pin",
    unnamedPage: "Untitled page",
    website: "Website"
  },
  ja: {
    portalTitle: "ナビゲーションハブ",
    addPortal: "入口を追加",
    portalName: "名前",
    portalUrl: "URL",
    cancel: "キャンセル",
    add: "追加",
    bookmarksTitle: "ブックマーク",
    back: "戻る",
    chooseBookmarkFolderPrompt: "ブックマークフォルダを選択",
    historyTitle: "最近の閲覧",
    pinnedTitle: "固定",
    recentTitle: "最近",
    unnamedFolder: "名称未設定のフォルダ",
    bookmarkRoot: "ブックマーク",
    bookmarkMeta: "{folder} · {count} 件のサイト",
    bookmarkCount: "{count} 件のサイト",
    unnamedPage: "名称未設定のページ",
    website: "Website"
  },
  ko: {
    portalTitle: "탐색 허브",
    addPortal: "항목 추가",
    portalName: "이름",
    portalUrl: "URL",
    cancel: "취소",
    add: "추가",
    bookmarksTitle: "북마크",
    back: "뒤로",
    chooseBookmarkFolderPrompt: "북마크 폴더 선택",
    historyTitle: "최근 방문",
    pinnedTitle: "고정",
    recentTitle: "최근",
    unnamedFolder: "이름 없는 폴더",
    bookmarkRoot: "북마크",
    bookmarkMeta: "{folder} · 사이트 {count}개",
    bookmarkCount: "사이트 {count}개",
    unnamedPage: "제목 없는 페이지",
    website: "Website"
  },
  es: {
    portalTitle: "Centro de navegación",
    addPortal: "Agregar acceso",
    portalName: "Nombre",
    portalUrl: "URL",
    cancel: "Cancelar",
    add: "Agregar",
    bookmarksTitle: "Marcadores",
    back: "Volver",
    chooseBookmarkFolderPrompt: "Elige una carpeta de marcadores",
    historyTitle: "Recientes",
    pinnedTitle: "Fijados",
    recentTitle: "Recientes",
    unnamedFolder: "Carpeta sin título",
    bookmarkRoot: "Marcadores",
    bookmarkMeta: "{folder} · {count} sitios",
    bookmarkCount: "{count} sitios",
    unnamedPage: "Página sin título",
    website: "Website"
  },
  fr: {
    portalTitle: "Centre de navigation",
    addPortal: "Ajouter un raccourci",
    portalName: "Nom",
    portalUrl: "URL",
    cancel: "Annuler",
    add: "Ajouter",
    bookmarksTitle: "Favoris",
    back: "Retour",
    chooseBookmarkFolderPrompt: "Choisir un dossier de favoris",
    historyTitle: "Navigation récente",
    pinnedTitle: "Épinglés",
    recentTitle: "Récents",
    unnamedFolder: "Dossier sans titre",
    bookmarkRoot: "Favoris",
    bookmarkMeta: "{folder} · {count} sites",
    bookmarkCount: "{count} sites",
    unnamedPage: "Page sans titre",
    website: "Website"
  },
  de: {
    portalTitle: "Navigationszentrale",
    addPortal: "Eintrag hinzufügen",
    portalName: "Name",
    portalUrl: "URL",
    cancel: "Abbrechen",
    add: "Hinzufügen",
    bookmarksTitle: "Lesezeichen",
    back: "Zurück",
    chooseBookmarkFolderPrompt: "Lesezeichenordner auswählen",
    historyTitle: "Zuletzt besucht",
    pinnedTitle: "Angeheftet",
    recentTitle: "Zuletzt",
    unnamedFolder: "Unbenannter Ordner",
    bookmarkRoot: "Lesezeichen",
    bookmarkMeta: "{folder} · {count} Websites",
    bookmarkCount: "{count} Websites",
    unnamedPage: "Unbenannte Seite",
    website: "Website"
  }
};
const LOCALE = resolveLocale();
const MEDIA_FEED_LOCALE_LANGUAGE = mediaFeedLanguageForLocale(LOCALE);

const portalGrid = document.querySelector("#portalGrid");
const portalModeTabs = [...document.querySelectorAll("[data-portal-view]")];
const portalViews = [...document.querySelectorAll(".portal-view")];
const bookmarkGrid = document.querySelector("#bookmarkGrid");
const bookmarkMainView = document.querySelector("#bookmarkMainView");
const bookmarkFolderMeta = document.querySelector("#bookmarkFolderMeta");
const bookmarkPicker = document.querySelector("#bookmarkPicker");
const bookmarkPickerToolbar = document.querySelector("#bookmarkPickerToolbar");
const bookmarkFolderList = document.querySelector("#bookmarkFolderList");
const chooseBookmarkFolderButton = document.querySelector("#chooseBookmarkFolderButton");
const refreshBookmarkFolderButton = document.querySelector("#refreshBookmarkFolderButton");
const toggleBookmarkLayoutButton = document.querySelector("#toggleBookmarkLayoutButton");
const closeBookmarkPickerButton = document.querySelector("#closeBookmarkPickerButton");
const bookmarkPickerTitle = document.querySelector("#bookmarkPickerTitle");
const pinnedGrid = document.querySelector("#pinnedGrid");
const historyGrid = document.querySelector("#historyGrid");
const refreshHistoryButton = document.querySelector("#refreshHistoryButton");
const mediaFeedList = document.querySelector("#mediaFeedList");
const mediaFeedState = document.querySelector("#mediaFeedState");
const mediaFeedUpdated = document.querySelector("#mediaFeedUpdated");
const refreshMediaFeedButton = document.querySelector("#refreshMediaFeedButton");
const toggleMediaFeedFormButton = document.querySelector("#toggleMediaFeedFormButton");
const mediaFeedForm = document.querySelector("#mediaFeedForm");
const mediaFeedUrlInput = document.querySelector("#mediaFeedUrlInput");
const mediaFeedLanguageSelect = document.querySelector("#mediaFeedLanguageSelect");
const mediaFeedDefaultList = document.querySelector("#mediaFeedDefaultList");
const mediaFeedFormError = document.querySelector("#mediaFeedFormError");
const cancelMediaFeedButton = document.querySelector("#cancelMediaFeedButton");
const mediaFeedTypeTabs = document.querySelector("#mediaFeedTypeTabs");
const mediaFeedTypeButtons = [...document.querySelectorAll("[data-media-feed-type]")];
const siteCardTemplate = document.querySelector("#siteCardTemplate");
const settingsButton = document.querySelector("#settingsButton");
const settingsPanel = document.querySelector("#settingsPanel");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const palettePresetGrid = document.querySelector("#palettePresetGrid");
const lightAccentInput = document.querySelector("#lightAccentInput");
const darkAccentInput = document.querySelector("#darkAccentInput");
const lightAccentValue = document.querySelector("#lightAccentValue");
const darkAccentValue = document.querySelector("#darkAccentValue");
const quickSearchForm = document.querySelector("#quickSearchForm");
const quickSearchInput = document.querySelector("#quickSearchInput");
const quickSearchButton = document.querySelector("#quickSearchButton");
const quickSearchEngineButton = document.querySelector("#quickSearchEngineButton");
const quickSearchEngineMenu = document.querySelector("#quickSearchEngineMenu");
const quickSearchEngineLogo = document.querySelector("#quickSearchEngineLogo");
const quickSearchEngineName = document.querySelector("#quickSearchEngineName");
const togglePortalFormButton = document.querySelector("#togglePortalFormButton");
const portalForm = document.querySelector("#portalForm");
const portalTitleInput = document.querySelector("#portalTitleInput");
const portalUrlInput = document.querySelector("#portalUrlInput");
const portalCategorySelect = document.querySelector("#portalCategorySelect");
const portalFormError = document.querySelector("#portalFormError");
const cancelPortalButton = document.querySelector("#cancelPortalButton");
const mobileSectionTabs = [...document.querySelectorAll(".mobile-section-tab")];
let bookmarkRefreshTimer = 0;
let activeBookmarkDeleteCard = null;
let bookmarkLayout = "grid";
let activePortalCategory = DEFAULT_PORTAL_CATEGORY;
let activeSearchEngine = DEFAULT_SEARCH_ENGINE;
let draggedPortalSectionRole = "";
let portalCategoriesExpanded = false;
let featuredPortalsExpanded = true;
let activePortalView = "smart";
let activeThemeMode = DEFAULT_THEME_MODE;
let activeThemePalette = DEFAULT_THEME_PALETTE;
let activeCustomThemeColors = { ...DEFAULT_CUSTOM_THEME_COLORS };
let systemThemeQuery = null;
let settingsPanelCloseTimer = 0;
let activeMediaFeedType = "all";
let latestMediaFeedItems = [];
let visibleMediaFeedItems = [];
let mediaFeedVisibleCount = MEDIA_FEED_INITIAL_ITEMS;
let mediaFeedObserver = null;
let mediaFeedRefreshSeed = 0;
let activeMediaFeedFeedback = normalizeMediaFeedFeedback();
let activeMediaFeedActionMenu = null;
const mediaFeedLoadMoreSentinel = document.createElement("div");
mediaFeedLoadMoreSentinel.className = "media-feed-load-more";
mediaFeedLoadMoreSentinel.setAttribute("role", "status");

ensureChromeApiFallback();
document.addEventListener("DOMContentLoaded", init);

function ensureChromeApiFallback() {
  if (globalThis.chrome?.storage?.local && globalThis.chrome?.history && globalThis.chrome?.bookmarks) {
    return;
  }
  const memoryStore = {};
  const emptyEvent = { addListener: () => {}, removeListener: () => {} };
  globalThis.chrome = {
    ...globalThis.chrome,
    i18n: globalThis.chrome?.i18n || { getUILanguage: () => navigator.language },
    runtime: globalThis.chrome?.runtime || { getURL: (path) => path },
    storage: {
      ...globalThis.chrome?.storage,
      local: globalThis.chrome?.storage?.local || {
        async get(defaults = {}) {
          return { ...defaults, ...memoryStore };
        },
        async set(values = {}) {
          Object.assign(memoryStore, values);
        }
      }
    },
    history: globalThis.chrome?.history || {
      async search() {
        return [];
      },
      async getVisits() {
        return [];
      },
      async deleteUrl() {}
    },
    bookmarks: globalThis.chrome?.bookmarks || {
      async getTree() {
        return [{ id: "0", title: "Bookmarks", children: [] }];
      },
      async getChildren() {
        return [];
      },
      async get() {
        return [];
      },
      async remove() {},
      onCreated: emptyEvent,
      onRemoved: emptyEvent,
      onChanged: emptyEvent,
      onMoved: emptyEvent,
      onChildrenReordered: emptyEvent,
      onImportEnded: emptyEvent
    }
  };
}

function resolveLocale() {
  const languageCandidates = [
    globalThis.chrome?.i18n?.getUILanguage?.(),
    ...(navigator.languages || []),
    navigator.language
  ].filter(Boolean);

  for (const language of languageCandidates) {
    const normalized = String(language).replace("_", "-");
    const exactMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === normalized.toLowerCase());
    if (exactMatch) {
      return exactMatch;
    }
    const languageCode = normalized.split("-")[0].toLowerCase();
    if (languageCode === "zh") {
      return /(?:tw|hk|mo|hant)/i.test(normalized) ? "zh-TW" : "zh-CN";
    }
    const baseMatch = SUPPORTED_LOCALES.find((locale) => locale === languageCode);
    if (baseMatch) {
      return baseMatch;
    }
  }

  return DEFAULT_LOCALE;
}

function t(key, values = {}) {
  const template = messageTemplate(key);
  return template.replace(/\{(\w+)\}/g, (_, valueKey) => String(values[valueKey] ?? ""));
}

function mediaFeedLanguageForLocale(locale) {
  return String(locale || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function messageTemplate(key) {
  if (MESSAGES[LOCALE]?.[key]) {
    return MESSAGES[LOCALE][key];
  }
  if (LOCALE === "zh-TW" && MESSAGES[DEFAULT_LOCALE]?.[key]) {
    return MESSAGES[DEFAULT_LOCALE][key];
  }
  return MESSAGES.en[key] || MESSAGES[DEFAULT_LOCALE][key] || key;
}

function applyLocale() {
  document.documentElement.lang = LOCALE;
  document.querySelector(".topbar")?.setAttribute("aria-label", t("topbarLabel"));
  document.querySelector(".shell")?.setAttribute("aria-label", t("shellLabel"));
  document.querySelector("#portal-title").textContent = t("portalTitle");
  document.querySelector("#smartPortalTab").textContent = t("smartPortalTab");
  document.querySelector("#bookmarkPortalTab").textContent = t("bookmarkPortalTab");
  document.querySelector("#media-title").textContent = t("mediaTitle");
  applyMediaFeedTypeLocale();
  document.querySelector("#history-title").textContent = t("historyTitle");
  document.querySelector("#pinned-title").textContent = t("pinnedTitle");
  document.querySelector("#recent-title").textContent = t("recentTitle");
  setMobileTabLabel("portalPanel", t("mobilePortalTab"));
  setMobileTabLabel("mediaPanel", t("mobileMediaTab"));
  setMobileTabLabel("historyPanel", t("mobileHistoryTab"));

  setButtonLabel(togglePortalFormButton, t("addPortal"));
  setButtonLabel(refreshBookmarkFolderButton, t("refreshBookmarkFolder"));
  updateBookmarkLayoutButton();
  setButtonLabel(chooseBookmarkFolderButton, t("chooseBookmarkFolder"));
  setButtonLabel(refreshHistoryButton, t("refreshHistory"));
  setButtonLabel(refreshMediaFeedButton, t("mediaFeedRefresh"));
  setButtonLabel(toggleMediaFeedFormButton, t("mediaFeedAdd"));
  setButtonLabel(settingsButton, t("openSettings"));
  setButtonLabel(closeSettingsButton, t("closeSettings"));
  setStaticButtonIcons();
  applySettingsLocale();
  updateQuickSearchButtonLabel();
  quickSearchInput.placeholder = t("quickSearchPlaceholder");
  quickSearchInput.setAttribute("aria-label", t("quickSearchPlaceholder"));
  quickSearchEngineButton?.setAttribute("title", t("quickSearchEngine"));

  const portalTitleLabel = portalTitleInput.closest("label")?.querySelector("span");
  const portalUrlLabel = portalUrlInput.closest("label")?.querySelector("span");
  const portalCategoryLabel = portalCategorySelect.closest("label")?.querySelector("span");
  if (portalTitleLabel) {
    portalTitleLabel.textContent = t("portalName");
  }
  if (portalUrlLabel) {
    portalUrlLabel.textContent = t("portalUrl");
  }
  if (portalCategoryLabel) {
    portalCategoryLabel.textContent = t("portalCategory");
  }
  populatePortalCategoryOptions();
  portalTitleInput.placeholder = t("portalNamePlaceholder");
  portalUrlInput.placeholder = t("portalUrlPlaceholder");
  cancelPortalButton.textContent = t("cancel");
  portalForm.querySelector('button[type="submit"]').textContent = t("add");
  applyMediaFeedFormLocale();
  setButtonLabel(closeBookmarkPickerButton, t("back"));
  bookmarkPickerTitle.textContent = t("chooseBookmarkFolderPrompt");
}

function setMobileTabLabel(panelId, label) {
  const tab = mobileSectionTabs.find((item) => item.dataset.panelTarget === panelId);
  if (tab) {
    tab.textContent = label;
  }
}

function setButtonLabel(button, label) {
  if (!button) {
    return;
  }
  button.title = label;
  button.setAttribute("aria-label", label);
}

function setStaticButtonIcons() {
  togglePortalFormButton.querySelector(".button-icon").innerHTML = plusIcon();
  refreshBookmarkFolderButton.querySelector(".button-icon").innerHTML = refreshIcon();
  chooseBookmarkFolderButton.querySelector(".button-icon").innerHTML = folderPlusIcon();
  closeBookmarkPickerButton.querySelector(".button-icon").innerHTML = arrowLeftIcon();
  refreshHistoryButton.querySelector(".button-icon").innerHTML = refreshIcon();
  refreshMediaFeedButton.querySelector(".button-icon").innerHTML = refreshIcon();
  toggleMediaFeedFormButton.querySelector(".button-icon").innerHTML = plusIcon();
  settingsButton.querySelector(".theme-toggle-icon").innerHTML = settingsIcon();
  closeSettingsButton.querySelector(".button-icon").innerHTML = closeIcon();
  document.querySelector(".media-placeholder .empty-mark").innerHTML = newspaperIcon();
}

function applyMediaFeedFormLocale() {
  mediaFeedUrlInput.closest("label").querySelector("span").textContent = t("mediaFeedUrl");
  mediaFeedLanguageSelect.closest("label").querySelector("span").textContent = t("mediaFeedLanguage");
  mediaFeedUrlInput.placeholder = t("mediaFeedUrlPlaceholder");
  mediaFeedLanguageSelect.querySelector('option[value="zh"]').textContent = t("mediaFeedLanguageZh");
  mediaFeedLanguageSelect.querySelector('option[value="en"]').textContent = t("mediaFeedLanguageEn");
  cancelMediaFeedButton.textContent = t("cancel");
  mediaFeedForm.querySelector('button[type="submit"]').textContent = t("add");
  renderMediaFeedDefaultList();
}

function applyMediaFeedTypeLocale() {
  mediaFeedTypeTabs?.setAttribute("aria-label", t("mediaFeedTypeTabs"));
  mediaFeedTypeButtons.forEach((button) => {
    const type = button.dataset.mediaFeedType;
    if (type === "all") {
      button.textContent = t("mediaFeedTypeAll");
    } else {
      const rule = MEDIA_FEED_TOPIC_RULES.find((topic) => topic.id === type);
      button.textContent = rule ? t(rule.labelKey) : type;
    }
  });
}

function applySettingsLocale() {
  document.querySelector("#settingsTitle").textContent = t("settingsTitle");
  document.querySelector("#appearanceModeTitle").textContent = t("appearanceModeTitle");
  document.querySelector("#presetPaletteTitle").textContent = t("presetPaletteTitle");
  document.querySelector("#customPaletteTitle").textContent = t("customPaletteTitle");
  document.querySelector('[data-theme-mode="system"]').textContent = t("themeModeSystem");
  document.querySelector('[data-theme-mode="light"]').textContent = t("themeModeLight");
  document.querySelector('[data-theme-mode="dark"]').textContent = t("themeModeDark");
  lightAccentInput.closest("label").querySelector("span").textContent = t("lightAccent");
  darkAccentInput.closest("label").querySelector("span").textContent = t("darkAccent");
}

function init() {
  applyLocale();
  initThemeMode();
  initQuickSearchEngine();
  renderPortals();
  initBookmarkLayout();
  renderSelectedBookmarkFolder();
  initMediaFeedFeedback().finally(refreshMediaFeed);
  refreshHistory();

  chooseBookmarkFolderButton.addEventListener("click", openBookmarkPicker);
  refreshBookmarkFolderButton.addEventListener("click", renderSelectedBookmarkFolder);
  toggleBookmarkLayoutButton.addEventListener("click", toggleBookmarkLayout);
  closeBookmarkPickerButton.addEventListener("click", closeBookmarkPicker);
  refreshHistoryButton.addEventListener("click", refreshHistory);
  refreshMediaFeedButton.addEventListener("click", refreshMediaFeed);
  toggleMediaFeedFormButton.addEventListener("click", toggleMediaFeedForm);
  cancelMediaFeedButton.addEventListener("click", hideMediaFeedForm);
  mediaFeedForm.addEventListener("submit", handleMediaFeedSubmit);
  mediaFeedList.addEventListener("scroll", loadMoreMediaFeedIfNeeded, { passive: true });
  document.addEventListener("click", handleDocumentClickForMediaFeedMenu);
  mediaFeedTypeButtons.forEach((button) => {
    button.addEventListener("click", () => activateMediaFeedType(button.dataset.mediaFeedType));
  });
  quickSearchForm.addEventListener("submit", handleQuickSearchSubmit);
  quickSearchInput.addEventListener("keydown", handleQuickSearchInputKeydown);
  quickSearchEngineButton.addEventListener("click", toggleSearchEngineMenu);
  quickSearchEngineButton.addEventListener("keydown", handleSearchEngineButtonKeydown);
  portalModeTabs.forEach((tab) => {
    tab.addEventListener("click", () => activatePortalView(tab.dataset.portalView));
  });
  togglePortalFormButton.addEventListener("click", showPortalForm);
  cancelPortalButton.addEventListener("click", hidePortalForm);
  portalForm.addEventListener("submit", handlePortalSubmit);
  settingsButton.addEventListener("click", toggleSettingsPanel);
  closeSettingsButton.addEventListener("click", () => closeSettingsPanel({ restoreFocus: true }));
  document.querySelectorAll("[data-theme-mode]").forEach((button) => {
    button.addEventListener("click", () => setThemeMode(button.dataset.themeMode, { persist: true }));
  });
  lightAccentInput.addEventListener("input", handleCustomThemeColorInput);
  darkAccentInput.addEventListener("input", handleCustomThemeColorInput);
  mobileSectionTabs.forEach((tab) => {
    tab.addEventListener("click", () => activateMobilePanel(tab.dataset.panelTarget));
  });
  document.addEventListener("pointerdown", handleBookmarkDeleteDismiss, true);
  document.addEventListener("pointerdown", handleSearchEngineMenuDismiss, true);
  document.addEventListener("pointerdown", handleSettingsPanelDismiss, true);
  document.addEventListener("keydown", handleBookmarkDeleteEscape);
  document.addEventListener("keydown", handleGlobalEscape);
  bindBookmarkChangeEvents();
}

function activatePortalView(view) {
  const nextView = view === "bookmarks" ? "bookmarks" : "smart";
  activePortalView = nextView;
  document.querySelector(".portal-mode-tabs")?.setAttribute("data-active-view", nextView);
  portalModeTabs.forEach((tab) => {
    const isActive = tab.dataset.portalView === nextView;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  portalViews.forEach((viewNode) => {
    const isActive = viewNode.id === (nextView === "bookmarks" ? "bookmarkPortalView" : "smartPortalView");
    viewNode.classList.toggle("active", isActive);
    viewNode.hidden = !isActive;
  });
  togglePortalFormButton.hidden = nextView === "bookmarks";
  clearBookmarkDeleteMode();
  if (nextView === "bookmarks" && bookmarkPicker.hidden) {
    renderSelectedBookmarkFolder();
  }
}

function activateMobilePanel(panelId) {
  if (!panelId) {
    return;
  }
  mobileSectionTabs.forEach((tab) => {
    const isActive = tab.dataset.panelTarget === panelId;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("mobile-active", panel.id === panelId);
  });
}

async function initThemeMode() {
  renderThemePalettePresets();
  bindSystemThemeListener();
  try {
    const result = await chrome.storage.local.get({
      [THEME_STORAGE_KEY]: DEFAULT_THEME_MODE,
      [THEME_PALETTE_STORAGE_KEY]: defaultThemePaletteSettings()
    });
    const savedTheme = result[THEME_STORAGE_KEY];
    const savedPalette = normalizeThemePaletteSettings(result[THEME_PALETTE_STORAGE_KEY]);
    activeThemePalette = savedPalette.palette;
    activeCustomThemeColors = savedPalette.custom;
    updateCustomThemeInputs();
    applyThemePalette();
    applyThemeMode(savedTheme === "dark" || savedTheme === "light" || savedTheme === "system" ? savedTheme : DEFAULT_THEME_MODE);
  } catch (error) {
    console.warn("Failed to load theme mode", error);
    applyThemePalette();
    applyThemeMode(DEFAULT_THEME_MODE);
  }
}

async function initQuickSearchEngine() {
  populateQuickSearchEngineOptions();
  try {
    const result = await chrome.storage.local.get({ [SEARCH_ENGINE_STORAGE_KEY]: DEFAULT_SEARCH_ENGINE });
    setQuickSearchEngine(result[SEARCH_ENGINE_STORAGE_KEY], { persist: false });
  } catch (error) {
    console.warn("Failed to load search engine", error);
    setQuickSearchEngine(DEFAULT_SEARCH_ENGINE, { persist: false });
  }
}

function populateQuickSearchEngineOptions() {
  quickSearchEngineMenu.replaceChildren(...SEARCH_ENGINES.map((engine) => {
    const option = document.createElement("button");
    const icon = document.createElement("img");
    const label = document.createElement("span");
    option.className = "search-engine-option";
    option.type = "button";
    option.setAttribute("role", "option");
    option.dataset.engine = engine.id;
    option.setAttribute("aria-selected", "false");
    icon.src = engine.icon;
    icon.alt = "";
    label.textContent = engine.label;
    option.append(icon, label);
    option.addEventListener("click", () => selectSearchEngineFromMenu(engine.id));
    option.addEventListener("keydown", handleSearchEngineOptionKeydown);
    return option;
  }));
}

async function selectSearchEngineFromMenu(engineId) {
  await setQuickSearchEngine(engineId, { persist: true });
  closeSearchEngineMenu({ restoreFocus: true });
}

function toggleSearchEngineMenu() {
  if (quickSearchEngineMenu.hidden) {
    openSearchEngineMenu();
    return;
  }
  closeSearchEngineMenu({ restoreFocus: true });
}

function openSearchEngineMenu() {
  quickSearchEngineMenu.hidden = false;
  quickSearchEngineButton.setAttribute("aria-expanded", "true");
  quickSearchEngineMenu.querySelector(`[data-engine="${CSS.escape(activeSearchEngine)}"]`)?.focus();
}

function closeSearchEngineMenu(options = {}) {
  if (quickSearchEngineMenu.hidden) {
    return;
  }
  quickSearchEngineMenu.hidden = true;
  quickSearchEngineButton.setAttribute("aria-expanded", "false");
  if (options.restoreFocus) {
    quickSearchEngineButton.focus({ preventScroll: true });
  }
}

function handleSearchEngineButtonKeydown(event) {
  if (event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  openSearchEngineMenu();
}

function handleSearchEngineOptionKeydown(event) {
  const options = [...quickSearchEngineMenu.querySelectorAll(".search-engine-option")];
  const currentIndex = options.indexOf(event.currentTarget);
  if (event.key === "Escape") {
    event.preventDefault();
    closeSearchEngineMenu({ restoreFocus: true });
    return;
  }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
    return;
  }
  event.preventDefault();
  const offset = event.key === "ArrowDown" ? 1 : -1;
  const nextIndex = (currentIndex + offset + options.length) % options.length;
  options[nextIndex]?.focus();
}

function handleSearchEngineMenuDismiss(event) {
  if (quickSearchEngineMenu.hidden) {
    return;
  }
  const target = event.target;
  if (target instanceof Element && (quickSearchEngineMenu.contains(target) || quickSearchEngineButton.contains(target))) {
    return;
  }
  closeSearchEngineMenu();
}

function handleGlobalEscape(event) {
  if (event.key !== "Escape") {
    return;
  }
  closeSearchEngineMenu();
  closeSettingsPanel();
}

async function setQuickSearchEngine(engineId, options = {}) {
  const nextEngine = searchEngineById(engineId);
  activeSearchEngine = nextEngine.id;
  updateQuickSearchButtonLabel();
  if (!options.persist) {
    return;
  }
  try {
    await chrome.storage.local.set({ [SEARCH_ENGINE_STORAGE_KEY]: nextEngine.id });
  } catch (error) {
    console.warn("Failed to save search engine", error);
  }
}

function updateQuickSearchButtonLabel() {
  const engine = searchEngineById(activeSearchEngine);
  setButtonLabel(quickSearchButton, t("quickSearchWith", { engine: engine.label }));
  quickSearchButton.textContent = t("quickSearch");
  if (quickSearchEngineLogo) {
    quickSearchEngineLogo.src = engine.icon;
    quickSearchEngineLogo.alt = "";
  }
  if (quickSearchEngineName) {
    quickSearchEngineName.textContent = engine.label;
  }
  quickSearchEngineButton.title = `${t("quickSearchEngine")}: ${engine.label}`;
  quickSearchEngineMenu?.querySelectorAll(".search-engine-option").forEach((option) => {
    const isSelected = option.dataset.engine === engine.id;
    option.classList.toggle("active", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });
}

function searchEngineById(engineId) {
  return SEARCH_ENGINES.find((engine) => engine.id === engineId) || SEARCH_ENGINES[0];
}

async function initBookmarkLayout() {
  try {
    const result = await chrome.storage.local.get({ [BOOKMARK_LAYOUT_STORAGE_KEY]: "grid" });
    applyBookmarkLayout(result[BOOKMARK_LAYOUT_STORAGE_KEY] === "list" ? "list" : "grid");
  } catch (error) {
    console.warn("Failed to load bookmark layout", error);
    applyBookmarkLayout("grid");
  }
}

async function toggleBookmarkLayout() {
  const nextLayout = bookmarkLayout === "list" ? "grid" : "list";
  applyBookmarkLayout(nextLayout);
  try {
    await chrome.storage.local.set({ [BOOKMARK_LAYOUT_STORAGE_KEY]: nextLayout });
  } catch (error) {
    console.warn("Failed to save bookmark layout", error);
  }
}

function applyBookmarkLayout(layout) {
  bookmarkLayout = layout === "list" ? "list" : "grid";
  bookmarkGrid.classList.toggle("list-layout", bookmarkLayout === "list");
  bookmarkGrid.classList.toggle("grid-layout", bookmarkLayout !== "list");
  updateBookmarkLayoutButton();
}

function updateBookmarkLayoutButton() {
  if (!toggleBookmarkLayoutButton) {
    return;
  }
  const isList = bookmarkLayout === "list";
  const label = isList ? t("switchBookmarkLayoutToGrid") : t("switchBookmarkLayoutToList");
  setButtonLabel(toggleBookmarkLayoutButton, label);
  toggleBookmarkLayoutButton.setAttribute("aria-pressed", String(isList));
  toggleBookmarkLayoutButton.querySelector(".button-icon").innerHTML = isList ? gridIcon() : listIcon();
}

function applyThemeMode(theme) {
  activeThemeMode = theme === "dark" || theme === "light" || theme === "system" ? theme : DEFAULT_THEME_MODE;
  const resolvedTheme = resolvedThemeMode();
  document.documentElement.dataset.theme = resolvedTheme;
  updateThemeSettingsUi();
}

function resolvedThemeMode() {
  if (activeThemeMode === "system") {
    return systemPrefersDark() ? "dark" : "light";
  }
  return activeThemeMode === "dark" ? "dark" : "light";
}

function systemPrefersDark() {
  return Boolean(systemThemeQuery?.matches || window.matchMedia?.("(prefers-color-scheme: dark)").matches);
}

async function setThemeMode(mode, options = {}) {
  applyThemeMode(mode);
  if (!options.persist) {
    return;
  }
  try {
    await chrome.storage.local.set({ [THEME_STORAGE_KEY]: activeThemeMode });
  } catch (error) {
    console.warn("Failed to save theme mode", error);
  }
}

function bindSystemThemeListener() {
  if (!window.matchMedia) {
    return;
  }
  systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  systemThemeQuery.addEventListener?.("change", handleSystemThemeChange);
}

function handleSystemThemeChange() {
  if (activeThemeMode === "system") {
    applyThemeMode("system");
  } else {
    updateThemeSettingsUi();
  }
}

function defaultThemePaletteSettings() {
  return {
    palette: DEFAULT_THEME_PALETTE,
    custom: { ...DEFAULT_CUSTOM_THEME_COLORS }
  };
}

function normalizeThemePaletteSettings(value) {
  const fallback = defaultThemePaletteSettings();
  if (!value || typeof value !== "object") {
    return fallback;
  }
  const palette = value.palette === CUSTOM_THEME_PALETTE_ID || THEME_PALETTES.some((item) => item.id === value.palette)
    ? value.palette
    : DEFAULT_THEME_PALETTE;
  return {
    palette,
    custom: {
      light: normalizeColor(value.custom?.light, fallback.custom.light),
      dark: normalizeColor(value.custom?.dark, fallback.custom.dark)
    }
  };
}

function normalizeColor(value, fallback) {
  return /^#[\da-f]{6}$/i.test(String(value || "")) ? String(value).toLowerCase() : fallback;
}

function renderThemePalettePresets() {
  palettePresetGrid.replaceChildren(...THEME_PALETTES.map((palette) => {
    const button = document.createElement("button");
    button.className = "palette-preset-button";
    button.type = "button";
    button.dataset.palette = palette.id;
    button.setAttribute("role", "radio");
    const lightMode = palette.modes.light;
    const darkMode = palette.modes.dark;
    button.innerHTML = `
      <span class="palette-swatch-pair" aria-hidden="true">
        <span style="background:${lightMode.accent}"></span>
        <span style="background:${darkMode.accent}"></span>
      </span>
      <span class="palette-preset-name">${palette.label}</span>
    `;
    button.addEventListener("click", () => setThemePalette(palette.id, { persist: true }));
    return button;
  }));
}

async function setThemePalette(paletteId, options = {}) {
  activeThemePalette = paletteId === CUSTOM_THEME_PALETTE_ID || THEME_PALETTES.some((palette) => palette.id === paletteId)
    ? paletteId
    : DEFAULT_THEME_PALETTE;
  applyThemePalette();
  updateThemeSettingsUi();
  if (!options.persist) {
    return;
  }
  await saveThemePaletteSettings();
}

function applyThemePalette() {
  if (activeThemePalette === CUSTOM_THEME_PALETTE_ID) {
    const basePalette = themePaletteById(DEFAULT_THEME_PALETTE);
    setThemeVariables({
      modes: {
        light: {
          ...basePalette.modes.light,
          accent: activeCustomThemeColors.light,
          accentStrong: mixHexColors(activeCustomThemeColors.light, "#000000", 0.32),
          focus: mixHexColors(activeCustomThemeColors.light, "#2f82c4", 0.48)
        },
        dark: {
          ...basePalette.modes.dark,
          accent: activeCustomThemeColors.dark,
          accentStrong: mixHexColors(activeCustomThemeColors.dark, "#ffffff", 0.28),
          focus: mixHexColors(activeCustomThemeColors.dark, "#68b7f2", 0.4),
          onAccent: readableTextColor(activeCustomThemeColors.dark)
        }
      }
    });
    return;
  }
  setThemeVariables(themePaletteById(activeThemePalette));
}

function themePaletteById(paletteId) {
  return THEME_PALETTES.find((palette) => palette.id === paletteId) || THEME_PALETTES[0];
}

function setThemeVariables(palette) {
  const rootStyle = document.documentElement.style;
  setModeThemeVariables(rootStyle, "light", palette.modes.light);
  setModeThemeVariables(rootStyle, "dark", palette.modes.dark);
}

function setModeThemeVariables(rootStyle, mode, colors) {
  const prefix = `--${mode}`;
  setColorVariable(rootStyle, `${prefix}-accent`, colors.accent);
  setColorVariable(rootStyle, `${prefix}-focus`, colors.focus);
  rootStyle.setProperty(`${prefix}-accent-strong`, colors.accentStrong);
  rootStyle.setProperty(`${prefix}-on-accent`, colors.onAccent || readableTextColor(colors.accent));
  rootStyle.setProperty(`${prefix}-paper`, colors.paper);
  rootStyle.setProperty(`${prefix}-panel`, colors.panel);
  rootStyle.setProperty(`${prefix}-panel-soft`, colors.panelSoft);
  rootStyle.setProperty(`${prefix}-input-bg`, colors.inputBg);
  rootStyle.setProperty(`${prefix}-hover-bg`, colors.hoverBg);
  rootStyle.setProperty(`${prefix}-ink`, colors.ink);
  rootStyle.setProperty(`${prefix}-muted`, colors.muted);
  rootStyle.setProperty(`${prefix}-faint`, colors.faint);
  rootStyle.setProperty(`${prefix}-glass-panel`, mode === "dark"
    ? `rgba(${hexToRgb(colors.panel).join(", ")}, 0.86)`
    : "rgba(255, 255, 255, 0.86)");
  rootStyle.setProperty(`${prefix}-glass-panel-soft`, mode === "dark"
    ? `rgba(${hexToRgb(colors.panelSoft).join(", ")}, 0.78)`
    : "rgba(255, 255, 255, 0.7)");
  rootStyle.setProperty(`${prefix}-icon-tile`, mode === "dark" ? "rgba(255, 255, 255, 0.9)" : "#ffffff");
  rootStyle.setProperty(`${prefix}-icon-line`, mode === "dark" ? "rgba(244, 250, 247, 0.1)" : "rgba(20, 27, 24, 0.08)");
  rootStyle.setProperty(`${prefix}-line`, mode === "dark" ? "rgba(239, 246, 243, 0.12)" : "rgba(19, 25, 21, 0.12)");
  rootStyle.setProperty(`${prefix}-line-strong`, mode === "dark" ? "rgba(239, 246, 243, 0.24)" : "rgba(19, 25, 21, 0.23)");
}

function setColorVariable(rootStyle, name, color) {
  rootStyle.setProperty(name, color);
  rootStyle.setProperty(`${name}-rgb`, hexToRgb(color).join(" "));
}

function readableTextColor(backgroundColor) {
  const darkText = "#102019";
  const lightText = "#ffffff";
  return contrastRatio(backgroundColor, darkText) >= contrastRatio(backgroundColor, lightText) ? darkText : lightText;
}

function contrastRatio(colorA, colorB) {
  const [lighter, darker] = [relativeLuminance(colorA), relativeLuminance(colorB)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color) {
  return hexToRgb(color)
    .map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    })
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function mixHexColors(color, target, amount) {
  const sourceRgb = hexToRgb(color);
  const targetRgb = hexToRgb(target);
  const mixed = sourceRgb.map((channel, index) => {
    return Math.round(channel + (targetRgb[index] - channel) * amount);
  });
  return rgbToHex(mixed);
}

function hexToRgb(color) {
  const normalized = normalizeColor(color, "#000000").slice(1);
  return [0, 2, 4].map((start) => parseInt(normalized.slice(start, start + 2), 16));
}

function rgbToHex(channels) {
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

async function handleCustomThemeColorInput() {
  activeThemePalette = CUSTOM_THEME_PALETTE_ID;
  activeCustomThemeColors = {
    light: normalizeColor(lightAccentInput.value, DEFAULT_CUSTOM_THEME_COLORS.light),
    dark: normalizeColor(darkAccentInput.value, DEFAULT_CUSTOM_THEME_COLORS.dark)
  };
  updateCustomThemeInputs();
  applyThemePalette();
  updateThemeSettingsUi();
  await saveThemePaletteSettings();
}

function updateCustomThemeInputs() {
  lightAccentInput.value = activeCustomThemeColors.light;
  darkAccentInput.value = activeCustomThemeColors.dark;
  lightAccentValue.value = activeCustomThemeColors.light;
  darkAccentValue.value = activeCustomThemeColors.dark;
}

async function saveThemePaletteSettings() {
  try {
    await chrome.storage.local.set({
      [THEME_PALETTE_STORAGE_KEY]: {
        palette: activeThemePalette,
        custom: activeCustomThemeColors
      }
    });
  } catch (error) {
    console.warn("Failed to save theme palette", error);
  }
}

function updateThemeSettingsUi() {
  const themeModeOptions = [...document.querySelectorAll("[data-theme-mode]")];
  const activeThemeModeIndex = Math.max(0, themeModeOptions.findIndex((button) => button.dataset.themeMode === activeThemeMode));
  document.querySelector(".theme-mode-control")?.setAttribute("data-active-index", String(activeThemeModeIndex));
  themeModeOptions.forEach((button) => {
    const isActive = button.dataset.themeMode === activeThemeMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  palettePresetGrid.querySelectorAll(".palette-preset-button").forEach((button) => {
    const isActive = button.dataset.palette === activeThemePalette;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function toggleSettingsPanel() {
  if (settingsPanel.hidden) {
    openSettingsPanel();
    return;
  }
  closeSettingsPanel({ restoreFocus: true });
}

function openSettingsPanel() {
  closeSearchEngineMenu();
  window.clearTimeout(settingsPanelCloseTimer);
  settingsPanel.hidden = false;
  settingsPanel.dataset.open = "true";
  settingsButton.setAttribute("aria-expanded", "true");
  updateThemeSettingsUi();
}

function closeSettingsPanel(options = {}) {
  if (settingsPanel.hidden && settingsPanel.dataset.open !== "true") {
    return;
  }
  window.clearTimeout(settingsPanelCloseTimer);
  settingsPanel.dataset.open = "false";
  settingsButton.setAttribute("aria-expanded", "false");
  settingsPanelCloseTimer = window.setTimeout(() => {
    if (settingsPanel.dataset.open !== "true") {
      settingsPanel.hidden = true;
    }
  }, 180);
  if (options.restoreFocus) {
    settingsButton.focus({ preventScroll: true });
  }
}

function handleSettingsPanelDismiss(event) {
  if (settingsPanel.hidden) {
    return;
  }
  const target = event.target;
  if (target instanceof Element && (settingsPanel.contains(target) || settingsButton.contains(target))) {
    return;
  }
  closeSettingsPanel();
}

function handleQuickSearchSubmit(event) {
  event.preventDefault();
  submitQuickSearch();
}

function handleQuickSearchInputKeydown(event) {
  if (event.key !== "Enter" || event.isComposing) {
    return;
  }
  event.preventDefault();
  submitQuickSearch();
}

function submitQuickSearch() {
  const query = normalizeText(quickSearchInput.value);
  if (!query) {
    quickSearchInput.focus();
    return;
  }
  window.location.assign(quickSearchDestination(query));
}

function quickSearchDestination(query) {
  const localUrl = localhostUrl(query);
  if (localUrl) {
    return localUrl;
  }
  const directUrl = looksLikeUrl(query) ? normalizePortalUrl(query) : "";
  if (directUrl) {
    return directUrl;
  }

  const engine = searchEngineById(activeSearchEngine);
  const searchUrl = new URL(engine.searchUrl);
  searchUrl.searchParams.set(engine.queryParam, query);
  return searchUrl.href;
}

function looksLikeUrl(value) {
  return /^[a-z][a-z\d+.-]*:\/\//i.test(value)
    || /^[\w.-]+\.[a-z]{2,}(?:[/:?#]|$)/i.test(value)
    || /^localhost(?::\d+)?(?:[/?#]|$)/i.test(value);
}

function localhostUrl(value) {
  return /^localhost(?::\d+)?(?:[/?#]|$)/i.test(value)
    ? normalizePortalUrl(`http://${value}`)
    : "";
}

async function renderPortals() {
  const fragment = document.createDocumentFragment();
  const customPortals = await loadCustomPortals();
  const portalData = await loadBookmarkDrivenPortals(customPortals);
  const featuredPortals = featuredPortalItems(portalData.items);
  const groups = groupPortalsByCategory(portalData.items);
  const sectionOrder = await loadPortalSectionOrder();
  portalCategoriesExpanded = await loadPortalCategoriesExpanded();
  featuredPortalsExpanded = await loadFeaturedPortalsExpanded();
  activePortalCategory = resolvedActivePortalCategory(groups);
  if (groups.length) {
    fragment.appendChild(createPortalCategoryTabs(groups, portalCategoriesExpanded));
  }
  const sectionByRole = new Map();
  if (featuredPortals.length) {
    sectionByRole.set("featured", createPortalCategorySection({
      category: "featured",
      items: featuredPortals,
      featured: true,
      expanded: featuredPortalsExpanded,
      reorderRole: "featured"
    }));
  }
  const activeGroup = groups.find((group) => group.category === activePortalCategory);
  if (activeGroup) {
    sectionByRole.set("active", createPortalCategorySection({
      ...activeGroup,
      active: true,
      reorderRole: "active"
    }));
  }
  sectionOrder.forEach((role) => {
    const section = sectionByRole.get(role);
    if (section) {
      fragment.appendChild(section);
    }
  });
  sectionByRole.forEach((section, role) => {
    if (!sectionOrder.includes(role)) {
      fragment.appendChild(section);
    }
  });
  if (portalData.recentItems.length) {
    fragment.appendChild(createPortalCategorySection({
      category: "recentBookmarks",
      items: portalData.recentItems,
      recent: true
    }));
  }
  portalGrid.replaceChildren(fragment);
}

async function loadPortalSectionOrder() {
  try {
    const result = await chrome.storage.local.get({ [PORTAL_SECTION_ORDER_STORAGE_KEY]: DEFAULT_PORTAL_SECTION_ORDER });
    const parsed = result[PORTAL_SECTION_ORDER_STORAGE_KEY];
    if (!Array.isArray(parsed)) {
      return DEFAULT_PORTAL_SECTION_ORDER.slice();
    }
    const order = parsed.filter((role) => DEFAULT_PORTAL_SECTION_ORDER.includes(role));
    return order.length ? order : DEFAULT_PORTAL_SECTION_ORDER.slice();
  } catch {
    return DEFAULT_PORTAL_SECTION_ORDER.slice();
  }
}

async function savePortalSectionOrder(order) {
  await chrome.storage.local.set({ [PORTAL_SECTION_ORDER_STORAGE_KEY]: order });
}

async function loadPortalCategoriesExpanded() {
  try {
    const result = await chrome.storage.local.get({ [PORTAL_CATEGORIES_EXPANDED_STORAGE_KEY]: false });
    return Boolean(result[PORTAL_CATEGORIES_EXPANDED_STORAGE_KEY]);
  } catch {
    return false;
  }
}

async function savePortalCategoriesExpanded(expanded) {
  await chrome.storage.local.set({ [PORTAL_CATEGORIES_EXPANDED_STORAGE_KEY]: Boolean(expanded) });
}

async function loadFeaturedPortalsExpanded() {
  try {
    const result = await chrome.storage.local.get({ [FEATURED_PORTALS_EXPANDED_STORAGE_KEY]: true });
    return Boolean(result[FEATURED_PORTALS_EXPANDED_STORAGE_KEY]);
  } catch {
    return true;
  }
}

async function saveFeaturedPortalsExpanded(expanded) {
  await chrome.storage.local.set({ [FEATURED_PORTALS_EXPANDED_STORAGE_KEY]: Boolean(expanded) });
}

async function togglePortalCategoriesExpanded() {
  portalCategoriesExpanded = !portalCategoriesExpanded;
  applyPortalCategoryExpansionState(portalCategoriesExpanded);
  await savePortalCategoriesExpanded(portalCategoriesExpanded);
}

function applyPortalCategoryExpansionState(expanded) {
  const switcher = portalGrid.querySelector(".portal-category-switcher");
  const toggleButton = switcher?.querySelector(".portal-switcher-toggle");
  if (!switcher || !toggleButton) {
    return;
  }
  const hiddenCount = Number(switcher.dataset.hiddenCount || 0);
  const isCollapsible = hiddenCount > 0;
  switcher.classList.toggle("expanded", expanded || !isCollapsible);
  switcher.classList.toggle("collapsed", !expanded && isCollapsible);
  toggleButton.setAttribute("aria-expanded", String(expanded));
  toggleButton.querySelector(".portal-switcher-toggle-label").textContent = expanded
    ? t("portalCategoriesCollapse")
    : t("portalCategoriesExpand");
}

async function toggleFeaturedPortalsExpanded(section) {
  featuredPortalsExpanded = !featuredPortalsExpanded;
  applyFeaturedPortalsExpansionState(section, featuredPortalsExpanded);
  await saveFeaturedPortalsExpanded(featuredPortalsExpanded);
}

function applyFeaturedPortalsExpansionState(section, expanded) {
  if (!section) {
    return;
  }
  const toggleButton = section.querySelector(".portal-category-toggle");
  const hiddenCount = Number(section.dataset.hiddenCount || 0);
  const isCollapsible = hiddenCount > 0;
  section.classList.toggle("expanded", expanded || !isCollapsible);
  section.classList.toggle("collapsed", !expanded && isCollapsible);
  if (!toggleButton) {
    return;
  }
  toggleButton.setAttribute("aria-expanded", String(expanded || !isCollapsible));
  toggleButton.querySelector(".portal-category-toggle-label").textContent = expanded || !isCollapsible
    ? t("featuredPortalsCollapse")
    : t("featuredPortalsExpand");
  toggleButton.querySelector(".portal-category-toggle-icon").innerHTML = expanded || !isCollapsible
    ? chevronUpIcon()
    : chevronDownIcon();
}

async function swapPortalSectionOrder(sourceRole, targetRole) {
  if (!sourceRole || !targetRole || sourceRole === targetRole) {
    return;
  }
  const order = await loadPortalSectionOrder();
  const sourceIndex = order.indexOf(sourceRole);
  const targetIndex = order.indexOf(targetRole);
  if (sourceIndex === -1 || targetIndex === -1) {
    return;
  }
  [order[sourceIndex], order[targetIndex]] = [order[targetIndex], order[sourceIndex]];
  await savePortalSectionOrder(order);
}

async function loadBookmarkDrivenPortals(customPortals) {
  const bookmarkData = await loadBookmarkPortalItems();
  const bookmarkItems = bookmarkData.items;
  const items = bookmarkItems.length
    ? mergePortalItems(customPortals, bookmarkItems)
    : mergePortalItems(customPortals, PORTALS);

  return {
    items,
    recentItems: bookmarkData.recentItems,
    usingBookmarks: bookmarkItems.length > 0
  };
}

async function loadBookmarkPortalItems() {
  if (!chrome.bookmarks?.getTree) {
    return {
      items: [],
      recentItems: []
    };
  }

  try {
    const [tree, historyItems] = await Promise.all([
      chrome.bookmarks.getTree(),
      loadBookmarkRankingHistory()
    ]);
    const entries = flattenBookmarkSites(tree);
    const historyStats = bookmarkHistoryStats(historyItems);
    return {
      items: bookmarkEntriesToPortalItems(entries, historyStats),
      recentItems: recentBookmarkPortalItems(entries)
    };
  } catch (error) {
    console.warn("Failed to load bookmark shortcuts", error);
    return {
      items: [],
      recentItems: []
    };
  }
}

async function loadBookmarkRankingHistory() {
  if (!chrome.history?.search) {
    return [];
  }
  try {
    return await chrome.history.search({
      text: "",
      startTime: Date.now() - 1000 * 60 * 60 * 24 * BOOKMARK_HISTORY_LOOKBACK_DAYS,
      maxResults: MAX_BOOKMARK_HISTORY_ITEMS
    });
  } catch {
    return [];
  }
}

function flattenBookmarkSites(nodes, parents = []) {
  const sites = [];

  for (const node of nodes || []) {
    const title = normalizeText(node.title);
    const pathParts = node.url ? parents : (title ? [...parents, title] : parents);
    if (node.url && isWebUrl(node.url)) {
      sites.push({
        bookmarkId: node.id,
        title,
        url: node.url,
        path: parents.join(" / "),
        dateAdded: Number(node.dateAdded || 0),
        dateLastUsed: Number(node.dateLastUsed || 0)
      });
      continue;
    }
    if (Array.isArray(node.children)) {
      sites.push(...flattenBookmarkSites(node.children, pathParts));
    }
  }

  return sites;
}

function bookmarkEntriesToPortalItems(entries, historyStats) {
  const bySite = new Map();

  for (const entry of entries) {
    const url = safeUrl(entry.url);
    const key = siteGroupKey(url);
    if (!key) {
      continue;
    }
    const history = historyStats.get(key) || {};
    const item = {
      bookmarkId: entry.bookmarkId,
      title: siteDisplayName(url, entry.title),
      url: siteHomeUrl(key, entry.url),
      category: bookmarkCategoryForEntry(entry, url),
      bookmarkPath: entry.path,
      dateAdded: entry.dateAdded,
      score: bookmarkPortalScore(entry, history)
    };
    const existing = bySite.get(key);
    if (!existing || item.score > existing.score) {
      bySite.set(key, item);
    }
  }

  return [...bySite.values()]
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, LOCALE))
    .slice(0, MAX_BOOKMARK_PORTAL_ITEMS);
}

function recentBookmarkPortalItems(entries) {
  const recent = [];
  const seen = new Set();

  for (const entry of [...entries].sort((a, b) => b.dateAdded - a.dateAdded)) {
    const url = safeUrl(entry.url);
    const key = siteGroupKey(url);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    recent.push({
      bookmarkId: entry.bookmarkId,
      title: siteDisplayName(url, entry.title),
      url: entry.url,
      category: "recentBookmarks",
      dateAdded: entry.dateAdded
    });
    if (recent.length >= MAX_RECENT_BOOKMARK_ITEMS) {
      break;
    }
  }

  return recent;
}

function bookmarkHistoryStats(historyItems) {
  const stats = new Map();

  for (const item of historyItems || []) {
    const url = safeUrl(item.url);
    const key = siteGroupKey(url);
    if (!key) {
      continue;
    }
    const current = stats.get(key) || {
      visits: 0,
      lastVisitTime: 0
    };
    current.visits += Math.max(1, Number(item.visitCount || 0));
    current.lastVisitTime = Math.max(current.lastVisitTime, Number(item.lastVisitTime || 0));
    stats.set(key, current);
  }

  return stats;
}

function bookmarkPortalScore(entry, history) {
  const savedAt = Math.max(Number(entry.dateAdded || 0), Number(entry.dateLastUsed || 0));
  return (Number(history.visits || 0) * 12)
    + recencyScore(Number(history.lastVisitTime || 0), BOOKMARK_HISTORY_LOOKBACK_DAYS) * 18
    + recencyScore(savedAt, 180) * 10
    + folderPriorityScore(entry.path);
}

function recencyScore(timestamp, days) {
  if (!timestamp) {
    return 0;
  }
  const age = Date.now() - Number(timestamp);
  if (!Number.isFinite(age) || age < 0) {
    return 1;
  }
  return Math.max(0, 1 - (age / (1000 * 60 * 60 * 24 * days)));
}

function folderPriorityScore(path) {
  const lower = normalizeText(path).toLowerCase();
  if (matchesAny(lower, ["书签栏", "favorites bar", "bookmarks bar", "toolbar", "常用", "快捷", "quick", "pinned"])) {
    return 18;
  }
  if (matchesAny(lower, ["work", "工作", "开发", "design", "效率", "productivity"])) {
    return 8;
  }
  return 0;
}

function bookmarkCategoryForEntry(entry, url) {
  const siteKey = siteGroupKey(url);
  const title = normalizeText(entry.title).toLowerCase();
  const path = normalizeText(entry.path).toLowerCase();
  const host = `${url.hostname} ${siteKey}`.toLowerCase();
  const combinedText = `${title} ${path}`.toLowerCase();
  const scores = new Map(PORTAL_CATEGORY_ORDER.map((category) => [category, 0]));
  const knownCategory = PORTAL_CATEGORY_BY_SITE_KEY[siteKey];
  if (knownCategory) {
    scores.set(knownCategory, (scores.get(knownCategory) || 0) + 80);
  }

  Object.entries(BOOKMARK_CATEGORY_RULES).forEach(([category, rule]) => {
    if (matchesAny(host, rule.hosts)) {
      scores.set(category, (scores.get(category) || 0) + 36);
    }
    if (matchesAny(title, rule.text)) {
      scores.set(category, (scores.get(category) || 0) + 18);
    }
    if (matchesAny(path, rule.text)) {
      scores.set(category, (scores.get(category) || 0) + 14);
    }
    if (matchesAny(combinedText, rule.hosts)) {
      scores.set(category, (scores.get(category) || 0) + 8);
    }
  });

  const [bestCategory, bestScore] = [...scores.entries()]
    .filter(([category]) => PORTAL_CATEGORY_ORDER.includes(category))
    .sort(([categoryA, scoreA], [categoryB, scoreB]) => (
      scoreB - scoreA || categoryOrderIndex(categoryA) - categoryOrderIndex(categoryB)
    ))[0] || ["other", 0];
  return bestScore > 0 ? bestCategory : "other";
}

function matchesAny(value, needles) {
  return needles.some((needle) => value.includes(String(needle).toLowerCase()));
}

function mergePortalItems(priorityItems, secondaryItems) {
  const seen = new Set();
  const merged = [];

  for (const item of [...priorityItems, ...secondaryItems]) {
    const key = siteGroupKey(safeUrl(item.url)) || normalizeText(item.url).toLowerCase();
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function resolvedActivePortalCategory(groups) {
  if (groups.some((group) => group.category === activePortalCategory)) {
    return activePortalCategory;
  }
  if (groups.some((group) => group.category === DEFAULT_PORTAL_CATEGORY)) {
    return DEFAULT_PORTAL_CATEGORY;
  }
  return groups[0]?.category || DEFAULT_PORTAL_CATEGORY;
}

function createPortalCategoryTabs(groups, expanded) {
  const section = document.createElement("section");
  const header = document.createElement("header");
  const title = document.createElement("h3");
  const toggleButton = document.createElement("button");
  const toggleLabel = document.createElement("span");
  const toggleIcon = document.createElement("span");
  const nav = document.createElement("nav");
  const hiddenCount = Math.max(0, groups.length - COLLAPSED_PORTAL_CATEGORY_COUNT);
  const visibleRowCount = Math.ceil(Math.min(groups.length, COLLAPSED_PORTAL_CATEGORY_COUNT) / 2);
  const expandedRowCount = Math.ceil(groups.length / 2);
  const collapsedHeight = Math.max(42, visibleRowCount * 42 + Math.max(0, visibleRowCount - 1) * 8);
  const expandedHeight = Math.max(collapsedHeight, expandedRowCount * 42 + Math.max(0, expandedRowCount - 1) * 8);
  section.className = "portal-category-switcher";
  section.classList.toggle("expanded", expanded || hiddenCount === 0);
  section.classList.toggle("collapsed", !expanded && hiddenCount > 0);
  section.dataset.hiddenCount = String(hiddenCount);
  section.style.setProperty("--portal-tabs-collapsed-height", `${collapsedHeight}px`);
  section.style.setProperty("--portal-tabs-expanded-height", `${expandedHeight}px`);
  header.className = "portal-switcher-header";
  title.className = "portal-switcher-title";
  title.textContent = t("portalCategories");
  toggleButton.className = "portal-switcher-toggle";
  toggleButton.type = "button";
  toggleButton.hidden = hiddenCount === 0;
  toggleButton.setAttribute("aria-expanded", String(expanded));
  toggleLabel.className = "portal-switcher-toggle-label";
  toggleLabel.textContent = expanded ? t("portalCategoriesCollapse") : t("portalCategoriesExpand");
  toggleIcon.className = "portal-switcher-toggle-icon";
  toggleIcon.setAttribute("aria-hidden", "true");
  toggleIcon.innerHTML = chevronDownIcon();
  toggleButton.append(toggleLabel, toggleIcon);
  toggleButton.addEventListener("click", togglePortalCategoriesExpanded);
  nav.className = "portal-category-tabs";
  nav.setAttribute("aria-label", t("portalCategories"));
  header.append(title, toggleButton);

  groups.forEach((group, index) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const copy = document.createElement("span");
    const label = document.createElement("span");
    const meta = document.createElement("span");
    const count = document.createElement("span");
    const isActive = group.category === activePortalCategory;

    button.className = "portal-category-tab";
    button.dataset.category = group.category;
    if (index >= COLLAPSED_PORTAL_CATEGORY_COUNT) {
      button.dataset.overflow = "true";
    }
    button.classList.toggle("active", isActive);
    button.type = "button";
    button.setAttribute("aria-pressed", String(isActive));
    marker.className = "portal-category-marker";
    copy.className = "portal-category-copy";
    label.className = "portal-category-name";
    label.textContent = portalCategoryLabel(group.category);
    meta.className = "portal-category-meta";
    meta.textContent = t("portalCategoryItems", { count: group.items.length });
    count.className = "portal-category-tab-count";
    count.textContent = String(group.items.length);
    copy.append(label, meta);
    button.append(marker, copy, count);
    button.addEventListener("click", () => {
      activePortalCategory = group.category;
      renderPortals();
    });
    nav.appendChild(button);
  });

  section.append(header, nav);
  return section;
}

function featuredPortalItems(portals) {
  return portals.slice(0, MAX_PORTAL_FEATURED_ITEMS);
}

function groupPortalsByCategory(portals) {
  const groups = new Map();
  portals.forEach((portal) => {
    const category = portal.category || "other";
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push(portal);
  });

  return [...groups.entries()]
    .sort(([categoryA], [categoryB]) => categoryOrderIndex(categoryA) - categoryOrderIndex(categoryB))
    .map(([category, items]) => ({ category, items }));
}

function categoryOrderIndex(category) {
  const index = PORTAL_CATEGORY_ORDER.indexOf(category);
  return index === -1 ? PORTAL_CATEGORY_ORDER.length : index;
}

function createPortalCategorySection(group) {
  const section = document.createElement("section");
  const header = document.createElement("header");
  const title = document.createElement("h3");
  const headingActions = document.createElement("span");
  const grid = document.createElement("div");
  const visibleItems = group.featured
    ? group.items.slice(0, MAX_PORTAL_FEATURED_ITEMS)
    : group.items;
  const hiddenCount = group.featured
    ? Math.max(0, visibleItems.length - COLLAPSED_FEATURED_PORTAL_ITEMS)
    : 0;
  const isExpanded = group.expanded !== false || hiddenCount === 0;

  section.className = "portal-category";
  section.classList.toggle("featured-category", Boolean(group.featured));
  section.classList.toggle("expanded", isExpanded);
  section.classList.toggle("collapsed", Boolean(group.featured) && !isExpanded);
  section.classList.toggle("active-category", Boolean(group.active));
  section.classList.toggle("recent-bookmark-category", Boolean(group.recent));
  section.dataset.hiddenCount = String(hiddenCount);
  header.className = "portal-category-header";
  if (group.reorderRole) {
    section.dataset.portalSectionRole = group.reorderRole;
    header.draggable = true;
    bindPortalSectionDrag(section, header, group.reorderRole);
  }
  title.className = "portal-category-title";
  title.textContent = portalCategoryLabel(group.category);
  grid.className = "portal-category-grid";
  if (group.featured) {
    grid.id = "featuredPortalGrid";
  }
  visibleItems.forEach((portal, index) => {
    const card = createSiteCard(portal);
    if (group.featured && index >= COLLAPSED_FEATURED_PORTAL_ITEMS) {
      card.dataset.overflow = "true";
    }
    grid.appendChild(card);
  });
  headingActions.className = "portal-category-actions";
  if (group.featured && hiddenCount > 0) {
    const toggleButton = document.createElement("button");
    const toggleLabel = document.createElement("span");
    const toggleIcon = document.createElement("span");
    toggleButton.className = "portal-category-toggle";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-controls", grid.id);
    toggleButton.setAttribute("aria-expanded", String(isExpanded));
    toggleLabel.className = "portal-category-toggle-label";
    toggleLabel.textContent = isExpanded
      ? t("featuredPortalsCollapse")
      : t("featuredPortalsExpand");
    toggleIcon.className = "portal-category-toggle-icon";
    toggleIcon.setAttribute("aria-hidden", "true");
    toggleIcon.innerHTML = isExpanded ? chevronUpIcon() : chevronDownIcon();
    toggleButton.append(toggleLabel, toggleIcon);
    toggleButton.addEventListener("click", () => toggleFeaturedPortalsExpanded(section));
    headingActions.appendChild(toggleButton);
  }
  header.append(title, headingActions);
  section.append(header, grid);
  return section;
}

function bindPortalSectionDrag(section, handle, role) {
  let lastDropPosition = "";
  handle.addEventListener("dragstart", (event) => {
    draggedPortalSectionRole = role;
    section.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", role);
  });
  handle.addEventListener("dragend", () => {
    draggedPortalSectionRole = "";
    clearPortalDropIndicators();
  });
  section.addEventListener("dragover", (event) => {
    if (!draggedPortalSectionRole || draggedPortalSectionRole === role) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const rect = section.getBoundingClientRect();
    const before = event.clientY < rect.top + rect.height / 2;
    const nextPosition = before ? "before" : "after";
    if (section.classList.contains("drag-over") && lastDropPosition === nextPosition) {
      return;
    }
    lastDropPosition = nextPosition;
    clearPortalDropIndicators(section);
    section.classList.add("drag-over");
    section.classList.toggle("drop-before", before);
    section.classList.toggle("drop-after", !before);
  });
  section.addEventListener("dragleave", () => {
    lastDropPosition = "";
    section.classList.remove("drag-over", "drop-before", "drop-after");
  });
  section.addEventListener("drop", async (event) => {
    event.preventDefault();
    const sourceRole = event.dataTransfer.getData("text/plain") || draggedPortalSectionRole;
    lastDropPosition = "";
    section.classList.remove("drag-over", "drop-before", "drop-after");
    await swapPortalSectionOrder(sourceRole, role);
    renderPortals();
  });
}

function clearPortalDropIndicators(keepNode = null) {
  document.querySelectorAll(".portal-category.dragging, .portal-category.drag-over, .portal-category.drop-before, .portal-category.drop-after").forEach((node) => {
    if (node !== keepNode) {
      node.classList.remove("drag-over", "drop-before", "drop-after");
      if (!keepNode) {
        node.classList.remove("dragging");
      }
    }
  });
}

function portalCategoryLabel(category) {
  if (category === "featured") {
    return t("portalCategoryFeatured");
  }
  if (category === "recentBookmarks") {
    return t("portalCategoryRecentBookmarks");
  }
  const messageKey = `portalCategory${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  return t(messageKey);
}

function populatePortalCategoryOptions() {
  portalCategorySelect.replaceChildren(...PORTAL_CATEGORY_ORDER.map((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = portalCategoryLabel(category);
    return option;
  }));
  portalCategorySelect.value = "custom";
}

function createSiteCard(site) {
  const node = siteCardTemplate.content.firstElementChild.cloneNode(true);
  const link = node.querySelector(".site-link");
  const icon = node.querySelector(".site-icon");
  const domain = node.querySelector(".site-domain");
  const removeButton = node.querySelector(".site-remove");
  link.href = site.url;
  applySiteIcon(icon, site);
  icon.alt = "";
  node.querySelector(".site-title").textContent = site.title;
  domain.textContent = compactSiteDomain(site.url);
  if (site.custom) {
    node.classList.add("custom");
    setButtonLabel(removeButton, t("deleteCustomPortal"));
    removeButton.innerHTML = trashIcon();
    removeButton.addEventListener("click", () => removeCustomPortal(site.id));
  } else {
    removeButton.remove();
  }
  return node;
}

function compactSiteDomain(url) {
  const parsedUrl = safeUrl(url);
  if (!parsedUrl) {
    return "";
  }
  return parsedUrl.hostname.replace(/^www\./, "");
}

function applySiteIcon(icon, site) {
  const localIcon = site.icon || localIconForUrl(site.url);
  if (localIcon) {
    icon.src = localIcon;
    icon.removeAttribute("srcset");
    bindFaviconFallback(icon, site, 128);
  } else {
    applyFaviconIcon(icon, site, 128);
  }
}

function localIconForUrl(url) {
  const parsedUrl = safeUrl(url);
  const siteKey = siteGroupKey(parsedUrl);
  return siteKey ? SITE_ICON_BY_SITE_KEY[siteKey] || "" : "";
}

function applyHistoryIcon(icon, site) {
  const localIcon = localIconForUrl(site.url);
  if (localIcon) {
    icon.src = localIcon;
    icon.removeAttribute("srcset");
    bindFaviconFallback(icon, site, 64);
  } else {
    applyFaviconIcon(icon, site, 64);
  }
}

function bindFaviconFallback(icon, site, size) {
  icon.addEventListener("error", () => {
    applyFaviconIcon(icon, site, size);
  }, { once: true });
}

function applyFaviconIcon(icon, site, size) {
  icon.src = faviconUrl(site.url, size);
  icon.srcset = `${faviconUrl(site.url, Math.max(16, size / 2))} 1x, ${faviconUrl(site.url, size)} 2x`;
  icon.addEventListener("error", () => {
    applyGeneratedFallbackIcon(icon, site);
  }, { once: true });
}

function showPortalForm() {
  portalForm.hidden = false;
  portalFormError.textContent = "";
  portalTitleInput.focus();
}

function hidePortalForm() {
  portalForm.hidden = true;
  portalForm.reset();
  portalFormError.textContent = "";
}

async function handlePortalSubmit(event) {
  event.preventDefault();
  portalFormError.textContent = "";

  const title = normalizeText(portalTitleInput.value).slice(0, MAX_PORTAL_TITLE_LENGTH);
  const url = normalizePortalUrl(portalUrlInput.value);
  const category = normalizePortalCategory(portalCategorySelect.value);

  if (!title) {
    portalFormError.textContent = t("portalNameRequired");
    portalTitleInput.focus();
    return;
  }

  if (!url) {
    portalFormError.textContent = t("portalUrlRequired");
    portalUrlInput.focus();
    return;
  }

  const customPortals = await loadCustomPortals();
  if (customPortals.length >= MAX_CUSTOM_PORTALS) {
    portalFormError.textContent = t("customPortalLimit", { count: MAX_CUSTOM_PORTALS });
    return;
  }

  customPortals.push({
    id: String(Date.now()),
    custom: true,
    title,
    url,
    category
  });
  try {
    await saveCustomPortals(customPortals);
    hidePortalForm();
    renderPortals();
  } catch {
    portalFormError.textContent = t("savePortalFailed");
  }
}

async function loadCustomPortals() {
  try {
    const result = await chrome.storage.local.get({ [CUSTOM_PORTALS_STORAGE_KEY]: [] });
    const parsed = result[CUSTOM_PORTALS_STORAGE_KEY];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((portal) => portal?.custom && portal.title && isWebUrl(portal.url))
      .map((portal) => ({
        ...portal,
        category: normalizePortalCategory(portal.category)
      }));
  } catch (error) {
    console.warn("Failed to load custom portals", error);
    portalFormError.textContent = t("loadCustomPortalsFailed");
    return [];
  }
}

function normalizePortalCategory(category) {
  return PORTAL_CATEGORY_ORDER.includes(category) ? category : "custom";
}

async function saveCustomPortals(portals) {
  await chrome.storage.local.set({ [CUSTOM_PORTALS_STORAGE_KEY]: portals });
}

async function removeCustomPortal(id) {
  const nextPortals = (await loadCustomPortals()).filter((portal) => portal.id !== id);
  try {
    await saveCustomPortals(nextPortals);
    renderPortals();
  } catch {
    portalFormError.textContent = t("deletePortalFailed");
  }
}

async function renderSelectedBookmarkFolder() {
  try {
    clearBookmarkDeleteMode();
    const folderId = await loadSelectedBookmarkFolderId();
    if (!folderId) {
      renderBookmarkEmptyState(t("bookmarkNoFolder"));
      return;
    }

    const folder = await loadBookmarkFolder(folderId);
    if (!folder) {
      await saveSelectedBookmarkFolderId("");
      renderBookmarkEmptyState(t("bookmarkFolderMissing"));
      return;
    }

    const children = await chrome.bookmarks.getChildren(folder.id);
    const sites = children
      .filter((item) => item.url && isWebUrl(item.url))
      .map((item) => ({
        bookmarkId: item.id,
        title: siteDisplayName(safeUrl(item.url), item.title),
        url: item.url
      }));

    bookmarkFolderMeta.textContent = t("bookmarkMeta", {
      folder: folder.title || t("unnamedFolder"),
      count: sites.length
    });
    if (!sites.length) {
      bookmarkGrid.innerHTML = emptyState(t("bookmarkEmpty"));
      return;
    }

    const fragment = document.createDocumentFragment();
    sites.forEach((site) => {
      fragment.appendChild(createBookmarkSiteCard(site));
    });
    bookmarkGrid.replaceChildren(fragment);
  } catch (error) {
    console.warn("Failed to load bookmarks", error);
    renderBookmarkEmptyState(t("bookmarkReadFailed"));
  }
}

function renderBookmarkEmptyState(message) {
  bookmarkFolderMeta.textContent = "";
  bookmarkGrid.innerHTML = emptyState(message);
}

function createBookmarkSiteCard(site) {
  const node = createSiteCard(site);
  const deleteButton = document.createElement("button");

  node.classList.add("bookmark-site-card");
  deleteButton.className = "bookmark-delete-button";
  deleteButton.type = "button";
  deleteButton.innerHTML = `${trashIcon()}<span>${t("deleteBookmarkAction")}</span>`;
  deleteButton.setAttribute("aria-label", t("deleteBookmark", { title: site.title }));
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await removeBookmarkSite(site);
  });
  node.appendChild(deleteButton);
  bindBookmarkLongPress(node, site);
  return node;
}

function bindBookmarkLongPress(node, site) {
  const link = node.querySelector(".site-link");
  let timer = 0;
  let suppressNextClick = false;

  const clearPressTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  };

  const startPress = () => {
    if (node.classList.contains("delete-ready")) {
      return;
    }
    clearPressTimer();
    node.classList.add("pressing");
    timer = window.setTimeout(() => {
      node.classList.remove("pressing");
      suppressNextClick = true;
      showBookmarkDeleteMode(node);
    }, 700);
  };

  const cancelPress = () => {
    clearPressTimer();
    node.classList.remove("pressing");
  };

  link.addEventListener("pointerdown", startPress);
  link.addEventListener("pointerup", cancelPress);
  link.addEventListener("pointerleave", cancelPress);
  link.addEventListener("pointercancel", cancelPress);
  link.addEventListener("dragstart", cancelPress);
  link.addEventListener("click", (event) => {
    if (!node.classList.contains("delete-ready") && !suppressNextClick) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    suppressNextClick = false;
  });

  node.addEventListener("bookmark-delete-mode-clear", () => {
    suppressNextClick = false;
    clearPressTimer();
    node.classList.remove("pressing");
  });
}

function showBookmarkDeleteMode(node) {
  clearBookmarkDeleteMode();
  activeBookmarkDeleteCard = node;
  node.classList.add("delete-ready");
  const deleteButton = node.querySelector(".bookmark-delete-button");
  if (deleteButton) {
    deleteButton.style.display = "grid";
    deleteButton.focus({ preventScroll: true });
  }
}

function handleBookmarkDeleteDismiss(event) {
  if (!activeBookmarkDeleteCard) {
    return;
  }
  const target = event.target;
  if (target instanceof Element && activeBookmarkDeleteCard.contains(target)) {
    return;
  }
  clearBookmarkDeleteMode();
}

function handleBookmarkDeleteEscape(event) {
  if (event.key === "Escape") {
    clearBookmarkDeleteMode();
  }
}

function clearBookmarkDeleteMode() {
  if (!activeBookmarkDeleteCard) {
    return;
  }
  const node = activeBookmarkDeleteCard;
  activeBookmarkDeleteCard = null;
  node.classList.remove("delete-ready");
  if (document.activeElement instanceof Element && node.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  const deleteButton = node.querySelector(".bookmark-delete-button");
  if (deleteButton) {
    deleteButton.style.display = "";
  }
  node.dispatchEvent(new CustomEvent("bookmark-delete-mode-clear"));
}

async function removeBookmarkSite(site) {
  if (!site.bookmarkId) {
    clearBookmarkDeleteMode();
    return;
  }
  try {
    await chrome.bookmarks.remove(site.bookmarkId);
    await renderSelectedBookmarkFolder();
  } catch (error) {
    console.warn("Failed to remove bookmark", error);
    renderBookmarkTransientMessage(t("deleteBookmarkFailed"));
    renderSelectedBookmarkFolder();
  }
}

function renderBookmarkTransientMessage(message) {
  bookmarkFolderMeta.textContent = message;
}

function bindBookmarkChangeEvents() {
  chrome.bookmarks.onCreated.addListener(requestBookmarkRefresh);
  chrome.bookmarks.onRemoved.addListener(requestBookmarkRefresh);
  chrome.bookmarks.onChanged.addListener(requestBookmarkRefresh);
  chrome.bookmarks.onMoved.addListener(requestBookmarkRefresh);
  chrome.bookmarks.onChildrenReordered.addListener(requestBookmarkRefresh);
  chrome.bookmarks.onImportEnded.addListener(requestBookmarkRefresh);
}

function requestBookmarkRefresh() {
  clearTimeout(bookmarkRefreshTimer);
  bookmarkRefreshTimer = window.setTimeout(() => {
    renderPortals();
    if (bookmarkPicker.hidden) {
      renderSelectedBookmarkFolder();
      return;
    }
    openBookmarkPicker();
  }, 120);
}

async function openBookmarkPicker() {
  bookmarkMainView.hidden = true;
  bookmarkPicker.hidden = false;
  setBookmarkPickerMode(true);
  bookmarkFolderList.innerHTML = emptyState(t("loadingBookmarkFolders"));

  try {
    const tree = await chrome.bookmarks.getTree();
    const selectedId = await loadSelectedBookmarkFolderId();
    const folders = flattenBookmarkFolders(tree);
    renderBookmarkFolderOptions(folders, selectedId);
  } catch (error) {
    console.warn("Failed to open bookmark picker", error);
    bookmarkFolderList.innerHTML = emptyState(t("bookmarkFolderReadFailed"));
  }
}

async function closeBookmarkPicker() {
  bookmarkPicker.hidden = true;
  bookmarkMainView.hidden = false;
  setBookmarkPickerMode(false);
  await renderSelectedBookmarkFolder();
}

function setBookmarkPickerMode(isPicking) {
  bookmarkPickerToolbar.hidden = !isPicking;
  bookmarkFolderMeta.closest(".bookmark-toolbar").hidden = isPicking;
  closeBookmarkPickerButton.hidden = !isPicking;
}

function renderBookmarkFolderOptions(folders, selectedId) {
  const visibleFolders = folders
    .filter((folder) => folder.bookmarkCount > 0)
    .slice(0, MAX_BOOKMARK_FOLDER_OPTIONS);

  if (!visibleFolders.length) {
    bookmarkFolderList.innerHTML = emptyState(t("noBookmarkFolders"));
    return;
  }

  const fragment = document.createDocumentFragment();
  visibleFolders.forEach((folder) => {
    const option = document.createElement("button");
    const title = document.createElement("strong");
    const path = document.createElement("span");
    const count = document.createElement("span");

    option.className = "bookmark-folder-option";
    option.classList.toggle("active", folder.id === selectedId);
    option.type = "button";
    title.textContent = folder.title || t("unnamedFolder");
    path.textContent = folder.path;
    count.textContent = `${folder.bookmarkCount}`;
    count.title = t("bookmarkCount", { count: folder.bookmarkCount });
    option.append(title, path, count);
    option.addEventListener("click", () => selectBookmarkFolder(folder.id));
    fragment.appendChild(option);
  });

  bookmarkFolderList.replaceChildren(fragment);
}

async function selectBookmarkFolder(folderId) {
  await saveSelectedBookmarkFolderId(folderId);
  closeBookmarkPicker();
  renderSelectedBookmarkFolder();
}

function flattenBookmarkFolders(nodes, parents = []) {
  const folders = [];

  for (const node of nodes || []) {
    const isFolder = !node.url;
    const title = normalizeText(node.title);
    const pathParts = title ? [...parents, title] : parents;
    if (isFolder && Array.isArray(node.children)) {
      const bookmarkCount = node.children.filter((child) => child.url && isWebUrl(child.url)).length;
      if (node.id !== "0") {
        folders.push({
          id: node.id,
          title,
          path: pathParts.join(" / ") || t("bookmarkRoot"),
          bookmarkCount
        });
      }
      folders.push(...flattenBookmarkFolders(node.children, pathParts));
    }
  }

  return folders;
}

async function loadBookmarkFolder(folderId) {
  try {
    const [folder] = await chrome.bookmarks.get(folderId);
    if (!folder || folder.url) {
      return null;
    }
    return folder;
  } catch {
    return null;
  }
}

async function loadSelectedBookmarkFolderId() {
  const result = await chrome.storage.local.get({ [BOOKMARK_FOLDER_STORAGE_KEY]: "" });
  return String(result[BOOKMARK_FOLDER_STORAGE_KEY] || "");
}

async function saveSelectedBookmarkFolderId(folderId) {
  await chrome.storage.local.set({ [BOOKMARK_FOLDER_STORAGE_KEY]: folderId });
}

function renderMediaFeedDefaultList() {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("span");
  heading.className = "media-feed-default-heading";
  heading.textContent = t("mediaFeedDefaultSources");
  fragment.appendChild(heading);
  MEDIA_FEED_SOURCES
    .filter((source) => source.language === MEDIA_FEED_LOCALE_LANGUAGE)
    .forEach((source) => {
    const item = document.createElement("button");
    const title = document.createElement("strong");
    const url = document.createElement("span");
    item.className = "media-feed-default-item";
    item.type = "button";
    title.textContent = `${source.title} · ${t(source.language === "zh" ? "mediaFeedLanguageZh" : "mediaFeedLanguageEn")}`;
    url.textContent = source.url;
    item.append(title, url);
    item.addEventListener("click", () => {
      mediaFeedUrlInput.value = source.url;
      mediaFeedLanguageSelect.value = source.language;
      mediaFeedFormError.textContent = "";
      mediaFeedUrlInput.focus();
    });
    fragment.appendChild(item);
  });
  mediaFeedDefaultList.replaceChildren(fragment);
}

function activateMediaFeedType(type) {
  const nextType = MEDIA_FEED_TYPE_FILTERS.has(type) ? type : "all";
  activeMediaFeedType = nextType;
  mediaFeedTypeButtons.forEach((button) => {
    const isActive = button.dataset.mediaFeedType === nextType;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderMediaFeedForActiveType();
}

function toggleMediaFeedForm() {
  if (mediaFeedForm.hidden) {
    showMediaFeedForm();
    return;
  }
  hideMediaFeedForm();
}

function showMediaFeedForm() {
  mediaFeedForm.hidden = false;
  toggleMediaFeedFormButton.setAttribute("aria-expanded", "true");
  mediaFeedFormError.textContent = "";
  mediaFeedUrlInput.focus();
}

function hideMediaFeedForm() {
  mediaFeedForm.hidden = true;
  toggleMediaFeedFormButton.setAttribute("aria-expanded", "false");
  mediaFeedForm.reset();
  mediaFeedLanguageSelect.value = "zh";
  mediaFeedFormError.textContent = "";
}

async function handleMediaFeedSubmit(event) {
  event.preventDefault();
  const url = normalizeMediaFeedUrl(mediaFeedUrlInput.value);
  if (!url) {
    mediaFeedFormError.textContent = t("mediaFeedInvalidUrl");
    mediaFeedUrlInput.focus();
    return;
  }

  try {
    const feeds = await loadCustomMediaFeeds();
    const nextFeeds = [
      {
        id: `custom-${Date.now()}`,
        title: readableHostName(new URL(url).hostname),
        language: mediaFeedLanguageSelect.value === "en" ? "en" : "zh",
        url
      },
      ...feeds.filter((feed) => feed.url !== url)
    ].slice(0, MAX_CUSTOM_MEDIA_FEEDS);
    if (feeds.length >= MAX_CUSTOM_MEDIA_FEEDS && !feeds.some((feed) => feed.url === url)) {
      mediaFeedFormError.textContent = t("mediaFeedLimit", { count: MAX_CUSTOM_MEDIA_FEEDS });
      return;
    }
    await saveCustomMediaFeeds(nextFeeds);
    hideMediaFeedForm();
    refreshMediaFeed();
  } catch (error) {
    console.warn("Failed to save custom media feed", error);
    mediaFeedFormError.textContent = t("mediaFeedSaveFailed");
  }
}

function normalizeMediaFeedUrl(value) {
  const text = normalizeText(value);
  if (!text || text.length > MAX_PORTAL_URL_LENGTH) {
    return "";
  }
  const url = safeUrl(text);
  if (!url || !["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    return "";
  }
  return url.href;
}

async function loadMediaFeedSources() {
  const customFeeds = await loadCustomMediaFeeds();
  const seen = new Set();
  const localeSources = MEDIA_FEED_SOURCES.filter((source) => source.language === MEDIA_FEED_LOCALE_LANGUAGE);
  return [...customFeeds, ...localeSources].filter((source) => {
    if (!source.url || seen.has(source.url)) {
      return false;
    }
    seen.add(source.url);
    return true;
  });
}

async function loadCustomMediaFeeds() {
  const result = await chrome.storage.local.get({ [CUSTOM_MEDIA_FEEDS_STORAGE_KEY]: [] });
  return Array.isArray(result[CUSTOM_MEDIA_FEEDS_STORAGE_KEY])
    ? result[CUSTOM_MEDIA_FEEDS_STORAGE_KEY].map(normalizeStoredMediaFeed).filter(Boolean).slice(0, MAX_CUSTOM_MEDIA_FEEDS)
    : [];
}

function normalizeStoredMediaFeed(feed) {
  const url = normalizeMediaFeedUrl(feed?.url);
  if (!url) {
    return null;
  }
  return {
    id: normalizeText(feed?.id) || `custom-${url}`,
    title: normalizeText(feed?.title) || readableHostName(safeUrl(url)?.hostname),
    language: feed?.language === "en" ? "en" : "zh",
    url
  };
}

async function saveCustomMediaFeeds(feeds) {
  await chrome.storage.local.set({ [CUSTOM_MEDIA_FEEDS_STORAGE_KEY]: feeds });
}

async function initMediaFeedFeedback() {
  try {
    const result = await chrome.storage.local.get({ [MEDIA_FEED_FEEDBACK_STORAGE_KEY]: normalizeMediaFeedFeedback() });
    activeMediaFeedFeedback = normalizeMediaFeedFeedback(result[MEDIA_FEED_FEEDBACK_STORAGE_KEY]);
  } catch (error) {
    console.warn("Failed to load media feed feedback", error);
    activeMediaFeedFeedback = normalizeMediaFeedFeedback();
  }
}

async function saveMediaFeedFeedback() {
  await chrome.storage.local.set({
    [MEDIA_FEED_FEEDBACK_STORAGE_KEY]: normalizeMediaFeedFeedback(activeMediaFeedFeedback)
  });
}

function normalizeMediaFeedFeedback(feedback = {}) {
  return {
    version: 1,
    updatedAt: Number(feedback.updatedAt || 0),
    items: normalizeMediaFeedFeedbackBucket(feedback.items),
    topics: normalizeMediaFeedFeedbackBucket(feedback.topics),
    sources: normalizeMediaFeedFeedbackBucket(feedback.sources),
    signatures: normalizeMediaFeedFeedbackBucket(feedback.signatures),
    keywords: normalizeMediaFeedFeedbackBucket(feedback.keywords)
  };
}

function normalizeMediaFeedFeedbackBucket(bucket = {}) {
  return Object.fromEntries(Object.entries(bucket)
    .map(([key, value]) => [normalizeText(key), Math.max(0, Math.min(99, Number(value) || 0))])
    .filter(([key, value]) => key && value > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_MEDIA_FEED_FEEDBACK_KEYS));
}

function incrementMediaFeedFeedback(bucket, key, amount = 1) {
  const normalizedKey = normalizeText(key);
  if (!normalizedKey) {
    return;
  }
  bucket[normalizedKey] = Math.min(99, Number(bucket[normalizedKey] || 0) + amount);
}

async function refreshMediaFeed() {
  mediaFeedRefreshSeed += 1;
  mediaFeedList.replaceChildren();
  mediaFeedList.scrollTop = 0;
  setMediaFeedState("loading", t("mediaFeedLoadingTitle"), t("mediaFeedLoadingBody"));
  refreshMediaFeedButton.disabled = true;
  try {
    latestMediaFeedItems = await fetchMediaFeedItems();
    renderMediaFeedForActiveType();
    mediaFeedUpdated.textContent = "";
    if (!latestMediaFeedItems.length) {
      setMediaFeedState("empty", t("mediaFeedEmptyTitle"), t("mediaFeedEmptyBody"));
    }
  } catch (error) {
    console.warn("Failed to load media feed", error);
    latestMediaFeedItems = [];
    mediaFeedList.replaceChildren();
    mediaFeedUpdated.textContent = "";
    setMediaFeedState("error", t("mediaFeedFailedTitle"), t("mediaFeedFailedBody"));
  } finally {
    refreshMediaFeedButton.disabled = false;
  }
}

async function fetchMediaFeedItems() {
  const sources = await loadMediaFeedSources();
  const [sourceResults, discoveryResults] = await Promise.all([
    Promise.allSettled(sources.map(fetchMediaFeedSource)),
    Promise.allSettled(mediaFeedDiscoverySourcesForLocale().map(fetchMediaFeedDiscoverySource))
  ]);
  const seenUrls = new Set();
  const allResults = [...sourceResults, ...discoveryResults];
  let candidates = allResults
    .flatMap((result) => result.status === "fulfilled" ? result.value : [])
    .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
    .filter((item) => {
      if (seenUrls.has(item.url)) {
        return false;
      }
      seenUrls.add(item.url);
      return true;
    })
    .map(enrichMediaFeedItem)
    .sort(compareAgentMediaFeedItems);
  if (!candidates.length && isFilePreviewMode()) {
    candidates = await fetchMediaFeedPreviewFallback();
  }
  const displayCandidates = candidates.filter((item) => !isMediaFeedItemDismissed(item));
  const filteredItems = displayCandidates.filter(isHighValueMediaFeedItem);
  const items = (filteredItems.length ? filteredItems : displayCandidates).slice(0, MEDIA_FEED_ITEM_LIMIT);
  if (!items.length && allResults.some((result) => result.status === "rejected")) {
    throw new Error("All media feed sources failed or returned no displayable items.");
  }
  return items;
}

function isFilePreviewMode() {
  return location.protocol === "file:";
}

async function fetchMediaFeedPreviewFallback() {
  const sources = (await loadMediaFeedSources()).slice(0, 4);
  const results = await Promise.allSettled(sources.map(fetchMediaFeedReaderSource));
  const seenUrls = new Set();
  return results
    .flatMap((result) => result.status === "fulfilled" ? result.value : [])
    .filter((item) => {
      if (seenUrls.has(item.url)) {
        return false;
      }
      seenUrls.add(item.url);
      return true;
    })
    .map(enrichMediaFeedItem)
    .sort(compareAgentMediaFeedItems)
    .slice(0, MEDIA_FEED_ITEM_LIMIT);
}

async function fetchMediaFeedReaderSource(source) {
  const readerUrl = `https://r.jina.ai/http://r.jina.ai/http://${source.url}`;
  const response = await fetch(readerUrl, { cache: "reload" });
  if (!response.ok) {
    return [];
  }
  const markdown = await response.text();
  return mediaFeedItemsFromReaderMarkdown(markdown, source);
}

function mediaFeedItemsFromReaderMarkdown(markdown, source) {
  const items = [];
  const headingPattern = /^#{2,3}\s+\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  let match;
  while ((match = headingPattern.exec(markdown)) && items.length < MEDIA_FEED_SOURCE_ITEM_LIMIT) {
    const title = cleanFeedText(match[1]);
    const url = normalizeFeedUrl(match[2]);
    if (!title || !url) {
      continue;
    }
    const followingText = markdown.slice(headingPattern.lastIndex, headingPattern.lastIndex + 220);
    const dateMatch = followingText.match(/[A-Z][a-z]{2},\s+\d{1,2}\s+[A-Z][a-z]{2}\s+\d{4}[^\\n]*/);
    items.push({
      id: `${source.id}-${url}`,
      title,
      url,
      language: source.language,
      sourceId: source.id,
      sourceTitle: source.title,
      sourceIcon: fallbackIconDataUrl(source.title),
      sourceIconCandidates: [],
      image: "",
      imageCandidates: [],
      createdAt: dateMatch ? Date.parse(dateMatch[0]) : Date.now() - items.length * 60000,
      summary: ""
    });
  }
  return items;
}

async function fetchMediaFeedSource(source) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MEDIA_FEED_TIMEOUT_MS);
  try {
    const response = await fetch(withMediaFeedRefreshParam(source.url), {
      cache: "reload",
      signal: controller.signal,
      headers: { "Cache-Control": "no-cache" }
    });
    if (!response.ok) {
      throw new Error(`Media feed request failed: ${response.status}`);
    }
    const xmlText = await response.text();
    const documentNode = new DOMParser().parseFromString(xmlText, "application/xml");
    if (documentNode.querySelector("parsererror")) {
      throw new Error("Media feed XML parse failed.");
    }
    const sourceMeta = mediaFeedSourceMeta(documentNode, source);
    return feedDescendants(documentNode)
      .filter((node) => ["item", "entry"].includes(node.localName?.toLowerCase()))
      .map((item) => normalizeMediaFeedItem(item, source, sourceMeta))
      .filter(Boolean)
      .slice(0, MEDIA_FEED_SOURCE_ITEM_LIMIT);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function mediaFeedDiscoverySourcesForLocale() {
  return MEDIA_FEED_DISCOVERY_SOURCES.filter((source) => source.language === MEDIA_FEED_LOCALE_LANGUAGE);
}

async function fetchMediaFeedDiscoverySource(source) {
  if (source.type === "hn") {
    return fetchHackerNewsFeed(source);
  }
  if (source.type === "v2ex") {
    return fetchV2exFeed(source);
  }
  if (source.type === "lobsters") {
    return fetchLobstersFeed(source);
  }
  if (source.type === "arxiv") {
    return fetchArxivFeed(source);
  }
  if (source.type === "devto") {
    return fetchDevtoFeed(source);
  }
  return [];
}

async function fetchJsonWithTimeout(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MEDIA_FEED_TIMEOUT_MS);
  try {
    const response = await fetch(withMediaFeedRefreshParam(url), {
      cache: "reload",
      signal: controller.signal,
      headers: { "Cache-Control": "no-cache" }
    });
    if (!response.ok) {
      throw new Error(`Media discovery request failed: ${response.status}`);
    }
    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function withMediaFeedRefreshParam(url) {
  const parsed = safeUrl(url);
  if (!parsed) {
    return url;
  }
  parsed.searchParams.set("_tabtab_refresh", String(mediaFeedRefreshSeed));
  return parsed.href;
}

async function fetchHackerNewsFeed(source) {
  const ids = await fetchJsonWithTimeout(source.listUrl);
  if (!Array.isArray(ids)) {
    return [];
  }
  const offset = mediaFeedRefreshSeed % 3;
  const selectedIds = ids.slice(offset, offset + MEDIA_FEED_DISCOVERY_ITEM_LIMIT);
  const storyResults = await Promise.allSettled(selectedIds.map((id) => fetchJsonWithTimeout(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)));
  return storyResults
    .flatMap((result) => result.status === "fulfilled" ? [result.value] : [])
    .filter((story) => story?.title && !story.deleted && !story.dead)
    .map((story) => createDiscoveryMediaFeedItem(source, {
      id: story.id,
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      summary: t("mediaFeedMetricHn", { score: Number(story.score || 0), comments: Number(story.descendants || 0) }),
      createdAt: Number(story.time || 0) * 1000,
      metrics: { score: Number(story.score || 0), comments: Number(story.descendants || 0) }
    }))
    .filter(Boolean);
}

async function fetchV2exFeed(source) {
  const items = await fetchJsonWithTimeout(source.url);
  return Array.isArray(items) ? items.slice(0, MEDIA_FEED_DISCOVERY_ITEM_LIMIT).map((item) => createDiscoveryMediaFeedItem(source, {
    id: item.id,
    title: item.title,
    url: item.url,
    summary: `${item.node?.title || "V2EX"} · ${t("mediaFeedMetricReplies", { count: Number(item.replies || 0) })}`,
    createdAt: Number(item.last_touched || item.created || 0) * 1000,
    metrics: { comments: Number(item.replies || 0) }
  })).filter(Boolean) : [];
}

async function fetchLobstersFeed(source) {
  const items = await fetchJsonWithTimeout(source.url);
  return Array.isArray(items) ? items.slice(0, MEDIA_FEED_DISCOVERY_ITEM_LIMIT).map((item) => createDiscoveryMediaFeedItem(source, {
    id: item.short_id,
    title: item.title,
    url: item.url || item.comments_url,
    summary: `${item.tags?.join(", ") || "Lobsters"} · ${t("mediaFeedMetricHn", { score: Number(item.score || 0), comments: Number(item.comment_count || 0) })}`,
    createdAt: Date.parse(item.created_at || ""),
    metrics: { score: Number(item.score || 0), comments: Number(item.comment_count || 0) }
  })).filter(Boolean) : [];
}

async function fetchArxivFeed(source) {
  const query = `https://export.arxiv.org/api/query?search_query=cat:${encodeURIComponent(source.category)}&max_results=${MEDIA_FEED_DISCOVERY_ITEM_LIMIT}&sortBy=submittedDate&sortOrder=descending`;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MEDIA_FEED_TIMEOUT_MS);
  try {
    const response = await fetch(withMediaFeedRefreshParam(query), { cache: "reload", signal: controller.signal });
    if (!response.ok) {
      throw new Error(`arXiv request failed: ${response.status}`);
    }
    const xmlText = await response.text();
    const documentNode = new DOMParser().parseFromString(xmlText, "application/xml");
    return feedDescendants(documentNode)
      .filter((node) => node.localName?.toLowerCase() === "entry")
      .map((entry) => createDiscoveryMediaFeedItem(source, {
        id: feedNodeText(entry, ["id"]),
        title: cleanFeedText(feedNodeText(entry, ["title"])),
        url: normalizeFeedUrl(feedNodeText(entry, ["id"])),
        summary: truncateText(cleanFeedText(feedNodeText(entry, ["summary"])), 140),
        createdAt: Date.parse(feedNodeText(entry, ["published", "updated"]) || ""),
        metrics: { score: 12 }
      }))
      .filter(Boolean);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function fetchDevtoFeed(source) {
  const items = await fetchJsonWithTimeout(`https://dev.to/api/articles?tag=${encodeURIComponent(source.tag)}&per_page=${MEDIA_FEED_DISCOVERY_ITEM_LIMIT}`);
  return Array.isArray(items) ? items.map((item) => createDiscoveryMediaFeedItem(source, {
    id: item.id,
    title: item.title,
    url: item.url,
    summary: `${item.tag_list?.slice(0, 4).join(", ") || "DEV.to"} · ${t("mediaFeedMetricReactions", { reactions: Number(item.public_reactions_count || 0), comments: Number(item.comments_count || 0) })}`,
    createdAt: Date.parse(item.published_at || ""),
    metrics: { score: Number(item.public_reactions_count || 0), comments: Number(item.comments_count || 0) }
  })).filter(Boolean) : [];
}

function createDiscoveryMediaFeedItem(source, data) {
  const url = normalizeFeedUrl(data.url);
  const title = cleanFeedText(data.title);
  if (!url || !title) {
    return null;
  }
  return {
    id: `${source.id}-${data.id || url}`,
    title,
    url,
    language: /[\u4e00-\u9fff]/.test(title) ? "zh" : "en",
    sourceId: source.id,
    sourceTitle: source.sourceTitle,
    sourceIcon: fallbackIconDataUrl(source.sourceTitle),
    sourceIconCandidates: [],
    image: "",
    imageCandidates: [],
    createdAt: Number.isFinite(data.createdAt) ? data.createdAt : 0,
    summary: normalizeText(data.summary),
    discoveryTopic: source.topic,
    discoveryScore: source.score,
    discoveryMetrics: data.metrics || {}
  };
}

function normalizeMediaFeedItem(item, source, sourceMeta) {
  const title = cleanFeedText(feedNodeText(item, ["title"]));
  const url = normalizeFeedUrl(feedNodeText(item, ["link"]) || feedLinkHref(item));
  if (!title || !url) {
    return null;
  }

  const summary = mediaFeedSummary(item);
  const imageCandidates = mediaFeedImages(item);
  const createdAt = Date.parse(feedNodeText(item, ["pubDate", "published", "updated", "date"]) || "");
  const sourceTitle = sourceMeta.title;
  return {
    id: `${source.id}-${url}`,
    title,
    url,
    language: source.language,
    sourceId: source.id,
    sourceTitle,
    sourceIcon: sourceMeta.icon,
    sourceIconCandidates: sourceMeta.iconCandidates,
    image: imageCandidates[0] || "",
    imageCandidates,
    createdAt: Number.isFinite(createdAt) ? createdAt : 0,
    summary
  };
}

function mediaFeedSourceMeta(documentNode, source) {
  const root = feedDescendants(documentNode).find((node) => ["channel", "feed"].includes(node.localName?.toLowerCase())) || documentNode.documentElement;
  const title = cleanFeedText(feedNodeText(root, ["title"])) || normalizeText(source.title) || readableHostName(safeUrl(source.url)?.hostname);
  const siteUrl = normalizeFeedUrl(feedNodeText(root, ["link"]) || feedLinkHref(root)) || safeUrl(source.url)?.origin || source.url;
  const iconCandidates = [
    feedNodeText(root, ["icon"]),
    feedNodeText(root, ["logo"]),
    feedNodeText(root, ["image"]),
    ...mediaFeedImages(root),
    mediaFeedFaviconUrl(siteUrl, title)
  ].map(normalizeFeedUrl).filter(Boolean);
  return {
    title,
    siteUrl,
    icon: iconCandidates[0] || fallbackIconDataUrl(title),
    iconCandidates
  };
}

function mediaFeedFaviconUrl(siteUrl, title) {
  const url = safeUrl(siteUrl);
  if (!url?.origin) {
    return fallbackIconDataUrl(title);
  }
  return faviconUrl(url.origin, 64);
}

function normalizeFeedUrl(value) {
  const text = normalizeText(value).replaceAll("&amp;", "&");
  return isWebUrl(text) ? text : "";
}

function feedNodeText(root, selectors) {
  for (const selector of selectors) {
    const node = feedFirstElement(root, selector);
    if (node) {
      return normalizeText(node.textContent);
    }
  }
  return "";
}

function feedLinkHref(item) {
  const alternateLink = feedChildElements(item, "link")
    .find((link) => !link.getAttribute("rel") || link.getAttribute("rel") === "alternate");
  return normalizeText(alternateLink?.getAttribute("href"));
}

function mediaFeedSummary(item) {
  const body = cleanFeedText(feedNodeText(item, ["description", "summary", "encoded", "content"]));
  if (body) {
    return truncateText(body, 110);
  }
  return "";
}

function mediaFeedImages(item) {
  const candidates = [];
  const directImage = feedNodeText(item, ["image"]);
  if (directImage) {
    candidates.push(directImage);
  }
  feedDescendants(item).forEach((node) => {
    const name = node.localName?.toLowerCase();
    const type = node.getAttribute("type") || "";
    const url = node.getAttribute("url");
    if ((["thumbnail", "content"].includes(name) && url) || (name === "enclosure" && /^image\//i.test(type) && url)) {
      candidates.push(url);
    }
  });
  const html = feedNodeText(item, ["encoded", "content", "description", "summary"]);
  candidates.push(...imagesFromHtml(html));
  return [...new Set(candidates.map(normalizeFeedUrl).filter(Boolean))];
}

function feedFirstElement(root, localName) {
  return feedChildElements(root, localName)[0] || null;
}

function feedChildElements(root, localName) {
  const expected = String(localName || "").toLowerCase();
  return [...root.children].filter((node) => node.localName?.toLowerCase() === expected);
}

function feedDescendants(root) {
  return [...root.getElementsByTagName("*")];
}

function imagesFromHtml(html) {
  if (!html) {
    return [];
  }
  const element = document.createElement("div");
  element.innerHTML = html;
  return [...element.querySelectorAll("img")].flatMap((image) => [
    image.currentSrc,
    image.getAttribute("src"),
    ...srcsetUrls(image.getAttribute("srcset")),
    ...srcsetUrls(image.getAttribute("data-srcset")),
    image.getAttribute("data-src")
  ].filter(Boolean));
}

function srcsetUrls(value) {
  return normalizeText(value)
    .split(",")
    .map((candidate) => normalizeText(candidate).split(/\s+/)[0])
    .filter(Boolean);
}

function cleanFeedText(value) {
  const html = normalizeText(value);
  if (!html) {
    return "";
  }
  const element = document.createElement("div");
  element.innerHTML = html;
  return normalizeText(element.textContent || "");
}

function truncateText(value, maxLength) {
  const text = normalizeText(value);
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function enrichMediaFeedItem(item) {
  const profile = MEDIA_FEED_SOURCE_PROFILES[item.sourceId] || {};
  const topic = detectMediaFeedTopic(item, item.discoveryTopic || profile.topic);
  const createdAt = Number(item.createdAt || 0);
  const hoursAgo = createdAt ? Math.max(0, (Date.now() - createdAt) / 3600000) : 72;
  const freshnessScore = Math.max(0, 18 - Math.min(18, hoursAgo));
  const titleBoost = mediaFeedSignalScore(item.title);
  const summaryBoost = mediaFeedSignalScore(item.summary) * 0.45;
  const metricBoost = mediaFeedMetricScore(item.discoveryMetrics);
  const refreshBoost = mediaFeedRefreshJitter(item.id) * 8;
  const baseScore = (item.discoveryScore || profile.score || 6) + freshnessScore + titleBoost + summaryBoost + metricBoost + refreshBoost;
  const agentSignature = mediaFeedSignature(`${item.title} ${item.summary}`);
  const feedbackPenalty = mediaFeedFeedbackPenalty({ ...item, agentTopic: topic.id, agentSignature });
  return {
    ...item,
    agentTopic: topic.id,
    agentTopicLabelKey: topic.labelKey,
    agentReasonKey: topic.reasonKey,
    agentBaseScore: Math.round(baseScore),
    agentFeedbackPenalty: feedbackPenalty,
    agentScore: Math.round(baseScore - feedbackPenalty),
    agentSignature
  };
}

function mediaFeedFeedbackPenalty(item) {
  const feedback = activeMediaFeedFeedback || normalizeMediaFeedFeedback();
  const sourceKey = mediaFeedFeedbackSourceKey(item);
  const keywordPenalty = mediaFeedFeedbackKeywords(item)
    .reduce((total, keyword) => total + Math.min(4, Number(feedback.keywords[keyword] || 0) * 1.4), 0);
  return Math.min(34,
    (Number(feedback.topics[item.agentTopic] || 0) * 5) +
    (Number(feedback.sources[sourceKey] || 0) * 7) +
    (Number(feedback.signatures[item.agentSignature] || 0) * 16) +
    Math.min(12, keywordPenalty)
  );
}

function isMediaFeedItemDismissed(item) {
  const feedback = activeMediaFeedFeedback || normalizeMediaFeedFeedback();
  return Boolean(feedback.items[item.id] || feedback.signatures[item.agentSignature]);
}

function mediaFeedFeedbackSourceKey(item) {
  return normalizeText(item.sourceId || item.sourceTitle).toLowerCase();
}

function mediaFeedFeedbackKeywords(item) {
  return normalizeText(`${item.title} ${item.summary}`)
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !["the", "and", "for", "with", "from", "this", "that"].includes(token))
    .slice(0, 8);
}

function detectMediaFeedTopic(item, fallbackTopic = "product") {
  const text = `${item.title} ${item.summary} ${item.sourceTitle}`.toLowerCase();
  let bestRule = MEDIA_FEED_TOPIC_RULES.find((rule) => rule.id === fallbackTopic) || MEDIA_FEED_TOPIC_RULES[0];
  let bestScore = 0;
  MEDIA_FEED_TOPIC_RULES.forEach((rule) => {
    const score = rule.keywords.reduce((total, keyword) => total + (text.includes(keyword.toLowerCase()) ? 1 : 0), 0);
    if (score > bestScore) {
      bestRule = rule;
      bestScore = score;
    }
  });
  return bestRule;
}

function mediaFeedSignalScore(value) {
  const text = normalizeText(value).toLowerCase();
  const signalWords = ["release", "launch", "open source", "research", "security", "funding", "ipo", "breakthrough", "agent", "api", "architecture", "benchmark", "postmortem", "deep dive", "发布", "开源", "研究", "漏洞", "融资", "上市", "突破", "模型", "智能体", "架构", "基准", "复盘", "深度"];
  return signalWords.reduce((total, word) => total + (text.includes(word) ? 2 : 0), 0);
}

function isHighValueMediaFeedItem(item) {
  const text = `${item.title} ${item.summary}`.trim();
  if (!text || LOW_VALUE_MEDIA_FEED_PATTERNS.some((pattern) => pattern.test(text))) {
    return false;
  }
  if (item.discoveryMetrics?.score || item.discoveryMetrics?.comments) {
    return true;
  }
  if (item.agentScore >= 18) {
    return true;
  }
  return mediaFeedSignalScore(text) >= 2;
}

function mediaFeedMetricScore(metrics = {}) {
  const score = Math.min(10, Math.log10(Math.max(1, Number(metrics.score || 0))) * 3);
  const comments = Math.min(8, Math.log10(Math.max(1, Number(metrics.comments || 0))) * 2.5);
  return score + comments;
}

function mediaFeedRefreshJitter(value) {
  const text = `${mediaFeedRefreshSeed}:${value}`;
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function mediaFeedSignature(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !["the", "and", "for", "with", "from", "this", "that"].includes(token))
    .slice(0, 8)
    .sort()
    .join("-");
}

function compareAgentMediaFeedItems(a, b) {
  if (b.agentScore !== a.agentScore) {
    return b.agentScore - a.agentScore;
  }
  return Number(b.createdAt || 0) - Number(a.createdAt || 0);
}

function organizeAgentMediaFeed(items) {
  const focusItems = selectDiverseMediaFeedItems(items, 5);
  const focusIds = new Set(focusItems.map((item) => item.id));
  const topicGroups = new Map();
  items
    .filter((item) => !focusIds.has(item.id))
    .sort(compareAgentMediaFeedItems)
    .forEach((item) => {
      const group = topicGroups.get(item.agentTopic) || [];
      group.push(item);
      topicGroups.set(item.agentTopic, group);
    });
  const ordered = focusItems.map((item) => ({ ...item, agentSection: "focus" }));
  [...topicGroups.entries()]
    .sort(([, aItems], [, bItems]) => (bItems[0]?.agentScore || 0) - (aItems[0]?.agentScore || 0))
    .forEach(([topic, groupItems]) => {
      selectDiverseMediaFeedItems(groupItems, groupItems.length).forEach((item) => {
        ordered.push({ ...item, agentSection: topic });
      });
    });
  return ordered;
}

function selectDiverseMediaFeedItems(items, limit) {
  const selected = [];
  const sourceCounts = new Map();
  const topicCounts = new Map();
  const signatureSeen = new Set();
  const candidates = [...items].sort(compareAgentMediaFeedItems);

  while (candidates.length && selected.length < limit) {
    let bestIndex = -1;
    let bestScore = -Infinity;
    candidates.forEach((item, index) => {
      const sourcePenalty = (sourceCounts.get(item.sourceTitle) || 0) * 7;
      const topicPenalty = (topicCounts.get(item.agentTopic) || 0) * 3;
      const duplicatePenalty = item.agentSignature && signatureSeen.has(item.agentSignature) ? 20 : 0;
      const score = item.agentScore - sourcePenalty - topicPenalty - duplicatePenalty;
      if (score > bestScore) {
        bestIndex = index;
        bestScore = score;
      }
    });
    if (bestIndex < 0) {
      break;
    }
    const [item] = candidates.splice(bestIndex, 1);
    selected.push(item);
    sourceCounts.set(item.sourceTitle, (sourceCounts.get(item.sourceTitle) || 0) + 1);
    topicCounts.set(item.agentTopic, (topicCounts.get(item.agentTopic) || 0) + 1);
    if (item.agentSignature) {
      signatureSeen.add(item.agentSignature);
    }
  }
  return selected;
}

function mediaFeedSectionTitle(section, item) {
  if (section === "focus") {
    return t("mediaFeedAgentFocus");
  }
  return item?.agentTopicLabelKey ? t(item.agentTopicLabelKey) : t("mediaFeedAgentStream");
}

function renderMediaFeedForActiveType() {
  const items = activeMediaFeedType === "all"
    ? latestMediaFeedItems
    : latestMediaFeedItems.filter((item) => item.agentTopic === activeMediaFeedType);
  visibleMediaFeedItems = organizeAgentMediaFeed(items);
  mediaFeedVisibleCount = Math.min(MEDIA_FEED_INITIAL_ITEMS, visibleMediaFeedItems.length);
  renderMediaFeed();
  if (items.length) {
    mediaFeedState.hidden = true;
    return;
  }
  setMediaFeedState("empty", t("mediaFeedEmptyTitle"), t("mediaFeedEmptyBody"));
}

function renderMediaFeed() {
  mediaFeedObserver?.disconnect();
  const items = visibleMediaFeedItems.slice(0, mediaFeedVisibleCount);
  const hasMore = mediaFeedVisibleCount < visibleMediaFeedItems.length;
  const fragment = document.createDocumentFragment();
  let currentSection = "";
  items.forEach((item, index) => {
    if (item.agentSection !== currentSection) {
      currentSection = item.agentSection;
      fragment.appendChild(createMediaFeedSectionHeader(mediaFeedSectionTitle(currentSection, item)));
    }
    fragment.appendChild(createMediaFeedItem(item, index));
  });
  if (hasMore) {
    mediaFeedLoadMoreSentinel.textContent = t("mediaFeedAutoLoad");
    fragment.appendChild(mediaFeedLoadMoreSentinel);
  } else {
    mediaFeedLoadMoreSentinel.remove();
  }
  mediaFeedList.replaceChildren(fragment);
  if (hasMore) {
    observeMediaFeedLoadMore();
    loadMoreMediaFeedIfNeeded();
  }
}

function observeMediaFeedLoadMore() {
  if (!("IntersectionObserver" in window)) {
    return;
  }
  mediaFeedObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadMoreMediaFeedPage();
    }
  }, {
    root: mediaFeedList,
    rootMargin: "180px 0px",
    threshold: 0.01
  });
  mediaFeedObserver.observe(mediaFeedLoadMoreSentinel);
}

function loadMoreMediaFeedIfNeeded() {
  const distanceToEnd = mediaFeedList.scrollHeight - mediaFeedList.scrollTop - mediaFeedList.clientHeight;
  if (distanceToEnd <= 180) {
    loadMoreMediaFeedPage();
  }
}

function loadMoreMediaFeedPage() {
  if (mediaFeedVisibleCount >= visibleMediaFeedItems.length) {
    return;
  }
  mediaFeedVisibleCount = Math.min(mediaFeedVisibleCount + MEDIA_FEED_PAGE_SIZE, visibleMediaFeedItems.length);
  renderMediaFeed();
}

function createMediaFeedSectionHeader(title) {
  const header = document.createElement("div");
  header.className = "media-feed-section";
  header.textContent = title;
  return header;
}

function createMediaFeedItem(item, index = 0) {
  const featured = index % MEDIA_FEED_LARGE_CARD_INTERVAL === MEDIA_FEED_LARGE_CARD_INTERVAL - 1;
  const imageCandidates = Array.isArray(item.imageCandidates) ? item.imageCandidates.filter(Boolean) : [];
  const hasContentImage = Boolean(item.image || imageCandidates.length);
  const article = document.createElement("article");
  article.className = "media-feed-item";
  article.classList.toggle("featured", featured);
  article.classList.toggle("no-image", !hasContentImage);

  const link = document.createElement("a");
  link.className = "media-feed-link";
  link.href = item.url;
  link.setAttribute("aria-label", t("openPage", { title: item.title }));

  const meta = document.createElement("div");
  meta.className = "media-feed-item-meta";

  const sourceIcon = document.createElement("img");
  sourceIcon.className = "media-feed-source-icon";
  sourceIcon.alt = "";
  sourceIcon.loading = "lazy";
  sourceIcon.decoding = "async";
  sourceIcon.dataset.candidateIndex = "0";
  sourceIcon.src = item.sourceIcon || fallbackIconDataUrl(item.sourceTitle);
  sourceIcon.addEventListener("error", () => {
    const candidates = Array.isArray(item.sourceIconCandidates) ? item.sourceIconCandidates : [];
    const nextIndex = Number(sourceIcon.dataset.candidateIndex || 0) + 1;
    if (candidates[nextIndex]) {
      sourceIcon.dataset.candidateIndex = String(nextIndex);
      sourceIcon.src = candidates[nextIndex];
      return;
    }
    sourceIcon.src = fallbackIconDataUrl(item.sourceTitle);
  });

  const sourceName = document.createElement("span");
  sourceName.className = "media-feed-source-name";
  sourceName.textContent = item.sourceTitle;
  meta.append(sourceIcon, sourceName);

  if (item.createdAt) {
    const time = document.createElement("time");
    time.dateTime = new Date(item.createdAt).toISOString();
    time.textContent = mediaFeedRelativeTime(item.createdAt);
    meta.append(time);
  }

  const moreButton = document.createElement("button");
  moreButton.className = "media-feed-more";
  moreButton.type = "button";
  moreButton.title = t("mediaFeedMore");
  moreButton.setAttribute("aria-haspopup", "menu");
  moreButton.setAttribute("aria-expanded", "false");
  moreButton.setAttribute("aria-label", t("mediaFeedMore"));
  moreButton.innerHTML = moreHorizontalIcon();
  moreButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMediaFeedActionMenu(article, moreButton, item);
  });

  const title = document.createElement("h3");
  title.className = "media-feed-title";
  title.textContent = item.title;

  const agentMeta = document.createElement("span");
  agentMeta.className = "media-feed-agent-meta";
  const topicBadge = document.createElement("span");
  topicBadge.className = "media-feed-topic";
  topicBadge.textContent = item.agentTopicLabelKey ? t(item.agentTopicLabelKey) : t("mediaFeedAgentStream");
  const reason = document.createElement("span");
  reason.className = "media-feed-reason";
  reason.textContent = item.agentReasonKey ? t(item.agentReasonKey) : t("mediaFeedReasonDefault");
  agentMeta.append(topicBadge, reason);

  const summary = document.createElement("p");
  summary.className = "media-feed-summary";
  summary.textContent = item.summary;

  const copy = document.createElement("span");
  copy.className = "media-feed-copy";
  copy.append(meta, title, agentMeta);
  if (item.summary) {
    copy.append(summary);
  }

  if (hasContentImage) {
    const image = document.createElement("img");
    image.className = "media-feed-image";
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.dataset.candidateIndex = "0";
    image.addEventListener("error", () => {
      const nextIndex = Number(image.dataset.candidateIndex || 0) + 1;
      if (imageCandidates[nextIndex]) {
        image.dataset.candidateIndex = String(nextIndex);
        image.src = imageCandidates[nextIndex];
        return;
      }
      image.remove();
      article.classList.add("no-image");
    });
    image.src = item.image || imageCandidates[0];
    if (featured) {
      link.append(image, copy);
    } else {
      link.append(copy, image);
    }
  } else {
    link.append(copy);
  }
  article.append(link, moreButton);
  return article;
}

function toggleMediaFeedActionMenu(article, button, item) {
  if (activeMediaFeedActionMenu?.button === button) {
    closeMediaFeedActionMenu();
    return;
  }
  closeMediaFeedActionMenu();

  const menu = document.createElement("div");
  menu.className = "media-feed-action-menu";
  menu.setAttribute("role", "menu");

  const notInterestedButton = document.createElement("button");
  notInterestedButton.type = "button";
  notInterestedButton.className = "media-feed-action";
  notInterestedButton.setAttribute("role", "menuitem");
  notInterestedButton.textContent = t("mediaFeedNotInterested");
  notInterestedButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await markMediaFeedNotInterested(item);
  });

  menu.append(notInterestedButton);
  article.append(menu);
  button.setAttribute("aria-expanded", "true");
  activeMediaFeedActionMenu = { element: menu, button };
}

function closeMediaFeedActionMenu() {
  if (!activeMediaFeedActionMenu) {
    return;
  }
  activeMediaFeedActionMenu.button?.setAttribute("aria-expanded", "false");
  activeMediaFeedActionMenu.element?.remove();
  activeMediaFeedActionMenu = null;
}

function handleDocumentClickForMediaFeedMenu(event) {
  if (!activeMediaFeedActionMenu) {
    return;
  }
  if (activeMediaFeedActionMenu.element.contains(event.target) || activeMediaFeedActionMenu.button.contains(event.target)) {
    return;
  }
  closeMediaFeedActionMenu();
}

async function markMediaFeedNotInterested(item) {
  closeMediaFeedActionMenu();
  const nextFeedback = normalizeMediaFeedFeedback(activeMediaFeedFeedback);
  incrementMediaFeedFeedback(nextFeedback.items, item.id, 1);
  incrementMediaFeedFeedback(nextFeedback.topics, item.agentTopic, 1);
  incrementMediaFeedFeedback(nextFeedback.sources, mediaFeedFeedbackSourceKey(item), 1);
  incrementMediaFeedFeedback(nextFeedback.signatures, item.agentSignature, 1);
  mediaFeedFeedbackKeywords(item).forEach((keyword) => incrementMediaFeedFeedback(nextFeedback.keywords, keyword, 1));
  nextFeedback.updatedAt = Date.now();
  activeMediaFeedFeedback = normalizeMediaFeedFeedback(nextFeedback);

  try {
    await saveMediaFeedFeedback();
  } catch (error) {
    console.warn("Failed to save media feed feedback", error);
  }

  latestMediaFeedItems = latestMediaFeedItems
    .map(enrichMediaFeedItem)
    .filter((feedItem) => !isMediaFeedItemDismissed(feedItem))
    .sort(compareAgentMediaFeedItems);
  renderMediaFeedForActiveType();
  mediaFeedUpdated.textContent = t("mediaFeedNotInterestedDone");
}

function mediaFeedRelativeTime(timestamp) {
  const minutesAgo = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (minutesAgo < 1) {
    return t("historyJustNow");
  }
  if (minutesAgo < 60) {
    return t("historyMinutesAgo", { count: minutesAgo });
  }
  if (minutesAgo < 24 * 60) {
    return t("historyHoursAgo", { count: Math.floor(minutesAgo / 60) });
  }
  return new Intl.DateTimeFormat(LOCALE, { month: "short", day: "numeric" }).format(new Date(timestamp));
}

function setMediaFeedState(state, title, body) {
  mediaFeedState.dataset.state = state;
  mediaFeedState.hidden = false;
  mediaFeedState.querySelector("strong").textContent = title;
  mediaFeedState.querySelector("span:last-child").textContent = body;
}

async function refreshHistory() {
  try {
    const recentStartTime = Date.now() - RECENT_HISTORY_LOOKBACK_MS;
    const [items, pinnedItems] = await Promise.all([
      chrome.history.search({
        text: "",
        startTime: recentStartTime,
        maxResults: 80
      }),
      loadPinnedHistory()
    ]);
    const pinnedKeys = new Set(pinnedItems.map((item) => normalizeHistoryKey(item.url)));
    const recentItems = (await repeatDomainHistoryItems(items, recentStartTime))
      .filter((item) => !pinnedKeys.has(normalizeHistoryKey(item.url)));
    renderPinnedHistory(pinnedItems);
    renderHistory(groupHistoryBySite(recentItems));
  } catch (error) {
    pinnedGrid.innerHTML = "";
    historyGrid.innerHTML = emptyState(t("historyReadFailed"));
  }
}

function dedupeHistory(items) {
  const seen = new Set();
  const filtered = [];

  for (const item of items) {
    const url = safeUrl(item.url);
    const key = normalizeHistoryKey(item.url);
    if (!isDisplayableHistoryUrl(url) || !key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    filtered.push(item);
  }

  return filtered;
}

async function repeatDomainHistoryItems(items, startTime) {
  const displayableItems = dedupeHistory(items);
  const domainVisitCounts = new Map();

  await Promise.all(displayableItems.map(async (item) => {
    const siteKey = siteGroupKey(safeUrl(item.url));
    if (!siteKey) {
      return;
    }
    const visits = await historyVisitsSince(item.url, startTime);
    domainVisitCounts.set(siteKey, (domainVisitCounts.get(siteKey) || 0) + visits);
  }));

  return displayableItems.filter((item) => {
    const siteKey = siteGroupKey(safeUrl(item.url));
    return siteKey && (domainVisitCounts.get(siteKey) || 0) >= MIN_RECENT_DOMAIN_VISITS;
  });
}

async function historyVisitsSince(url, startTime) {
  if (!chrome.history?.getVisits) {
    return 1;
  }

  try {
    const visits = await chrome.history.getVisits({ url });
    const recentVisits = visits.filter((visit) => Number(visit.visitTime || 0) >= startTime);
    return recentVisits.length || 1;
  } catch {
    return 1;
  }
}

function renderPinnedHistory(items) {
  if (!items.length) {
    pinnedGrid.innerHTML = emptyState(t("noPinnedItems"));
    return;
  }

  const fragment = document.createDocumentFragment();
  const groups = groupHistoryBySite(items, {
    maxGroups: MAX_PINNED_HISTORY_ITEMS,
    maxPagesPerSite: MAX_PINNED_HISTORY_ITEMS
  });

  groups.forEach((group) => {
    fragment.appendChild(createHistorySiteGroup(group, { pinned: true }));
  });
  pinnedGrid.replaceChildren(fragment);
}

function renderHistory(groups) {
  if (!groups.length) {
    historyGrid.innerHTML = emptyState(t("noHistoryItems"));
    return;
  }

  const fragment = document.createDocumentFragment();
  groups.forEach((group) => {
    fragment.appendChild(createHistoryFeedGroup(group));
  });

  historyGrid.replaceChildren(fragment);
}

function groupHistoryBySite(items, options = {}) {
  const maxGroups = options.maxGroups || MAX_HISTORY_SITE_GROUPS;
  const maxPagesPerSite = options.maxPagesPerSite || MAX_HISTORY_PAGES_PER_SITE;
  const groups = new Map();

  for (const item of items) {
    const url = safeUrl(item.url);
    const key = siteGroupKey(url);
    if (!key) {
      continue;
    }
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: siteDisplayName(url, item.title),
        url: item.url,
        homeUrl: siteHomeUrl(key, item.url),
        pages: [],
        pageKeys: new Set(),
        deleteUrls: [],
        deleteUrlKeys: new Set()
      });
    }
    const group = groups.get(key);
    const deleteUrl = normalizeHistoryDeleteUrl(item.url);
    const deleteKey = deleteUrl;
    if (deleteKey && !group.deleteUrlKeys.has(deleteKey)) {
      group.deleteUrlKeys.add(deleteKey);
      group.deleteUrls.push(deleteUrl);
    }
    const pageKey = historyPageKey(item, url, key);
    if (!group.pageKeys.has(pageKey) && group.pages.length < maxPagesPerSite) {
      group.pageKeys.add(pageKey);
      group.pages.push(item);
    }
  }

  return [...groups.values()]
    .map(({ pageKeys, deleteUrlKeys, ...group }) => group)
    .slice(0, maxGroups);
}

function createHistorySiteGroup(group, options = {}) {
  const card = document.createElement("section");
  const header = document.createElement("div");
  const isPinned = Boolean(options.pinned);
  const homeLink = document.createElement(isPinned ? "span" : "a");
  const icon = document.createElement("img");
  const name = document.createElement("strong");
  const count = document.createElement("span");
  const list = document.createElement("div");
  const singlePinnedPage = isPinned && group.pages.length === 1 ? group.pages[0] : null;
  const singlePinnedTitle = singlePinnedPage
    ? (normalizeText(singlePinnedPage.title) || historyFallbackTitle(safeUrl(singlePinnedPage.url)))
    : "";
  const isSinglePinnedDuplicate = isPinned
    && group.pages.length === 1
    && singlePinnedTitle === normalizeText(group.name);
  const homeHref = isSinglePinnedDuplicate
    ? singlePinnedPage.url
    : (group.homeUrl || siteHomeUrl(group.key, group.url));
  const homeLabel = isSinglePinnedDuplicate
    ? t("openPage", { title: singlePinnedTitle })
    : t("openSiteHome", { name: group.name });

  card.className = "history-site-group";
  card.classList.toggle("pinned", isPinned);
  card.classList.toggle("single-page-duplicate", isSinglePinnedDuplicate);
  header.className = "history-site-header";
  homeLink.className = "history-site-home";
  if (!isPinned) {
    homeLink.href = homeHref;
    homeLink.title = homeLabel;
    homeLink.setAttribute("aria-label", homeLabel);
  }
  icon.className = "history-site-logo";
  applyHistoryIcon(icon, {
    title: group.name,
    url: group.homeUrl || group.url
  });
  icon.alt = "";
  name.className = "history-site-name";
  name.textContent = group.name;
  count.className = "history-site-count";
  count.textContent = String(group.pages.length);
  count.title = t("pageCount", { count: group.pages.length });
  list.className = "history-page-list";

  group.pages.forEach((item) => {
    list.appendChild(createHistoryPageItem(item, options));
  });

  homeLink.append(icon, name);
  header.append(homeLink, count);
  card.append(header, list);
  return card;
}

function createHistoryPageItem(item, options = {}) {
  const url = safeUrl(item.url);
  const title = normalizeText(item.title) || historyFallbackTitle(url);
  const row = document.createElement("div");
  const time = document.createElement("time");
  const timelineCard = document.createElement("span");
  const isPinned = Boolean(options.pinned);
  const showTimeline = Boolean(options.timeline);
  const link = document.createElement("a");
  const label = document.createElement("span");
  const actions = document.createElement("span");
  const pinButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  row.className = "history-page-item";
  row.classList.toggle("timeline", showTimeline);
  if (showTimeline) {
    time.className = "history-page-time";
    time.dateTime = historyDateTimeAttribute(item.lastVisitTime);
    time.textContent = formatHistoryAnchorTime(item.lastVisitTime);
    time.title = formatHistoryFullTime(item.lastVisitTime);
  }
  link.className = "history-page-link";
  link.href = item.url;
  link.title = title;
  link.setAttribute("aria-label", t("openPage", { title }));
  link.textContent = title;
  if (options.label) {
    label.className = "history-page-label";
    label.textContent = options.label;
    link.prepend(label);
  }
  pinButton.className = "history-page-pin";
  pinButton.classList.toggle("active", isPinned);
  pinButton.type = "button";
  pinButton.innerHTML = historyPinIcon(isPinned);
  pinButton.title = isPinned ? t("unpin") : t("pin");
  pinButton.setAttribute("aria-label", `${isPinned ? t("unpin") : t("pin")} ${title}`);
  pinButton.addEventListener("click", () => {
    if (isPinned) {
      unpinHistoryItem(item.url);
      return;
    }
    pinHistoryItem(item);
  });

  deleteButton.className = "history-page-delete";
  deleteButton.type = "button";
  deleteButton.innerHTML = trashIcon();
  deleteButton.title = t("deleteHistory", { title });
  deleteButton.setAttribute("aria-label", t("deleteHistory", { title }));
  deleteButton.addEventListener("click", () => deleteHistoryItem(item.url));

  actions.className = "history-page-actions";
  actions.append(pinButton, deleteButton);
  if (showTimeline) {
    timelineCard.className = "history-page-card";
    timelineCard.append(link, actions);
    row.append(time, timelineCard);
  } else {
    row.append(link, actions);
  }
  return row;
}

function createHistoryFeedGroup(group) {
  const item = group.pages[0];
  const title = normalizeText(item?.title) || historyFallbackTitle(safeUrl(group.url));
  const row = document.createElement("article");
  const homeLink = document.createElement("a");
  const icon = document.createElement("img");
  const copy = document.createElement("span");
  const name = document.createElement("strong");
  const pageLink = document.createElement("a");
  const meta = document.createElement("span");
  const summary = document.createElement("div");
  const actions = document.createElement("span");
  const expandButton = document.createElement("button");
  const pinButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const pageList = document.createElement("div");
  const pageListInner = document.createElement("div");
  const relatedPages = group.pages.slice(1);
  const isExpandable = relatedPages.length > 0;

  row.className = "history-feed-item";
  row.classList.toggle("expandable", isExpandable);
  row.addEventListener("click", (event) => {
    const target = event.target;
    if (!isExpandable || (target instanceof Element && target.closest("a, button"))) {
      return;
    }
    toggleHistoryFeedGroup(row);
  });
  homeLink.className = "history-feed-home";
  homeLink.href = group.homeUrl || siteHomeUrl(group.key, group.url);
  homeLink.title = t("openSiteHome", { name: group.name });
  homeLink.setAttribute("aria-label", t("openSiteHome", { name: group.name }));
  icon.className = "history-site-logo";
  applyHistoryIcon(icon, {
    title: group.name,
    url: group.homeUrl || group.url
  });
  icon.alt = "";
  homeLink.appendChild(icon);

  copy.className = "history-feed-copy";
  name.className = "history-site-name";
  name.textContent = group.name;
  pageLink.className = "history-page-link history-feed-page-link";
  pageLink.href = item?.url || group.url;
  pageLink.title = title;
  pageLink.setAttribute("aria-label", t("openPage", { title }));
  pageLink.textContent = group.name;
  meta.className = "history-feed-meta";
  meta.textContent = [
    group.pages.length > 1
      ? t("historySitePageMeta", { count: group.pages.length })
      : compactHistoryUrl(safeUrl(item?.url || group.url)),
    formatHistoryTime(item?.lastVisitTime)
  ].filter(Boolean).join(" · ");
  copy.append(isExpandable ? name : pageLink, meta);

  expandButton.className = "history-feed-expand";
  expandButton.type = "button";
  expandButton.innerHTML = chevronDownIcon();
  expandButton.title = t("historyExpandPages", { count: relatedPages.length });
  expandButton.setAttribute("aria-label", t("historyExpandPages", { count: relatedPages.length }));
  expandButton.setAttribute("aria-expanded", "false");
  expandButton.setAttribute("aria-hidden", String(!isExpandable));
  expandButton.tabIndex = isExpandable ? 0 : -1;
  expandButton.disabled = !isExpandable;
  expandButton.addEventListener("click", () => toggleHistoryFeedGroup(row));

  pinButton.className = "history-page-pin";
  pinButton.type = "button";
  pinButton.innerHTML = historyPinIcon(false);
  pinButton.title = t("pin");
  pinButton.setAttribute("aria-label", `${t("pin")} ${title}`);
  pinButton.addEventListener("click", () => pinHistoryItem(item || {
    title,
    url: group.url
  }));

  deleteButton.className = "history-page-delete";
  deleteButton.type = "button";
  deleteButton.innerHTML = trashIcon();
  deleteButton.title = t("deleteHistory", { title: group.name });
  deleteButton.setAttribute("aria-label", t("deleteHistory", { title: group.name }));
  deleteButton.addEventListener("click", () => deleteHistoryGroup(group));

  pageList.className = "history-feed-pages";
  pageList.id = `history-feed-pages-${group.key.replace(/[^a-z0-9_-]+/gi, "-")}`;
  pageList.dataset.relatedCount = String(relatedPages.length);
  pageList.setAttribute("aria-hidden", "true");
  pageList.inert = true;
  pageListInner.className = "history-feed-pages-inner";
  pageList.appendChild(pageListInner);
  if (isExpandable) {
    const listTitle = document.createElement("span");
    listTitle.className = "history-feed-pages-title";
    listTitle.textContent = t("historyRelatedPages");
    pageListInner.appendChild(listTitle);
    pageListInner.appendChild(createHistoryPageItem(item, {
      label: t("historyPrimaryPage"),
      timeline: true
    }));
    relatedPages.forEach((relatedItem) => {
      pageListInner.appendChild(createHistoryPageItem(relatedItem, { timeline: true }));
    });
  }

  actions.className = "history-feed-actions";
  actions.appendChild(expandButton);
  if (isExpandable) {
    expandButton.setAttribute("aria-controls", pageList.id);
    requestAnimationFrame(() => {
      pageList.style.setProperty("--history-feed-pages-height", `${pageListInner.scrollHeight}px`);
    });
  }
  actions.append(pinButton, deleteButton);
  summary.className = "history-feed-summary";
  summary.append(homeLink, copy, actions);
  row.append(summary, pageList);
  return row;
}

function toggleHistoryFeedGroup(row) {
  const isExpanded = row.classList.toggle("expanded");
  const button = row.querySelector(".history-feed-expand");
  const pageList = row.querySelector(".history-feed-pages");
  if (button) {
    const count = Number(pageList?.dataset.relatedCount || 0);
    button.setAttribute("aria-expanded", String(isExpanded));
    button.title = isExpanded ? t("historyCollapsePages") : t("historyExpandPages", { count });
    button.setAttribute("aria-label", isExpanded ? t("historyCollapsePages") : t("historyExpandPages", { count }));
  }
  if (pageList) {
    pageList.setAttribute("aria-hidden", String(!isExpanded));
    pageList.inert = !isExpanded;
  }
}

function formatHistoryTime(timestamp) {
  const time = Number(timestamp);
  if (!Number.isFinite(time) || time <= 0) {
    return "";
  }
  const visitDate = new Date(time);
  const now = Date.now();
  const minutesAgo = Math.max(0, Math.round((now - time) / 60000));
  if (minutesAgo < 1) {
    return t("historyJustNow");
  }
  if (minutesAgo < 60) {
    return t("historyMinutesAgo", { count: minutesAgo });
  }
  if (minutesAgo < 60 * 24) {
    return t("historyHoursAgo", { count: Math.floor(minutesAgo / 60) });
  }
  return new Intl.DateTimeFormat(LOCALE, {
    month: "numeric",
    day: "numeric"
  }).format(visitDate);
}

function formatHistoryAnchorTime(timestamp) {
  const time = Number(timestamp);
  if (!Number.isFinite(time) || time <= 0) {
    return "--:--";
  }
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(time));
}

function formatHistoryFullTime(timestamp) {
  const time = Number(timestamp);
  if (!Number.isFinite(time) || time <= 0) {
    return "";
  }
  return new Intl.DateTimeFormat(LOCALE, {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(time));
}

function historyDateTimeAttribute(timestamp) {
  const time = Number(timestamp);
  if (!Number.isFinite(time) || time <= 0) {
    return "";
  }
  return new Date(time).toISOString();
}

async function loadPinnedHistory() {
  try {
    const result = await chrome.storage.local.get({ [PINNED_HISTORY_STORAGE_KEY]: [] });
    const parsed = result[PINNED_HISTORY_STORAGE_KEY];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((item) => item?.url && isDisplayableHistoryUrl(safeUrl(item.url)))
      .sort((a, b) => Number(b.pinnedAt || 0) - Number(a.pinnedAt || 0))
      .slice(0, MAX_PINNED_HISTORY_ITEMS);
  } catch (error) {
    console.warn("Failed to load pinned history", error);
    return [];
  }
}

async function savePinnedHistory(items) {
  await chrome.storage.local.set({ [PINNED_HISTORY_STORAGE_KEY]: items.slice(0, MAX_PINNED_HISTORY_ITEMS) });
}

async function pinHistoryItem(item) {
  try {
    if (!isDisplayableHistoryUrl(safeUrl(item?.url))) {
      return;
    }
    const key = normalizeHistoryKey(item.url);
    if (!key) {
      return;
    }
    const pinnedItems = await loadPinnedHistory();
    const nextItems = [
      {
        url: item.url,
        title: normalizeText(item.title),
        pinnedAt: Date.now()
      },
      ...pinnedItems.filter((pinnedItem) => normalizeHistoryKey(pinnedItem.url) !== key)
    ];
    await savePinnedHistory(nextItems);
    refreshHistory();
  } catch (error) {
    console.warn("Failed to pin history item", error);
  }
}

async function unpinHistoryItem(url) {
  try {
    const key = normalizeHistoryKey(url);
    const nextItems = (await loadPinnedHistory()).filter((item) => normalizeHistoryKey(item.url) !== key);
    await savePinnedHistory(nextItems);
    refreshHistory();
  } catch (error) {
    console.warn("Failed to unpin history item", error);
  }
}

async function deleteHistoryItem(url) {
  const deleteUrl = normalizeHistoryDeleteUrl(url);
  if (!deleteUrl) {
    return;
  }
  await deleteHistoryUrls([deleteUrl]);
}

async function deleteHistoryGroup(group) {
  const urls = Array.isArray(group.deleteUrls) && group.deleteUrls.length
    ? group.deleteUrls
    : group.pages.map((item) => normalizeHistoryDeleteUrl(item.url)).filter(Boolean);
  await deleteHistoryUrls(urls, group.key);
}

async function deleteHistoryUrls(urls, siteKey = "") {
  const uniqueUrls = [...new Set(urls.map(normalizeHistoryDeleteUrl).filter(Boolean))];
  if (!uniqueUrls.length) {
    return;
  }
  try {
    await Promise.all(uniqueUrls.map((url) => chrome.history.deleteUrl({ url })));
    const deletedKeys = new Set(uniqueUrls.map(normalizeHistoryKey).filter(Boolean));
    const nextPinnedItems = (await loadPinnedHistory()).filter((item) => {
      if (deletedKeys.has(normalizeHistoryKey(item.url))) {
        return false;
      }
      return !siteKey || siteGroupKey(safeUrl(item.url)) !== siteKey;
    });
    await savePinnedHistory(nextPinnedItems);
    refreshHistory();
  } catch (error) {
    console.warn("Failed to delete history item", error);
    renderHistoryTransientMessage(t("deleteHistoryFailed"));
  }
}

function renderHistoryTransientMessage(message) {
  const previousMessage = document.querySelector(".history-transient-message");
  if (previousMessage) {
    previousMessage.remove();
  }
  const messageNode = document.createElement("p");
  messageNode.className = "history-transient-message";
  messageNode.textContent = message;
  document.querySelector(".recent-group")?.prepend(messageNode);
  window.setTimeout(() => {
    messageNode.remove();
  }, 2400);
}

function inlineIcon(markup) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${markup.trim()}</svg>`;
}

function historyPinIcon(active) {
  if (active) {
    return inlineIcon(`
      <path d="M12 17v5"></path>
      <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"></path>
      <path d="m2 2 20 20"></path>
      <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"></path>
    `);
  }
  return inlineIcon(`
    <path d="M12 17v5"></path>
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path>
  `);
}

function plusIcon() {
  return inlineIcon(`
    <path d="M12 5v14"></path>
    <path d="M5 12h14"></path>
  `);
}

function refreshIcon() {
  return inlineIcon(`
    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"></path>
    <path d="M21 3v5h-5"></path>
    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"></path>
    <path d="M3 21v-5h5"></path>
  `);
}

function listIcon() {
  return inlineIcon(`
    <line x1="8" x2="21" y1="6" y2="6"></line>
    <line x1="8" x2="21" y1="12" y2="12"></line>
    <line x1="8" x2="21" y1="18" y2="18"></line>
    <line x1="3" x2="3.01" y1="6" y2="6"></line>
    <line x1="3" x2="3.01" y1="12" y2="12"></line>
    <line x1="3" x2="3.01" y1="18" y2="18"></line>
  `);
}

function gridIcon() {
  return inlineIcon(`
    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
  `);
}

function folderPlusIcon() {
  return inlineIcon(`
    <path d="M12 10v6"></path>
    <path d="M9 13h6"></path>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
  `);
}

function arrowLeftIcon() {
  return inlineIcon(`
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  `);
}

function newspaperIcon() {
  return inlineIcon(`
    <path d="M4 6.5h16"></path>
    <path d="M4 12h11"></path>
    <path d="M4 17.5h8"></path>
  `);
}

function settingsIcon() {
  return inlineIcon(`
    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
    <circle cx="12" cy="12" r="3"></circle>
  `);
}

function closeIcon() {
  return inlineIcon(`
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  `);
}

function trashIcon() {
  return inlineIcon(`
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
    <path d="M3 6h18"></path>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  `);
}

function emptyStateIcon() {
  return inlineIcon(`
    <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"></path>
  `);
}

function chevronDownIcon() {
  return inlineIcon(`
    <path d="m7 9.5 5 5 5-5"></path>
  `);
}

function chevronUpIcon() {
  return inlineIcon(`
    <path d="m7 14.5 5-5 5 5"></path>
  `);
}

function moreHorizontalIcon() {
  return inlineIcon(`
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  `);
}

function faviconUrl(url, size) {
  let favicon;
  try {
    favicon = new URL(chrome.runtime.getURL("/_favicon/"));
  } catch {
    favicon = new URL("https://www.google.com/s2/favicons");
  }
  favicon.searchParams.set("pageUrl", url || "https://www.google.com");
  favicon.searchParams.set("size", String(size));
  return favicon.toString();
}

function compactHistoryUrl(url) {
  if (!url) {
    return "";
  }
  const host = url.hostname.replace(/^www\./, "");
  const path = `${url.pathname}${url.search}`.replace(/\/$/, "");
  return `${host}${path}`.slice(0, 120);
}

function historyFallbackTitle(url) {
  if (!url) {
    return t("unnamedPage");
  }
  const path = `${url.pathname}${url.search}`.replace(/\/$/, "");
  return path && path !== "/" ? path : (url.hostname.replace(/^www\./, "") || t("unnamedPage"));
}

function siteGroupKey(url) {
  if (!url || !/^https?:$/.test(url.protocol)) {
    return "";
  }
  return canonicalSiteHost(url.hostname);
}

function siteHomeUrl(siteKey, fallbackUrl) {
  const fallback = safeUrl(fallbackUrl);
  const key = normalizeHostname(siteKey);
  if (HOME_URL_BY_KEY[key]) {
    return HOME_URL_BY_KEY[key];
  }
  if (fallback && /^https?:$/.test(fallback.protocol)) {
    return `${fallback.origin}/`;
  }
  if (!key) {
    return "https://www.google.com/";
  }
  return `https://${key}/`;
}

function siteDisplayName(url, title) {
  const key = siteGroupKey(url);
  if (SITE_NAME_BY_KEY[key]) {
    return SITE_NAME_BY_KEY[key];
  }

  const fromTitle = siteNameFromTitle(title);
  if (fromTitle) {
    return fromTitle;
  }

  return readableHostName(key);
}

function canonicalSiteHost(hostname) {
  const host = normalizeHostname(hostname);
  if (!host) {
    return "";
  }
  if (SITE_GROUP_OVERRIDES[host]) {
    return SITE_GROUP_OVERRIDES[host];
  }

  const bareHost = host.replace(/^(www|m|mobile)\./, "");
  if (SITE_GROUP_OVERRIDES[bareHost]) {
    return SITE_GROUP_OVERRIDES[bareHost];
  }

  const matchedSuffix = SITE_GROUP_SUFFIXES.find((suffix) => (
    bareHost === suffix || bareHost.endsWith(`.${suffix}`)
  ));
  if (matchedSuffix) {
    return matchedSuffix === "twitter.com" ? "x.com" : matchedSuffix;
  }

  return registrableDomain(bareHost);
}

function normalizeHostname(hostname) {
  return String(hostname || "")
    .trim()
    .replace(/\.$/, "")
    .toLowerCase();
}

function registrableDomain(hostname) {
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length <= 2) {
    return hostname;
  }

  const suffix = parts.slice(-2).join(".");
  if (MULTIPART_PUBLIC_SUFFIXES.has(suffix) && parts.length >= 3) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

function historyPageKey(item, url, siteKey) {
  const title = normalizeText(item.title);
  if (!title) {
    return `url:${normalizeHistoryKey(item.url) || `${siteKey}${url?.pathname || ""}`}`;
  }

  return `title:${normalizeHistoryTitleKey(title, siteKey)}`;
}

function normalizeHistoryTitleKey(title, siteKey) {
  let normalized = normalizeText(title).toLowerCase();
  const siteNames = [
    SITE_NAME_BY_KEY[siteKey],
    readableHostName(siteKey),
    siteKey
  ]
    .filter(Boolean)
    .map((value) => normalizeText(value).toLowerCase());

  let changed = true;
  while (changed) {
    changed = false;
    for (const siteName of siteNames) {
      for (const separator of TITLE_SUFFIX_SEPARATORS) {
        const suffix = `${separator}${siteName}`;
        if (normalized.endsWith(suffix)) {
          normalized = normalized.slice(0, -suffix.length).trim();
          changed = true;
        }
      }
    }
  }

  return normalized || title.toLowerCase();
}

function siteNameFromTitle(title) {
  const cleanTitle = normalizeText(title);
  if (!cleanTitle) {
    return "";
  }
  const parts = cleanTitle
    .split(/\s[-|—–]\s| \/ /)
    .map((part) => part.trim())
    .filter(Boolean);
  const candidate = parts.at(-1);
  if (!candidate || candidate.length > 24 || /^https?:\/\//i.test(candidate)) {
    return "";
  }
  return candidate;
}

function readableHostName(hostname) {
  if (!hostname) {
    return t("website");
  }
  const core = hostname
    .replace(/^m\./, "")
    .split(".")
    .filter(Boolean)
    .at(-2) || hostname;
  return core.charAt(0).toUpperCase() + core.slice(1);
}

function normalizeHistoryKey(value) {
  const url = safeUrl(value);
  if (!url || !/^https?:$/.test(url.protocol)) {
    return "";
  }
  url.hash = "";
  return url.href;
}

function normalizeHistoryDeleteUrl(value) {
  const url = safeUrl(value);
  if (!url || !/^https?:$/.test(url.protocol)) {
    return "";
  }
  return url.href;
}

function isDisplayableHistoryUrl(url) {
  return Boolean(url
    && /^https?:$/.test(url.protocol)
    && !url.username
    && !url.password
    && !isLocalHistoryUrl(url)
    && !isAuthRelatedHistoryUrl(url));
}

function isLocalHistoryUrl(url) {
  const host = normalizeHostname(url?.hostname).replace(/^\[|\]$/g, "");
  if (!host) {
    return true;
  }
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (!host.includes(".") && !host.includes(":")) {
    return true;
  }
  if (isPrivateIpv4Host(host) || isPrivateIpv6Host(host)) {
    return true;
  }
  return false;
}

function isPrivateIpv4Host(host) {
  if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
    return false;
  }
  const parts = host.split(".").map((part) => Number(part));
  if (parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }
  const [first, second] = parts;
  return first === 0
    || first === 10
    || first === 127
    || (first === 169 && second === 254)
    || (first === 172 && second >= 16 && second <= 31)
    || (first === 192 && second === 168);
}

function isPrivateIpv6Host(host) {
  const normalized = host.toLowerCase();
  return normalized === "::1"
    || normalized.startsWith("fc")
    || normalized.startsWith("fd")
    || normalized.startsWith("fe80:");
}

function isAuthRelatedHistoryUrl(url) {
  const host = normalizeHostname(url?.hostname);
  const pathSegments = url.pathname
    .split("/")
    .map((segment) => normalizeText(decodeURIComponentSafe(segment)).toLowerCase())
    .filter(Boolean);
  const authPathScore = pathSegments.filter((segment) => AUTH_HISTORY_PATH_SEGMENTS.has(segment)).length;
  const hasStrongAuthPath = pathSegments.some((segment) => STRONG_AUTH_HISTORY_PATH_SEGMENTS.has(segment));
  const queryScore = [...url.searchParams.keys()]
    .filter((key) => AUTH_HISTORY_QUERY_PARAMS.has(key.toLowerCase()))
    .length;
  const hasAuthHost = AUTH_RELATED_HISTORY_HOSTS.has(host)
    || AUTH_RELATED_HISTORY_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
  const hasAuthHostHint = hasAuthHost || host
    .split(/[.-]/)
    .some((part) => AUTH_RELATED_HISTORY_HOST_PARTS.has(part));

  return hasAuthHost
    || (hasAuthHostHint && (url.pathname === "/" || authPathScore > 0 || queryScore > 0))
    || (hasStrongAuthPath && queryScore > 0)
    || (authPathScore > 0 && (hasAuthHostHint || queryScore > 0))
    || (queryScore >= 2 && hasAuthHostHint);
}

function decodeURIComponentSafe(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function applyGeneratedFallbackIcon(icon, site) {
  icon.removeAttribute("srcset");
  icon.src = fallbackIconDataUrl(site?.title || site?.url || t("website"));
}

function fallbackIconDataUrl(label) {
  const letter = iconLetter(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="28" fill="#315c45"/>
      <text x="64" y="75" text-anchor="middle" fill="#fffdf7" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif" font-size="54" font-weight="700">${escapeHtml(letter)}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function iconLetter(label) {
  const cleanLabel = normalizeText(label);
  return [...cleanLabel][0]?.toUpperCase() || "•";
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function safeUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isWebUrl(value) {
  const url = safeUrl(value);
  return Boolean(url && (url.protocol === "http:" || url.protocol === "https:"));
}

function normalizePortalUrl(value) {
  const trimmed = normalizeText(value);
  if (!trimmed || trimmed.length > MAX_PORTAL_URL_LENGTH) {
    return "";
  }

  const withProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = safeUrl(withProtocol);
  if (!url || !isWebUrl(url.href) || url.username || url.password) {
    return "";
  }
  return url.href;
}

function emptyState(message) {
  return `
    <div class="empty-state">
      <div>
        <span class="empty-mark">${emptyStateIcon()}</span>
        <p>${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
