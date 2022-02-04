import '../styles/style.css';
import * as THREE from 'three';
import gsap from 'gsap';

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

// add the objects to the scene
const singleEarthGroup = new THREE.Group();
singleEarthGroup.add(earth);
singleEarthGroup.rotation.offset = {
    x: 0,
    y: 0
};
scene.add(singleEarthGroup);
scene.add(earthAtmosphere);
earthAtmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(stars);

// add event listeners
window.addEventListener('resize', () => {
    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // update canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    prevX: undefined,
    prevY: undefined
};
canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // left mouse button
        mouse.down = true;
        mouse.prevX = event.clientX;
        mouse.prevY = event.clientY;
    }
});
canvas.addEventListener('mousemove', (event) => {
    mouse.x = ((event.clientX - innerWidth / 2) / (innerWidth / 2)) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;

    if (mouse.down) {
        event.preventDefault();
        // console.log('turn the earth')
        const deltaX = event.clientX - mouse.prevX;
        const deltaY = event.clientY - mouse.prevY;

        singleEarthGroup.rotation.offset.x += deltaY * 0.005;
        singleEarthGroup.rotation.offset.y += deltaX * 0.005;

        gsap.to(singleEarthGroup.rotation, {
            y: singleEarthGroup.rotation.offset.y,
            x: singleEarthGroup.rotation.offset.x,
            duration: 2
        })
        mouse.prevX = event.clientX;
        mouse.prevY = event.clientY;
    }
});
canvas.addEventListener('mouseup', (event) => {
    if (event.button === 0) { // left mouse button
        mouse.down = false;
    }
});

// set the camera z-position
camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // mouse event animation
}
animate();
