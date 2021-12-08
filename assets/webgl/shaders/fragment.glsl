precision mediump float;

varying vec2 vUv;
varying float wave;

uniform sampler2D uTexture;
uniform float uTime;
  
void main() {
  vec2 uv = vUv;
  vec2 dUv = vec2(uv.x, uv.y);
  vec3 texturePrep;

  float w = wave;
  float r = texture2D(uTexture, dUv + vec2(0., 0.) + w * 1.).r;
  float g = texture2D(uTexture, dUv + vec2(0., 0.) + w * 0.0).g;
  float b = texture2D(uTexture, dUv + vec2(0., 0.) + w * -1.).b;
  texturePrep = vec3(r, g, b);    
  
  
  gl_FragColor = vec4(texturePrep, 0.8);
}