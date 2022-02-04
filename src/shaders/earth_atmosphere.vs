varying vec3 vertexNormal;

void main() {
    // NOTE: normalize() is used to avoid weird high glowing
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}