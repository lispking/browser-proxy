// 代理配置更新函数
function updateProxySettings(config) {
  if (config.proxyEnabled && config.proxyHost && config.proxyPort) {
    // 启用代理
    chrome.proxy.settings.set({
      value: {
        mode: 'fixed_servers',
        rules: {
          singleProxy: {
            scheme: 'http',
            host: config.proxyHost,
            port: parseInt(config.proxyPort)
          }
        }
      },
      scope: 'regular'
    });
  } else {
    // 禁用代理
    chrome.proxy.settings.set({
      value: { mode: 'direct' },
      scope: 'regular'
    });
  }
}

// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'updateProxy') {
    updateProxySettings(message.config);
  }
});

// 初始化时加载保存的设置
chrome.storage.local.get(['proxyEnabled', 'proxyHost', 'proxyPort'], function(result) {
  updateProxySettings(result);
});