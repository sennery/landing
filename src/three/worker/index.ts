import { init, onWindowResize } from './main'
import { animateScene } from './animations'
import type { MessageData } from '../types'

const messageByTypeHandlers: Record<string, (arg: any) => void> = {
  init,
  onWindowResize,
  animateScene,
}

self.onmessage = ({ data }: MessageEvent<MessageData>) => {
  messageByTypeHandlers[data.type](data.payload)
}