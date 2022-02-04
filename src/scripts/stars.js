import * as THREE from 'three';
import { Float32BufferAttribute } from 'three';

const starVertices = [];
for (var i = 0; i < 10000; ++i) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute(
    'position', new Float32BufferAttribute(starVertices, 3)
);
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

export const stars = new THREE.Points(starGeometry, starMaterial);