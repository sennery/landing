import Vue from 'vue';
import gsap from 'gsap';
import { events } from './events';
import { viewport } from './viewport';

const scroll = new Vue({
    data() {
        return {
            scroll: 0,
            lerpedScroll: 0,

            breakpoint: 100
        }
    },
    computed: {
        normalized() {
            return this.scroll / this.breakpoint;
        },
        lerpedNormalized() {
            return this.lerpedScroll / this.breakpoint;
        }
    },
    created() {    
        requestAnimationFrame(this.loop);

        addEventListener('touchmove', this.onScroll, false);
        addEventListener('wheel', this.onScroll, false);
    },
    beforeDestroy() {
        removeEventListener('touchmove', this.onScroll);
        removeEventListener('wheel', this.onScroll);
    },
    methods: {
        loop() {
            requestAnimationFrame(this.loop);
        },
        onBreakpoint() {
            events.$emit('scroll:breackpoint');
        },
        onComplete() {
            if (this.breakpoint <= this.scroll) {
                this.onBreakpoint();
            }
            this.scroll = 0;
            this.tween = gsap.to(this, {
                duration: 1,
                lerpedScroll: this.scroll,
                ease: 'expo.out'
            });
        },
        onScroll() {
            if (this.breakpoint <= this.scroll) {
                return;
            }
            this.scroll += 10;

            events.$emit('scroll:scroll');

            this.tween?.kill();
            this.tween = gsap.to(this, {
                duration: 0.5,
                lerpedScroll: this.scroll,
                ease: 'expo.out',
                onComplete: () => this.onComplete()
            });
        }
    }
});

export { scroll };

export default (context, inject) => {
    inject('scroll', scroll);
}; 