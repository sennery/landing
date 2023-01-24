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

  function onIntersect ([{ isIntersecting }]: IntersectionObserverEntry[]) {
    animation?.stop()
    animation = animate({
      from: animationProgress.value * 100,
      to: isIntersecting ? 100 : 0,
      type: 'spring',
      stiffness,
      damping,
      mass,
      velocity,
      onUpdate: latest => animationProgress.value = latest / 100,
    })
  }

  return { animationProgress, onIntersect }
}
