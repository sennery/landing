<script setup lang="ts">
import { ref } from 'vue'
import { animate } from 'popmotion'
import { vIntersectionObserver } from '@vueuse/components'

let isName = ref(false)

const NAME = [
  { letter: 'A', id: 7 },
  { letter: 'r', id: 8 },
  { letter: 's', id: 0 },
  { letter: 'e', id: 1 },
  { letter: 'n', id: 2 },
  { letter: 'i', id: 9 },
  { letter: 'i', id: 10 },
  { letter: 'L', id: 999 },
  { letter: 'i', id: 11 },
  { letter: 'k', id: 12 },
  { letter: 'h', id: 13 },
  { letter: 'a', id: 14 },
  { letter: 'c', id: 15 },
  { letter: 'h', id: 16 },
  { letter: 'e', id: 17 },
  { letter: 'v', id: 18 },
]

const NICKNAME = [
  { letter: 's', id: 0 },
  { letter: 'e', id: 1 },
  { letter: 'n', id: 2 },
  { letter: 'n', id: 3 },
  { letter: 'e', id: 4 },
  { letter: 'r', id: 5 },
  { letter: 'y', id: 6 },
]

const name = ref(NICKNAME)

function switchName ([{ isIntersecting }]: Array<{ isIntersecting: boolean }>) {
  isName.value = isIntersecting
  name.value = isName.value ? NAME : NICKNAME
}

function onBeforeEnter(el: any) {
  el.style.transform = `rotateY(90deg)`
}

function onEnter(el: any, done: () => void) {
  animate({
    from: 0,
    to: 1,
    type: 'spring',
    elapsed: -10 * el.dataset.index,
    onUpdate: latest => el.style.transform = `rotateY(${latest * 90 - 90}deg)`,
    onComplete: done
  })
}

function onLeave(el: any, done: () => void) {
  el.style.opacity = '0'
  done()
}
</script>

<template>
  <section
    v-intersection-observer="[switchName, { threshold: 0.9 }]" 
    class="section-title"
  >
    <div class="title">
      <TransitionGroup
        name="name"
        tag="h1"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >  
        <span 
          v-for="(letter, index) in name"
          :key="letter.id"
          :data-index="index"
          :class="{
            'surname-start': letter.id === 999 
          }"
        >
          {{ letter.letter }}
        </span>   
      </TransitionGroup>
      <h3 
        class="spec"
        :class="{ active: isName }"
      >
        web developer
      </h3>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  height: 100vh;
}

.section-title > .title > h1 {
  display: flex;
}

.surname-start {
  padding-left: 1.5rem;
}

.name-move, .spec {
  transition: all 0.6s cubic-bezier(0, 1, 0.18, 1);
}

.spec {
  opacity: 0;
  transform: translateX(2em);
}

.spec.active {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 800px) {
  .surname-start {
    padding-left: 0.5rem;
  }
}
</style>