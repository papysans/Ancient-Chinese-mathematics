// Get the elements that will be transformed during scrolling
const textBehind = document.getElementById("text-behind");
const textFront = document.getElementById("text-front");
const textBehindBlur = document.getElementById("text-behind-blur");
const canvasRect = document.getElementById("canvas");

// Define the increment of scaling
// Text scaling
const parallaxScaling1 = 0.0005;
// Canvas scaling
const parallaxScaling2 = 0.00025;
// Three.js Camera Rotation Speed
const parallaxScaling3 = 0.0000001;

// Initialize scroll and ease values
let currentScroll = 0;
let targetScroll = 0;
let ease = 0.001;

// This function updates the scale and position of the elements on scroll
function updateScale() {
    // Get the top and bottom position of the canvasRect element relative to the viewport.
    let rect = canvasRect.getBoundingClientRect();

    // Calculate the start and end scroll positions relative to the top of the document.
    // window.pageYOffset provides the amount of pixels that the document is currently scrolled vertically.
    // Adding rect.top/rect.bottom converts the relative viewport position to an absolute document position.
    let startScrollPosition = window.pageYOffset + rect.top;
    let endScrollPosition = window.pageYOffset + rect.bottom;

    // The condition checks the following:
    // 1. If the bottom edge of the viewport is above the starting position of our target element or
    // 2. If the top edge of the viewport is below the ending position of our target element.
    // In other words, it checks if the target element is outside the current viewport.
    if (
        targetScroll + window.innerHeight < startScrollPosition ||
        targetScroll > endScrollPosition
    ) {
        // If either of the conditions is true, we are not viewing the element and thus we should exit (return) from the function early, without updating the parallax effects.
        return;
    }

    // The currentScroll value is being adjusted to gradually approach the targetScroll value.
    // This creates a smoother, easing effect rather than directly jumping to the target value.
    currentScroll += (targetScroll - currentScroll) * ease;

    let scaleValue1 = 1 + currentScroll * parallaxScaling1;
    let scaleValue2 = 1 + currentScroll * parallaxScaling2;

    // Use the scaleValue to adjust the transform property for scaling
    textBehind.style.transform = `scale(${scaleValue1})`;
    textFront.style.transform = `scale(${scaleValue1})`;
    textBehindBlur.style.transform = `scale(${scaleValue1})`;
    canvasRect.style.transform = `scale(${scaleValue2})`;

    // setTimeout is a way to delay the execution of the function.
    // By calling updateScale with a delay of approximately 1/60th of a second, we're mimicking the behavior of requestAnimationFrame, aiming to update the parallax effect about 60 times per second.
    // This makes the animation smoother by spreading the updates across small time intervals, making transitions less abrupt and more visually appealing.
    setTimeout(updateScale, 1000 / 60); // approximately 60 times per second
}

window.addEventListener("scroll", () => {
    targetScroll = window.pageYOffset;
    updateScale();
});

updateScale();
