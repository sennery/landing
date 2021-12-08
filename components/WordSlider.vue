<template>
    <div
        class="slider"
        :style="{
            'border-radius': borderRadius.first + '%' + borderRadius.second + '%' 
        }"
    >
        <div
            class="elem-wrapper"
        >
            <span
                class="slider-elem"
                v-for="i in 2"
                :key="i"
            >
                about me
            </span>
        </div>                
    </div>
</template>

<script>
import gsap from 'gsap';

const MAX_BORDER_RADIUS = 50;
const MAX_SKEW_Y = 10;

export default {
    data() {
        return {
            duration: 10,
            borderRadius: {
                first: 0,
                second: 0
            }
        }
    },
    methods: {
        onTick() {            
            const mouse = this.$mouse.lerpedNormalized.x;

            this.borderRadius.first = mouse > 0 ? mouse * MAX_BORDER_RADIUS : 0;
            this.borderRadius.second = mouse < 0 ? Math.abs(mouse * MAX_BORDER_RADIUS) : 0;

            this.tween?.kill();
            this.tween = gsap.to('.slider', {
                duration: this.duration / 5,
                skewX: 0,
                skewY: mouse * MAX_SKEW_Y
            })
            this.reqFrame = requestAnimationFrame(this.onTick);
        }
    },
    mounted() {
        gsap.from('.slider-elem', {
            x: this.$viewport.height * 2,
            duration: this.duration,
            stagger: {
                each: this.duration / 2,
                repeat: -1
            },
            ease: 'linear'
        });

        requestAnimationFrame(this.onTick);
    },
    beforeDestroy() {
        gsap.killTweensOf('.slider-elem');
        gsap.killTweensOf('.slider');
        cancelAnimationFrame(this.reqFrame);
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.slider {
    position: absolute;
    top: 0;
    left: 90%;

    min-width: 100vh;
    min-height: 1.2em;

    transform: rotateZ(90deg);
    transform-origin: 0 0;

    border: solid $color-text-secondary;
    border-width: 2px 0;
    border-radius: 50% 0;
}

.elem-wrapper {
    position: relative;

    .slider-elem {
        color: $color-text-secondary;
        position: absolute;
        left: -100%;
    }
}
</style>