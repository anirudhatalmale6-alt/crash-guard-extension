const HOMEPAGE = "https://www.google.com";

function isCrashUrl(url) {
  if (!url) return false;
  const normalized = url.toLowerCase().replace(/\/+$/, "");
  return normalized === "chrome://crash" || normalized.startsWith("chrome://crash#");
}

const redirected = new Set();

function redirect(tabId) {
  if (redirected.has(tabId)) return;
  redirected.add(tabId);
  chrome.tabs.update(tabId, { url: HOMEPAGE }, () => {
    setTimeout(() => redirected.delete(tabId), 2000);
  });
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0 && isCrashUrl(details.url)) {
    redirect(details.tabId);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && isCrashUrl(changeInfo.url)) {
    redirect(tabId);
  }
});

chrome.webNavigation.onErrorOccurred.addListener((details) => {
  if (details.frameId === 0 && isCrashUrl(details.url)) {
    redirect(details.tabId);
  }
});
