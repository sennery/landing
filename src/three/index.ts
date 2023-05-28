import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import snoise3 from './glsl/snoise-3.glsl'
import * as THREE from 'three'
import type { ChangingSceneHandlers, ChangingSceneParams, InitSceneParams } from './types'

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  plane: THREE.Mesh,
  planeMaterial: THREE.MeshStandardMaterial,
  lightCenter: THREE.PointLight,
  renderer: THREE.WebGLRenderer,
  dispRT: THREE.WebGLRenderTarget,
  dispMat: THREE.ShaderMaterial,
  fsQuad: FullScreenQuad,
  timeCoef: number

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.outerHeight)
}

function render (time: number) {
  dispMat.uniforms.uTime.value = time * timeCoef
  renderDisp()

  renderer.render(scene, camera)

  requestAnimationFrame(render)
}

function renderDisp () {
  renderer.setRenderTarget(dispRT)
  fsQuad.render(renderer)
  renderer.setRenderTarget(null)
}

export function init ({ container }: InitSceneParams) {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 0, 30)

  scene = new THREE.Scene()

  const planeGeometry = new THREE.PlaneGeometry(50, 50, 100, 100)
  planeMaterial = new THREE.MeshStandardMaterial({ color: '#f7c5cc' })

  dispRT = new THREE.WebGLRenderTarget(100, 100, { depthBuffer: false, stencilBuffer: false })
  dispMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uNoiseCoef: { value: 0 },
    },
    vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
    fragmentShader: `
          uniform float uTime;
          uniform float uNoiseCoef;
          varying vec2 vUv;
          ${snoise3}
          void main() {
            vec2 p = vec2(vUv * uNoiseCoef);
            float noise = (snoise(vec3(p.x, p.y, uTime)) + 1.0) / 2.0;
            gl_FragColor = vec4(noise, 0.0, 0.0, 1.0);
          }
        `,
  })

  fsQuad = new FullScreenQuad(dispMat)

  planeMaterial.displacementMap = dispRT.texture
  planeMaterial.displacementScale = 0

  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.position.set(50, 0, 0)
  plane.name = 'mesh'
  scene.add(plane)

  const ambienLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambienLight)

  lightCenter = new THREE.PointLight('#fff', 0.6, 100)
  lightCenter.position.set(0, 0, 20)
  scene.add(lightCenter)

  timeCoef = 1 / 4000

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container ? container.appendChild(renderer.domElement) : document.body.appendChild(renderer.domElement)
  render(0)

  window.addEventListener('resize', onWindowResize)
}

export function getCurrentSceneParams (): ChangingSceneParams {
  return {
    planeRotationY: plane.rotation.y,
    planeRotationX: plane.rotation.x,
    planePositionX: plane.position.x,
    planePositionY: plane.position.y,
    lightPositionX: lightCenter.position.x,
    lightPositionZ: lightCenter.position.z,
    lightDistance: lightCenter.distance,
    noiseDisplacementScale: planeMaterial.displacementScale,
    noiseTimeCoef: timeCoef,
    noiseFrequencyCoef: dispMat.uniforms.uNoiseCoef.value as number,
    cameraFov: camera.fov,
  }
}

export const changingSceneParamHandlers: ChangingSceneHandlers<ChangingSceneParams> = {  
  planeRotationY (val) { plane.rotation.y = val },
  planeRotationX (val) { plane.rotation.x = val },
  planePositionX (val) { plane.position.x = val },
  planePositionY (val) { plane.position.y = val },
  lightPositionX (val) { lightCenter.position.x = val },
  lightPositionZ (val) { lightCenter.position.z = val },
  lightDistance (val) { lightCenter.distance = val },
  noiseDisplacementScale (val) { planeMaterial.displacementScale = val },
  noiseTimeCoef (val) { timeCoef = val },
  noiseFrequencyCoef (val) { dispMat.uniforms.uNoiseCoef.value = val },
  cameraFov (val) { 
    camera.fov = val     
    camera.updateProjectionMatrix()
  },
}
