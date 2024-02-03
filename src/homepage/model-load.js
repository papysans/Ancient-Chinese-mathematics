window.onload = function() {
  var script = document.createElement('script');
  script.type = 'module';

  // 检查 localStorage 中的标记
  if (localStorage.getItem('loadScript') === '1') {
    script.src = './src/homepage/model-2.js';
    localStorage.setItem('loadScript', '2');
  } else {
    script.src = './src/homepage/model-1.js';
    localStorage.setItem('loadScript', '1');
  }

  // 将新的 <script> 标签添加到 <head> 中
  document.head.appendChild(script);
};
