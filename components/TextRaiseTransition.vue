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
                '--text-raising-transform-x': transform.x + '%',
                '--text-raising-transform-y': transform.y + '%',                
                '--text-raising-overflow-hidden': overflowHidden ? 'hidden' : '',
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
        transform: {
            type: Object,
            default: {
                x: 0,
                y: 100
            }
        },
        overflowHidden: {
            type: Boolean,
            default: true
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
    transform: translate(var(--text-raising-transform-x), var(--text-raising-transform-y)) !important;
}
</style>