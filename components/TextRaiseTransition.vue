<template>
    <transition 
        name="text-raising"
        appear
    >
        <div
            class="text-raising-wrapper"
            :style="{
                '--text-raising-duration': duration + 's',
                '--text-raising-delay': delay + 's',
                display: mode
            }"
        >
            <slot></slot>
        </div>        
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
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/theme.scss";

.text-raising-wrapper {
    overflow: hidden;
}

.text-raising-enter-active,
.text-raising-leave-active,
.text-raising-enter-active.text-raising-wrapper > *,
.text-raising-leave-active.text-raising-wrapper > * {
    transition: transform var(--text-raising-duration) var(--text-raising-delay) $timing-text;
}

.text-raising-enter.text-raising-wrapper > *,
.text-raising-leave.text-raising-wrapper > * {
    transform: translate(5%,100%);
}
</style>