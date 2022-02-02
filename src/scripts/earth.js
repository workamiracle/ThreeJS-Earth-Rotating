import * as THREE from 'three';
import { ShaderMaterial } from 'three';

// create earth
const earthVertexShader = require('../shaders/earth.vs');
const earthFragmentShader = require('../shaders/earth.fs');
export var earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms: {
            earthTexture: {
                value: new THREE.TextureLoader().load("images/earth.jpg")
            }
        }
    })
);
