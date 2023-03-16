import { animateScene } from '@/three'

export function animateBackgroundIntersectionTitle () {
  animateScene({
    lightPositionX: -30,
    lightPositionZ: -30,
    planeRotationY: -60 * (Math.PI / 180),
    planePositionX: 20,
    noiseDisplacementScale: 10,
    noiseFrequencyCoef: 4,
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
    planePositionX: -12.5,
    cameraFov: 90,
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