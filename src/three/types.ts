export interface InitSceneParams {
  container: HTMLElement | null
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