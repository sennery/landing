precision mediump float;
varying vec2 vUv;
varying float wave;
uniform float uTime;
uniform vec2 uMouse;

#pragma glslify: noise = require(glsl-noise/simplex/3d) 

void main() {
  vec3 pos = position;  
  
  pos.z += noise(vec3(pos.x * 5. + uTime * 0.5, pos.y * 5. + uTime * 0.5, 0.)) / 5.;
  wave = pos.z;
  pos.z *= 30. + 20. * (2. - abs(uMouse.x) - abs(uMouse.y));

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}