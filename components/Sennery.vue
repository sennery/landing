<template>
    <div class="container">        
        <!-- <div class="part">
            <Lines class="lines"/>    
        </div> -->
        <div class="part">
            <span class="sennery">SENNERY</span>
        </div>
        <div class="part">
            <span class="sennery">SENNERY</span>
        </div>
        <div class="part">
            <span class="sennery">SENNERY</span>
        </div>
    </div>
</template>

<script>
import Lines from '@/assets/images/pencil-lines.svg';
import { gsap } from 'gsap';

const MAX_MOVE = 20;

export default {
    data() {
        return {
        }
    },
    components: {
        Lines
    },
    computed: {
        windowSize() {
            return { 
                x: window.innerWidth,
                y: window.innerHeight
            }
        },
    },
    methods: {
        getMovePosition({clientX, clientY}) {
            const { x, y } = this.windowSize;

            const distanceFromCenterX = clientX*(2/x) - 1;
            const distanceFromCenterY = clientY*(2/y) - 1;
            
            return {
                x: MAX_MOVE * this.moveFunction(distanceFromCenterX),
                y: MAX_MOVE * this.moveFunction(distanceFromCenterY)
            }
        },
        moveFunction(num) {
            const sign = Math.sign(num);

            return (1 - Math.pow(1 - Math.abs(num), 2)) * sign;
        },
        doMove(event) {
            const movePos = this.getMovePosition(event);
            gsap.to('.sennery', {
                ...movePos,
                stagger: 0.01,
            });
            // gsap.to('.lines', {
            //     x: movePos.x * 0.5,
            //     y: movePos.y * 0.5,
            //     scale: movePos.x * 0.5
            // });
        }
    },
    mounted() {
        document.addEventListener('mousemove', this.doMove);
    },
    destroyed() {
        console.log('destroyed');
        gsap.killTweensOf('.sennery');
        document.removeEventListener('mousemove', this.doMove); 
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    height: 15%;
    font-size: 15em;
    margin-top: 10vh;

    .part {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-50%);
    }

    .part:nth-child(2) {
        color: #f0f;
    }

    .part:nth-child(1) {
        color: #0ff;
    }
}
</style>