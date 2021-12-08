import Vue from 'vue';
import events from './events';
import viewport from './viewport';
import gsap from 'gsap';

const mouse = new Vue({
    data() {
        return {
            hasMoved: false,
            position: {
                x: 0, 
                y: 0
            },
            lerpedPosition: {
                x: 0, 
                y: 0
            },
            lastLerpedPosition: {
                x: 0, 
                y: 0
            }
        }
    },
    computed: {
        normalized() {
            return {
                x: (this.position.x / viewport.width) * 2 - 1,
                y: (this.position.y / viewport.height) * 2 - 1
            }
        },
        lerpedNormalized() {
            return {
                x: (this.lerpedPosition.x / viewport.width) * 2 - 1,
                y: (this.lerpedPosition.y / viewport.height) * 2 - 1
            }
        },
        lerpedVelocity() {
            return {
                x: this.lerpedPosition.x - this.lastLerpedPosition.x,
                y: this.lerpedPosition.y - this.lastLerpedPosition.y
            }
        }
    },
    created() {    
        requestAnimationFrame(this.loop);
    
        addEventListener('touchstart', this.onMouseMove, false);
        addEventListener('touchmove', this.onMouseMove, false);
        addEventListener('mousemove', this.onMouseMove, false);
    },
    beforeDestroy() {    
        removeEventListener('touchstart', this.onMouseMove);
        removeEventListener('touchmove', this.onMouseMove);
        removeEventListener('mousemove', this.onMouseMove);
    },
    methods: {
        loop() {
            this.lastLerpedPosition = { ...this.lerpedPosition };
            requestAnimationFrame(this.loop);
        },
        onMouseMove(e) {
            if (e.changedTouches && e.changedTouches.length) {
                e.x = e.changedTouches[0].pageX;
                e.y = e.changedTouches[0].pageY;
            }

            if (e.x === undefined) {
                e.x = e.pageX;
                e.y = e.pageY;
            }

            const { x, y } = e;
        
            this.position = { x, y };
        
            events.$emit('mouse:mousemove');
        
            this.tween?.kill();
            this.tween = gsap.to(this.lerpedPosition, {
                duration: 3,
                x,
                y,
                ease: 'expo.out'
            });
        }
    }
});

Vue.prototype.$mouse = mouse;

export default mouse;