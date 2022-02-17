<template>
    <div
        class="slider"
        :style="{
            'border-radius': borderRadius.second + '%' + '0px 0px ' + borderRadius.second + '%'
        }"
    >              
    </div>
</template>

<script>
import gsap from 'gsap';

const MAX_BORDER_RADIUS = 50;
const MAX_SKEW = 10;

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
            gsap.to('.slider', {
                duration: this.duration / 5,
                skewX: (1 - mouse) / 2 * MAX_SKEW,
            });
            this.reqFrame = requestAnimationFrame(this.onTick);
        }
    },
    mounted() {
        requestAnimationFrame(this.onTick);
    },
    beforeDestroy() {
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
    left: 70%;
    z-index: -1;
    overflow: hidden;

    min-height: 100vh;
    min-width: 40vw;

    transform-origin: 50% 50%;
    background: $color-underscore;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 25%), 
        0px 3px 4px 0px rgb(0 0 0 / 20%), 
        0px 1px 8px 0px rgb(0 0 0 / 18%);
}

@media (max-width: $breakpoint-mobile) {
    .slider {
        display: none;
    }
}
</style>