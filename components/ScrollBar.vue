<template>
    <div
        class="wrapper"
    >
        <div 
            class="container"
        >
            <div
                class="scroll-bar"
            >            
            </div>
        </div>
        
        <div
            class="scroll-to"
        >
            <span>{{ link.name }}</span>
        </div>        
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        link: {
            type: Object,
            default: () => {
                return {
                    name: 'index',
                    path: '/'
                }
            }
        }
    },
    methods: {
        onBreakpoint() {
            this.$router.push({
                path: this.link.path
            });
        },

        updateScroll(scroll) {
            gsap.set('.scroll-bar', {
                y: -this.$viewport.height * (1 - scroll) * 0.65
            });
            gsap.set('.scroll-to', {
                y: -this.$viewport.height * (1 - scroll) * 0.55,
                opacity: scroll
            });
        },
        loop() {
            this.updateScroll(this.$scroll.lerpedNormalized);
            this.reqFrame = requestAnimationFrame(this.loop);
        }
    },
    mounted() {
        this.$events.$on('scroll:breackpoint', this.onBreakpoint);
        requestAnimationFrame(this.loop);
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.wrapper {
    width: 100%;
    height: 70vh;

    .container {
        width: 100%;
        height: 100%;        
        overflow: hidden;
    }

    .scroll-bar {
        position: relative;
        margin: auto;
        width: 2px;
        height: 95%;
        margin-bottom: 1em;
        background-color: $color-text-secondary;

        transform: translateY(-97%);        

        &::before, &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: inherit;
            height: 1em;
            background-color: inherit;
            transform-origin: 0 100%;
        }

        &::before {
            transform: rotateZ(-30deg);
        }

        &::after {
            transform: rotateZ(30deg);
        }
    }

    .scroll-to {
        display: flex;
        //color: $color-text-secondary;
        opacity: 0;

        span {
            margin: auto;
        }
    }
}
</style>