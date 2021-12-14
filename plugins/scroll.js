import Vue from 'vue';
import gsap from 'gsap';
import { events } from './events';
import { viewport } from './viewport';

const scroll = new Vue({
    data() {
        return {
            baseScroll: 50,
            cooldown: false,

            scroll: 0,
            lerpedScroll: 0,

            lastTouch: 0,

            breakpoint: {
                low: -100,
                hight: 100
            }
        }
    },
    computed: {
        normalized() {
            return this.scroll / this.breakpoint.hight;
        },
        lerpedNormalized() {
            return this.lerpedScroll / this.breakpoint.hight;
        }
    },
    created() {
        this.clamper = gsap.utils.clamp(
            -this.baseScroll,
            this.baseScroll
        );    
        
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
            console.log(this.lerpedNormalized)
            requestAnimationFrame(this.loop);
        },
        onBreakpoint(isNext) {
            events.$emit('scroll:breackpoint', isNext);            
            this.cooldown = true;
        },
        onComplete() {
            if (this.breakpoint.hight <= this.scroll) {
                this.onBreakpoint(true);
            } else if (this.breakpoint.low >= this.scroll) {
                this.onBreakpoint(false);
            }
            this.scroll = 0;
            this.tween = gsap.to(this, {
                duration: 1,
                lerpedScroll: this.scroll,
                ease: 'expo.out',
                onComplete: () => { this.cooldown = false }
            });
        },
        onScroll(e) {
            console.log(e)
            if (this.breakpoint.hight <= this.scroll
                || this.breakpoint.low >= this.scroll
                || this.cooldown) {
                return;
            }

            const touches = e.changedTouches;
            if (touches && touches.length) {
                const changedToucheY = touches[0].pageY - this.lastTouch;
                this.lastTouch = touches[0].pageY;
    
                this.scroll -= this.clamper(changedToucheY);
            } else {                
                this.scroll -= this.baseScroll * Math.sign(e.wheelDeltaY);
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