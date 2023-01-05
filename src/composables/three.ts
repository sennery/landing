
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import snoise3 from '@/glsl/snoise-3.glsl'

interface useThreeParams {
  container?: HTMLElement
}

let camera: THREE.PerspectiveCamera, 
  scene: THREE.Scene, 
  renderer: THREE.WebGLRenderer, 
  controls: OrbitControls, 
  stats: Stats

let dispMat, dispRT, normMat, normRT, fsQuad

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate(time) {
  requestAnimationFrame(animate)

  dispMat.uniforms.uTime.value = time / 5000

  renderer.render(scene, camera)

  stats.update()
  renderDisp()
}

function renderDisp() {
  renderMat(dispMat, dispRT)
  renderMat(normMat, normRT)
}

function renderMat(mat, target) {
  fsQuad.material = mat
  const oldTarget = renderer.getRenderTarget()
  renderer.setRenderTarget(target)
  fsQuad.render(renderer)
  renderer.setRenderTarget(oldTarget)
}

export function useThree ({ container }: useThreeParams = {}) {
  fsQuad = new FullScreenQuad()

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30
  // camera.position.x = -30

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#fff')

  const geometry = new THREE.SphereGeometry(1, 100, 100)
  const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 )
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

  // normal map
  normRT = new THREE.WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
  normMat = new THREE.ShaderMaterial({
    uniforms: {
      dispMap: { value: dispRT.texture },
      delta: { value: new THREE.Vector2(1 / 200, 1 / 200) }
    },
    vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
    fragmentShader: `
          uniform sampler2D dispMap;
          uniform vec2 delta;
          varying vec2 vUv;
          void main() {
            float x1 = texture2D(dispMap, vec2(vUv.x - delta.x, vUv.y)).r;
            float x2 = texture2D(dispMap, vec2(vUv.x + delta.x, vUv.y)).r;
            float y1 = texture2D(dispMap, vec2(vUv.x, vUv.y - delta.y)).r;
            float y2 = texture2D(dispMap, vec2(vUv.x, vUv.y + delta.y)).r;
            gl_FragColor = vec4(0.5 + (x1 - x2), 0.5 + (y1 - y2), 1.0, 1.0);
          }
        `
  })

  material.displacementMap = dispRT.texture
  material.displacementScale = 10
  material.normalMap = normRT.texture
  material.normalMapType = THREE.ObjectSpaceNormalMap

  const mesh = new THREE.Mesh(plane, material)
  mesh.rotation.y = -60 * (Math.PI / 180) 
  // mesh.rotation.x = 30 * (Math.PI / 180) 
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

  controls = new OrbitControls(camera, renderer.domElement)
  stats = new Stats()
  document.body.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)

  animate()
}