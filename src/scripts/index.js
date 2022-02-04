import '../styles/style.css';
import * as THREE from 'three';

import { earth, earthAtmosphere } from './earth';
import { stars } from './stars';

// setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    100, innerWidth / innerHeight, 0.1, 1000
);
const canvas = document.getElementById("webgl-canvas");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener('resize', () => {
    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // update canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// add the objects to the scene
scene.add(earth);
scene.add(earthAtmosphere);
earthAtmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(stars);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    earth.rotation.y += 0.001;
}
animate();
