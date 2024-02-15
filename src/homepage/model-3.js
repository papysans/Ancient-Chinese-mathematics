let round = 0;
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
controls.autoRotate = true; 
controls.autoRotateSpeed = 1.0; 
// controls.minDistance = 21
// controls.maxDistance = 50
// controls.minPolarAngle = Math.PI / 5
// controls.maxPolarAngle = Math.PI / 2

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

 // Materials


// AxesHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//Loader
const loader = new THREE.GLTFLoader().setPath('../../model/圆规精简版/');
loader.load('圆规精简版.gltf', function (gltf)  {
        model = gltf.scene
        scene.add(model)
        scene.position.set(0,0,0)
		model.position.set(.5,-1.5,0)
        model.scale.set(45, 45, 45)

        // 创建一个矩形光源
        const rectLight1 = new THREE.RectAreaLight(0x404040, 4, 200, 200);
        rectLight1.position.set(0, 10, 0);
        rectLight1.lookAt(0, 0, 0);
        scene.add(rectLight1);

        const rectLight2 = new THREE.RectAreaLight(0x404040, .5, 40, 40);
        rectLight2.position.set(0, -10, 0);
        rectLight2.lookAt(0, 0, 0);
        scene.add(rectLight2);

        // const light = new THREE.AmbientLight(0x404040, 2); // 柔和的白光
        // scene.add( light );
    }
)

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
// Animation

var minPan = new THREE.Vector3( -2, -.5, -2 )
var maxPan = new THREE.Vector3( 2, .5, 2 )

const tick = () => {
    // round += 0.0015;
    // camera.position.x = Math.sin(round) * 20;
    // camera.position.z = Math.cos(round) * 20;
    // camera.position.y = Math.cos(round) * 10;
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
