const textBehind = document.getElementById("text-behind");
const textFront = document.getElementById("text-front");
const textBehindBlur = document.getElementById("text-behind-blur");
const canvasRect = document.getElementById("canvas");

const parallaxScaling1 = 0.0005;
const parallaxScaling2 = 0.00025;
const parallaxScaling3 = 0.0000001;

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.001;

function updateScale() {
    let rect = canvasRect.getBoundingClientRect();
    let startScrollPosition = window.pageYOffset + rect.top;
    let endScrollPosition = window.pageYOffset + rect.bottom;
    if (
        targetScroll + window.innerHeight < startScrollPosition ||
        targetScroll > endScrollPosition
    ) {
        return;
    }

    currentScroll += (targetScroll - currentScroll) * ease;

    let scaleValue1 = 1 + currentScroll * parallaxScaling1;
    let scaleValue2 = 1 + currentScroll * parallaxScaling2;

    textBehind.style.transform = `scale(${scaleValue1})`;
    textFront.style.transform = `scale(${scaleValue1})`;
    textBehindBlur.style.transform = `scale(${scaleValue1})`;
    canvasRect.style.transform = `scale(${scaleValue2})`;

    setTimeout(updateScale, 1000 / 60);
}

window.addEventListener("scroll", () => {
    targetScroll = window.pageYOffset;
    updateScale();
});

updateScale();

let isAnimating = false;

$(document).ready(function () {
    $(".drop-down").click(function () {
        isAnimating = true;
        $("html, body").animate(
            {
                scrollTop: $(window).height() * 1.2,
            },
            1000,
            function () {
                // 动画完成后，再次启用滚动事件监听器
                isAnimating = false;
            }
        );
    });
});

window.addEventListener("scroll", () => {
    if (!isAnimating) {
        targetScroll = window.pageYOffset;
        updateScale();
    }
});
