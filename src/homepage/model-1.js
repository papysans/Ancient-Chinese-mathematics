
let round = 0 ;
let model = null; 

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Base camera
const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 12
camera.position.y = 4
camera.position.z = 15
scene.add(camera)

//Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom =false
controls.enablePan = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

// AxesHelper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//Loader
const loader = new THREE.GLTFLoader().setPath('../../model/');
loader.load('铜尺.gltf', function (gltf)  {
    THREE.RectAreaLightUniformsLib.init();
    model = gltf.scene

    const texture = textureLoader.load('../../model/铜尺_resources/材质.jpg');
    
    // Materials
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = false
    texture.encoding = THREE.sRGBEncoding

    texture.repeat.set(20,20);
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.map = texture;
        }
    });
    scene.add(model)
    scene.position.set(.5,-1,0)
    model.scale.set(200, 200, 200)
    model.rotation.z = THREE.Math.degToRad(45);
    model.rotation.x = THREE.Math.degToRad(-5);

    // 创建一个矩形光源
    const rectLight1 = new THREE.RectAreaLight(0x6e8378, 2, 2000, 2000);
    rectLight1.position.set(0, 10, 0);
    rectLight1.lookAt(0, 0, 0);
    scene.add(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0x7b9286, .5, 40, 40);
    rectLight2.position.set(0, -10, 0);
    rectLight2.lookAt(0, 0, 0);
    scene.add(rectLight2);
    
    const rectLight3 = new THREE.RectAreaLight(0xffffff, 20, 200, 200);
    rectLight2.position.set(50, 50, 50);
    rectLight2.lookAt(0, 0, 0);
    scene.add(rectLight3);

    //PointLightHelper
    // const lightHelper1 = new RectAreaLightHelper(rectLight1);
    // scene.add(lightHelper1);

})


window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const tick = () => {
    // round += 0.0015;
    // const offsetX = Math.sin(round) * 20;
    // const offsetZ = Math.cos(round) * 20;
    // controls.target.set(offsetX, camera.position.y, offsetZ);
    controls.update()
    if (model) { 
        model.rotation.y += 0.001; 
    } 
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
