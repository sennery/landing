<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init } from '@/composables/three'

const webgl = ref<HTMLElement | undefined>(undefined)

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
  top: 0;
  left: 0;
  height: 100vh !important;
}
</style>