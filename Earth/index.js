import * as THREE from 'three';

import { OrbitControls } from 'jsm/controls/OrbitControls.js ';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setAnimationLoop(animate);

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const fov = 55;
const aspectRatio = width / height;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

const earthTexture = new THREE.TextureLoader().load(
  './textures/earthmap1k.jpg'
);
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const EarthMesh = new THREE.Mesh(geometry, material);
scene.add(EarthMesh);

const moonTexture = new THREE.TextureLoader().load('./textures/moonmap4k.jpg');
const moonGeometry = new THREE.IcosahedronGeometry(0.3, 12);
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(2, 1, 0);

scene.add(moonMesh);

const light = new THREE.HemisphereLight('white', 'white', 4);
scene.add(light);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

let moonAngle = 0;
function animate() {
  // EarthMesh.rotation.x += 0.001;
  // EarthMesh.rotation.y += 0.000001215;
  EarthMesh.rotation.y += 0.002;

  const moonDistance = 2; // Scaled distance
  moonAngle += 0.001; // Moon's real orbit speed

  moonMesh.position.x =
    EarthMesh.position.x + moonDistance * Math.cos(moonAngle);
  moonMesh.position.z =
    EarthMesh.position.z + moonDistance * Math.sin(moonAngle);
  controls.update();
  renderer.render(scene, camera);
}
