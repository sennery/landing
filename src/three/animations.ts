import { animate, mix } from 'popmotion'
import { changingSceneParamHandlers, getCurrentSceneParams } from '@/three'
import type { ChangingSceneParams } from './types'

let animation: { stop: () => void }
const animationRange = 1000
const animationSceneDefaults: ChangingSceneParams = {
  planeRotationY: 0,
  planeRotationX: 0,
  planePositionX: 0,
  planePositionY: 0,
  lightPositionX: 0,
  lightPositionZ: 20,
  lightDistance: 100,
  noiseDisplacementScale: 0,
  noiseTimeCoef: 1 / 4000,
  noiseFrequencyCoef: 0,
  cameraFov: 45,
}

function animateScene (to: Partial<ChangingSceneParams>) {
  animation?.stop()

  const from = getCurrentSceneParams()

  animation = animate({
    from: 0,
    to: animationRange,
    type: 'spring',
    mass: 1,
    damping: 100,
    stiffness: 300,
    velocity: 1000,
    onUpdate: (latest) => {
      const progress = latest / animationRange
      for (const property in from) {
        const animationParam = property as keyof ChangingSceneParams
        const newValue = mix(
          from[animationParam], 
          to[animationParam] ?? animationSceneDefaults[animationParam], 
          progress,
        )
        changingSceneParamHandlers[animationParam](newValue)
      }
    },
  })
}

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