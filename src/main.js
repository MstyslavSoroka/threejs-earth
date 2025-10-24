import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import earthImg from './earth.jpg';
const earth = new THREE.TextureLoader().load(earthImg);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(10);
const material = new THREE.MeshStandardMaterial({
  map: earth,
});

const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

const pointLight = new THREE.PointLight(0xffffff, 120);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 100;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(2000).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.z += 0.005;
  // sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
