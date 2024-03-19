// 获取 gif 图片元素
var gif = document.getElementById("myGif");

// 设置 gif 图片的静态版本和动态版本的 url
var staticSrc = "path/to/static.gif";
var animatedSrc = "path/to/animated.gif";

// 预加载动态 gif
var preloadImage = new Image();
preloadImage.src = animatedSrc;

// 监听鼠标 hover 事件
gif.addEventListener("mouseover", function () {
    gif.src = animatedSrc; // 播放 gif
});

// 监听鼠标移出事件
gif.addEventListener("mouseout", function () {
    gif.src = staticSrc; // 停止播放 gif
});
