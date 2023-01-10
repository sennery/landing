import { ref } from 'vue'
import { animate } from 'popmotion'

interface IntersectAnimationParams {
  stiffness?: number 
  damping?: number
  mass?: number
  velocity?: number
}

export function useIntersectAnimation ({ stiffness = 160, damping = 15, mass = 1, velocity = 0 }: IntersectAnimationParams = {}) {
  const animationProgress = ref(0)

  let animation: { stop: () => void }
    
  function onIntersect ([{ isIntersecting }]: Array<{ isIntersecting: boolean }>) {
    animation?.stop()
    animation = animate({
      from: animationProgress.value,
      to: isIntersecting ? 1 : 0,
      type: 'spring',
      stiffness,
      damping,
      mass,
      velocity,
      onUpdate: latest => animationProgress.value = latest,
    })
  }

  return { animationProgress, onIntersect }
}