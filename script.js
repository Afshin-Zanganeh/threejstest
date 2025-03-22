import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Update the controls and renderer size when the window is resized
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



const loader = new FontLoader();
const textureLoader = new THREE.TextureLoader();

// URL to your matcap image
const matcapTextureURL = 'matcap3.png';
textureLoader.load(matcapTextureURL, (matcapTexture) => {
  loader.load('https://raw.githubusercontent.com/mrdoob/three.js/refs/heads/master/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textGeometry = new TextGeometry('Mahmoud Khar Ast!!!', {
        font: font,
        size: 32,
        height: 5,
		depth: 8,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 6,
        bevelSize: 4,
        bevelOffset: 0,
        bevelSegments: 5
    });
    
	textGeometry.center()

    const textMaterial = new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(mesh);
	
	const geometry = new THREE.TorusGeometry( 20, 6, 32, 100 ); 
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

	for (let i = 0; i < 100; i++) {
		const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
		torus.position.x = (Math.random() - 0.5) * 500
		torus.position.y = (Math.random() - 0.5) * 500
		torus.position.z = (Math.random() - 0.5) * 500

		torus.rotation.x = Math.random() * Math.PI
		torus.rotation.y = Math.random() * Math.PI
		scene.add(torus)
	}

  });
});

// Continuously render the scene and update controls
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();