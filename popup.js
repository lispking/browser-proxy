document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const proxyEnabled = document.getElementById('proxyEnabled');
  const proxyHost = document.getElementById('proxyHost');
  const proxyPort = document.getElementById('proxyPort');
  const saveButton = document.getElementById('saveButton');
  const toast = document.getElementById('toast');

  // 加载保存的设置
  chrome.storage.local.get(['proxyEnabled', 'proxyHost', 'proxyPort'], function(result) {
    proxyEnabled.checked = result.proxyEnabled || false;
    proxyHost.value = result.proxyHost || '';
    proxyPort.value = result.proxyPort || '';
  });

  // 显示提示框的函数
  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // 保存设置
  saveButton.addEventListener('click', function() {
    const config = {
      proxyEnabled: proxyEnabled.checked,
      proxyHost: proxyHost.value,
      proxyPort: proxyPort.value
    };

    chrome.storage.local.set(config, function() {
      // 通知background.js更新代理设置
      chrome.runtime.sendMessage({
        type: 'updateProxy',
        config: config
      });
      // 显示保存成功提示
      showToast();
    });
  });
});