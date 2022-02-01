import '../styles/style.css';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, innerWidth / innerHeight, 0.1, 1000
);
const canvas = document.getElementById("webgl-canvas");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // update canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
}); // NOTE: working!

document.body.append(renderer.domElement);
renderer.domElement.width = innerWidth;
renderer.domElement.height = innerHeight;

const earthVertexShader = require('../shaders/earth.vs');
const earthFragmentShader = require('../shaders/earth.fs');
// console.log(earthVertexShader);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader
    })
    // new THREE.MeshBasicMaterial({
    //     // color: 0xff0000,
    //     map: new THREE.TextureLoader().load("images/earth.jpg")
    // })
);

scene.add(sphere);
camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();