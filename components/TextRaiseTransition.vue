<template>
    <transition 
        name="text-raising"
        appear
    >
        <span
            class="text-raising-wrapper"
            :style="{
                '--text-raising-duration': duration + 's',
                '--text-raising-delay': delay + 's',
                '--text-raising-translate-x': translate.x + '%',
                '--text-raising-translate-y': translate.y + '%',                
                '--text-raising-overflow-hidden': overflowHidden ? 'hidden' : '',
                '--text-raising-rotate-x': rotate.x + 'deg',
                '--text-raising-rotate-y': rotate.y + 'deg', 
                display: mode
            }"
        >
            <slot></slot>
        </span>        
    </transition>
</template>

<script>
export default {
    props: {
        duration: {
            type: Number,
            default: 0.75
        },
        delay: {
            type: Number,
            default: 0
        },
        mode: {
            type: String,
            default: 'block'
        },
        translate: {
            type: Object,
            default() {
                return {
                    x: 0,
                    y: 100
                }   
            }
        },
        overflowHidden: {
            type: Boolean,
            default: true
        },
        rotate: {
            type: Object,
            default() {
                return {
                    x: 0,
                    y: 0
                }   
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/theme.scss";

.text-raising-wrapper {
    overflow: var(--text-raising-overflow-hidden);
}

.text-raising-enter-active,
.text-raising-leave-active,
.text-raising-enter-active.text-raising-wrapper > *,
.text-raising-leave-active.text-raising-wrapper > * {
    transition: transform var(--text-raising-duration) var(--text-raising-delay) $timing-text;
}

.text-raising-enter.text-raising-wrapper > *,
.text-raising-leave.text-raising-wrapper > * {
    transform: translate(var(--text-raising-translate-x), var(--text-raising-translate-y)) 
        rotateX(var(--text-raising-rotate-x))
        rotateY(var(--text-raising-rotate-y)) !important;
}
</style>