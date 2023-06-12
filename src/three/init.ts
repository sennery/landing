import MyWorker from './worker?worker'
import type { InitSceneParams } from './types'

export let worker: Worker

export function init ({ canvas }: InitSceneParams) {
  worker = new MyWorker()
  const offscreenCanvas = canvas?.transferControlToOffscreen()
  worker.postMessage({
    type: 'init',
    payload: {
      canvas: offscreenCanvas,
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio,
    },
  }, [offscreenCanvas] as Transferable[])

  window.addEventListener('resize', onWindowResize)  
}

function onWindowResize () {
  worker.postMessage({
    type: 'onWindowResize',
    payload: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  })
}