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

// Define a global variable to connect scroll-based animations to 3D animations.
let theta1 = 0;

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

    // Modulate theta1 based on the current scrolling offset.
    // This provides a connection between the 2D scrolling experience and the 3D Three.js animations.
    theta1 += currentScroll * parallaxScaling3;

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

import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js";

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
    alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();

// create a new RGBELoader to import the HDR
const hdrEquirect = new RGBELoader()
    // add your HDR //
    .setPath(
        "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
    )
    .load("ml_gradient_freebie_01.hdr", function () {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    });
scene.environment = hdrEquirect;

// add Fog to the scene - if too dark go lower with the second value
scene.fog = new THREE.FogExp2(0x11151c, 0.15);

// create a group to add your camera and object
// by creating a group, you can can work around the fact that three.js currently doesn't allow to add a rotation to the HDR
// when you add the camera and the object to the group, you can later animate the entire group
// you can then create a scene within the group, but then rotate the entire group, which simulates the rotation of the HDR
var group = new THREE.Group();
scene.add(group);

const pointlight = new THREE.PointLight(0x85ccb8, 7.5, 20);
pointlight.position.set(0, 3, 2);
group.add(pointlight);

const pointlight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
pointlight2.position.set(0, 3, 2);
group.add(pointlight2);

// create the camera
var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;
// add the camera to the group
group.add(camera);

const material1 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0.5,
    envMapIntensity: 10,
});

// Load the model
const objloader = new OBJLoader();
objloader.load(
    "https://raw.githubusercontent.com/miroleon/peace-of-mind/main/assets/buddha.obj",
    (object) => {
        object.children[0].material = material1;
        object.scale.setScalar(20);
        object.position.set(0, -0.25, 0);
        group.add(object);
    }
);

// RESIZE
window.addEventListener("resize", onWindowResize);

var update = function () {
    // Continuously animate theta1 irrespective of scrolling to ensure there's an inherent animation in the 3D visualization.
    theta1 += 0.0025;

    // create a panning animation for the camera
    camera.position.x = Math.sin(theta1) * 10;
    camera.position.z = Math.cos(theta1) * 10;
    camera.position.y = Math.cos(theta1);

    pointlight.position.x = Math.sin(theta1 + 1) * 11;
    pointlight.position.z = Math.cos(theta1 + 1) * 11;
    pointlight.position.y = 2 * Math.cos(theta1 - 3) + 3;

    pointlight2.position.x = -Math.sin(theta1 + 1) * 11;
    pointlight2.position.z = -Math.cos(theta1 + 1) * 11;
    pointlight2.position.y = 2 * -Math.cos(theta1 - 3) - 6;

    // rotate the group to simulate the rotation of the HDR
    group.rotation.y += 0.01;

    // keep the camera look at 0,0,0
    camera.lookAt(0, 0, 0);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
