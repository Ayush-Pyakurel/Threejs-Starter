import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js ';

// Defining the renderr -- whole document will be the renderer
const widht = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(widht, height);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = widht / height;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const scene = new THREE.Scene();

const cameraControl = new OrbitControls(camera, renderer.domElement);
cameraControl.enableDamping = true;
cameraControl.dampingFactor = 1;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
  window.requestAnimationFrame(animate);
  // console.log(Math, 'math');
  // mesh.scale.setScalar(Math.cos(t * 0.001));

  mesh.rotation.y = t * 0.001;
  cameraControl.update();
  renderer.render(scene, camera);
}
animate();
