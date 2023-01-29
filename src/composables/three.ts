
import { animate, mix } from 'popmotion'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import snoise3 from '@/glsl/snoise-3.glsl'
import * as THREE from 'three'

interface InitParams {
  container: HTMLElement | null
}

interface AnimateSceneParams {
  planeRotationY?: number
  planeRotationX?: number
  planePositionX?: number
  planePositionY?: number
  lightPositionX?: number
  lightPositionZ?: number
  lightDistance?: number
  noiseDisplacementScale?: number
  noiseFrequencyCoef?: number
  noiseTimeCoef?: number
}

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

export function init ({ container }: InitParams) {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 0, 30)

  scene = new THREE.Scene()

  const planeGeometry = new THREE.PlaneGeometry(50, 50, 512, 512)
  planeMaterial = new THREE.MeshStandardMaterial({ color: '#f7c5cc' })

  dispRT = new THREE.WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
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

const animationRange = 1000
let animation: { stop: () => void }

function animateScene (to: AnimateSceneParams) {
  animation?.stop()

  const planeRotationY = plane.rotation.y,
    planeRotationX = plane.rotation.x,
    planePositionX = plane.position.x,
    planePositionY = plane.position.y,
    lightPositionX = lightCenter.position.x,
    lightPositionZ = lightCenter.position.z,
    lightDistance = lightCenter.distance,
    noiseDisplacementScale = planeMaterial.displacementScale,
    noiseTimeCoef = timeCoef,
    noiseFrequencyCoef = dispMat.uniforms.uNoiseCoef.value as number

  animate({
    from: 0,
    to: animationRange,
    type: 'spring',
    mass: 1,
    damping: 100,
    stiffness: 300,
    velocity: 1000,
    onUpdate: (latest) => {
      const progress = latest / animationRange
      plane.rotation.y = mix(planeRotationY, to.planeRotationY ?? 0, progress)
      plane.rotation.x = mix(planeRotationX, to.planeRotationX ?? 0, progress)
      plane.position.x = mix(planePositionX, to.planePositionX ?? 0, progress)
      plane.position.y = mix(planePositionY, to.planePositionY ?? 0, progress)
      lightCenter.position.x = mix(lightPositionX, to.lightPositionX ?? 0, progress)
      lightCenter.position.z = mix(lightPositionZ, to.lightPositionZ ?? 20, progress)
      lightCenter.distance = mix(lightDistance, to.lightDistance ?? 100, progress)
      planeMaterial.displacementScale = mix(noiseDisplacementScale, to.noiseDisplacementScale ?? 0, progress)
      dispMat.uniforms.uNoiseCoef.value = mix(noiseFrequencyCoef, to.noiseFrequencyCoef ?? 0, progress)
      timeCoef = mix(noiseTimeCoef, to.noiseTimeCoef ?? noiseTimeCoef, progress)
    },
  })
}

export function animateBackgroundIntersectionTitle () {
  animateScene({
    lightPositionX: -10,
    lightPositionZ: 18,
    lightDistance: 50,
    noiseDisplacementScale: 20,
    noiseFrequencyCoef: 3,
  })
}

export function animateBackgroundIntersectionAbout () {
  animateScene({
    lightPositionX: -20,
    noiseDisplacementScale: 15,
    noiseFrequencyCoef: 2,
  })
}

export function animateBackgroundIntersectionWorks () {
  animateScene({
    lightPositionZ: 50,
    lightDistance: 200,
  })
}

export function animateBackgroundIntersectionContacts () {
  animateScene({
    lightPositionX: -15,
    lightPositionZ: 15,
    noiseDisplacementScale: 25,
    noiseFrequencyCoef: 2,
  })
}
