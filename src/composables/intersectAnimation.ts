import { ref } from 'vue'
import { animate } from 'popmotion'

export function useIntersectAnimation () {
  const animationProgress = ref(0)

  let animation: { stop: () => void }
    
  function onIntersect ([{ isIntersecting }] : Array<{ isIntersecting: boolean }>) {
    animation?.stop()
    animation = animate({
      from: animationProgress.value,
      to: isIntersecting ? 1 : 0,
      type: 'spring',
      onUpdate: latest => animationProgress.value = latest
    })
  }

  return { animationProgress, onIntersect }
}