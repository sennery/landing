<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from '@/three'

const canvas = ref<HTMLCanvasElement | null>(null)
onMounted(() => init({ canvas: canvas.value }))
</script>

<template>
  <div class="webgl">
    <canvas ref="canvas" />
  </div>
</template>

<style>
.webgl {
  position: relative;
  z-index: -999;
}

.webgl > canvas {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100lvh !important;
}
</style>
