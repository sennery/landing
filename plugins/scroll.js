import Vue from 'vue';
import gsap from 'gsap';
import { events } from './events';
import { viewport } from './viewport';

const scroll = new Vue({
    data() {
        return {
            baseScroll: 15,
            cooldown: false,

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
            this.cooldown = true;
        },
        onComplete() {
            if (this.breakpoint <= this.scroll) {
                this.onBreakpoint();
            }
            this.scroll = 0;
            this.tween = gsap.to(this, {
                duration: 1,
                delay: this.cooldown ? 0.75 : 0,
                lerpedScroll: this.scroll,
                ease: 'expo.out',
                onComplete: () => { this.cooldown = false }
            });
        },
        onScroll(e) {
            if (this.breakpoint <= this.scroll || this.cooldown) {
                return;
            }

            if (e.changedTouches && e.changedTouches.length) {
                const changedToucheY = e.changedTouches[0].pageY;
                this.scroll += changedToucheY < this.baseScroll 
                    ? changedToucheY 
                    : this.baseScroll;
            } else {                
                this.scroll += this.baseScroll;
            }               

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