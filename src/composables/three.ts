
import * as THREE from 'three'
import { animate, spring } from 'popmotion'
// import Stats from 'three/examples/jsm/libs/stats.module.js'
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import snoise3 from '@/glsl/snoise-3.glsl'

interface useThreeParams {
  container?: HTMLElement
}

let camera: THREE.PerspectiveCamera, 
  scene: THREE.Scene, 
  renderer: THREE.WebGLRenderer, 
  dispRT: THREE.WebGLRenderTarget,
  dispMat: THREE.ShaderMaterial,
  fsQuad: FullScreenQuad
  // stats: Stats

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function render(time: number) {
  dispMat.uniforms.uTime.value = time / 4000
  renderDisp()

  renderer.render(scene, camera)

  requestAnimationFrame(render)
  // stats.update()
}

function renderDisp() {
  fsQuad.material = dispMat
  renderer.setRenderTarget(dispRT)
  fsQuad.render(renderer)
  renderer.setRenderTarget(null)
}

export function useThree ({ container }: useThreeParams = {}) {
  fsQuad = new FullScreenQuad()

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#fff')

  const plane = new THREE.PlaneGeometry(50, 50, 100, 100)
  const material = new THREE.MeshStandardMaterial({ color: '#fff' })

  dispRT = new THREE.WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
  dispMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uNoiseCoef: { value: 4 }
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
        `
  })

  material.displacementMap = dispRT.texture
  material.displacementScale = 10

  const mesh = new THREE.Mesh(plane, material)
  mesh.rotation.y = -60 * (Math.PI / 180) 
  mesh.position.x = 20
  
  mesh.name = 'mesh'
  scene.add(mesh)

  const ambienLight = new THREE.AmbientLight(0xf7c5cc)
  scene.add(ambienLight)

  const lightCenter = new THREE.PointLight('#fff', 0.5, 100)
  lightCenter.position.set(-30, 0, -30)
  scene.add(lightCenter)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container ? container.appendChild(renderer.domElement) : document.body.appendChild(renderer.domElement)

  // controls = new OrbitControls(camera, renderer.domElement)
  // stats = new Stats()
  // document.body.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)

  render(0)
}