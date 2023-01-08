
import * as THREE from 'three'
import { animate, mix } from 'popmotion'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import snoise3 from '@/glsl/snoise-3.glsl'

interface initParams {
  container?: HTMLElement
}

interface animateSceneParams {
  planeRotationY?: number,
  planeRotationX?: number,
  planePositionX?: number,
  planePositionY?: number,
  lightPositionX?: number,
  lightPositionZ?: number,
  noiseDisplacementScale?: number,
  noiseFrequencyCoef?: number,
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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.outerHeight)
}

function render(time: number) {
  dispMat.uniforms.uTime.value = time * timeCoef
  renderDisp()

  renderer.render(scene, camera)

  requestAnimationFrame(render)
}

function renderDisp() {
  fsQuad.material = dispMat
  renderer.setRenderTarget(dispRT)
  fsQuad.render(renderer)
  renderer.setRenderTarget(null)
}

export function init ({ container }: initParams = {}) {
  fsQuad = new FullScreenQuad()

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#fff')

  const planeGeometry = new THREE.PlaneGeometry(50, 50, 100, 100)
  planeMaterial = new THREE.MeshStandardMaterial({ color: '#fff' })

  dispRT = new THREE.WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
  dispMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uNoiseCoef: { value: 0 }
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

  planeMaterial.displacementMap = dispRT.texture
  planeMaterial.displacementScale = 0

  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.y = -90 * (Math.PI / 180) 
  plane.position.x = 50  
  plane.name = 'mesh'
  scene.add(plane)

  const ambienLight = new THREE.AmbientLight(0xf7c5cc)
  scene.add(ambienLight)

  lightCenter = new THREE.PointLight('#fff', 0.5, 100)
  lightCenter.position.set(-30, 0, 20)
  scene.add(lightCenter)

  timeCoef = 1 / 4000

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container ? container.appendChild(renderer.domElement) : document.body.appendChild(renderer.domElement)
  render(0)

  window.addEventListener('resize', onWindowResize)
}

const animationRange = 1000
let animation: { stop: () => void }

function animateScene (to: animateSceneParams) {
  animation?.stop()

  const planeRotationY = plane.rotation.y,
    planeRotationX = plane.rotation.x,
    planePositionX = plane.position.x,
    planePositionY = plane.position.y,
    lightPositionX = lightCenter.position.x,
    lightPositionZ = lightCenter.position.z,
    noiseDisplacementScale = planeMaterial.displacementScale,
    noiseFrequencyCoef = dispMat.uniforms.uNoiseCoef.value,
    noiseTimeCoef = timeCoef

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
      lightCenter.position.x = mix(lightPositionX , to.lightPositionX ?? -30, progress)
      lightCenter.position.z = mix(lightPositionZ , to.lightPositionZ ?? -30, progress)
      planeMaterial.displacementScale = mix(noiseDisplacementScale, to.noiseDisplacementScale ?? 0, progress)
      dispMat.uniforms.uNoiseCoef.value = mix(noiseFrequencyCoef, to.noiseFrequencyCoef ?? 0, progress)
      timeCoef = mix(noiseTimeCoef, to.noiseTimeCoef ?? noiseTimeCoef, progress)
    }
  })
}

export function animateIntersectTitle () {
  animateScene({
    planeRotationY: -60 * (Math.PI / 180),
    planePositionX: 20,
    noiseDisplacementScale: 10,
    noiseFrequencyCoef: 4
  })
}

export function animateIntersectAbout () {
  animateScene({
    planePositionX: 40,
    noiseDisplacementScale: 5,
    noiseFrequencyCoef: 5
  })
}

export function animateIntersectWorks () {
  animateScene({
    planePositionX: 50,
    lightPositionZ: 0,
  })
}

export function animateIntersectContacts () {
  lightCenter.position.x = -40
  lightCenter.position.z = 20
  animateScene({
    lightPositionZ: 25,
    noiseDisplacementScale: 15,
    noiseFrequencyCoef: 3
  })
}