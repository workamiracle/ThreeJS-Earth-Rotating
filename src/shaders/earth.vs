varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    vertexUV = uv;
    // NOTE: normalize() is used to avoid weird high glowing
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}