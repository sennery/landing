export interface InitSceneParams {
  canvas: HTMLCanvasElement | null
}

export interface InitSceneParamsWorker {
  canvas: OffscreenCanvas
  width: number
  height: number
  ratio: number
}

export interface ChangingSceneParams {
  planeRotationY: number
  planeRotationX: number
  planePositionX: number
  planePositionY: number
  lightPositionX: number
  lightPositionZ: number
  lightDistance: number
  noiseDisplacementScale: number
  noiseFrequencyCoef: number
  noiseTimeCoef: number
  cameraFov: number
}
  
export type ChangingSceneHandlers<Type> = {
  [Property in keyof Type]: (val: Type[Property]) => void
}

export interface WindowResizeParams {
  width: number
  height: number
}

export interface MessageData {
  type: string
  payload: any
}