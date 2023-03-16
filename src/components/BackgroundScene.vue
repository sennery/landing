<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from '@/three'

const webgl = ref<HTMLElement | null>(null)

onMounted(() => init({ container: webgl.value }))
</script>

<template>
  <div
    ref="webgl"
    class="webgl"
  />
</template>

<style>
.webgl {
  z-index: -999;
}

.webgl > canvas {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100vh !important;
}
</style>
