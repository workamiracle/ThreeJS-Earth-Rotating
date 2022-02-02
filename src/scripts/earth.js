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

const earthAtmosphereVertexShader = require('../shaders/earth_atmosphere.vs');
const earthAtmosphereFragmentShader = require('../shaders/earth_atmosphere.fs');
export var earthAtmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new ShaderMaterial({
        vertexShader: earthAtmosphereVertexShader,
        fragmentShader: earthAtmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);
