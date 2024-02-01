let round = 0;

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

// // Materials
// const bakedTexture = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/baked.jpg')
// bakedTexture.flipY = false
// bakedTexture.encoding = THREE.sRGBEncoding

// const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

//Loader
const loader = new THREE.GLTFLoader().setPath('../../model/');
loader.load('铜尺.gltf', function (gltf)  {
        const model = gltf.scene
        // model.traverse( child => child.material = bakedMaterial )
        scene.add(model)
		scene.position.set(0,-1,0)
        model.scale.set(250, 250, 250)
        // const light = new THREE.AmbientLight(0x404040, 2500); // 柔和的白光
        // scene.add( light );
        // 添加一个点光源
        const pointLight = new THREE.PointLight(0xffffff, 100);
        pointLight.position.set(50, 50, 50);
        scene.add(pointLight);

        // 添加一个方向光源
        const dirLight = new THREE.DirectionalLight(0xffffff, 100);
        dirLight.position.set(0, 50, 0);
        dirLight.position.set(50, 0, 0);
        dirLight.position.set(0, 0, 50);
        scene.add(dirLight);
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
	// controls.target.clamp( minPan, maxPan )
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
