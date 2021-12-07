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
import Lines from '@/assets/svg/pencil-lines.svg';
import gsap from 'gsap';

const MAX_MOVE = 20;

export default {
    components: {
        Lines
    },
    methods: {
        getMovePosition() {            
            return {
                x: MAX_MOVE * this.moveFunction(this.$mouse.normalized.x),
                y: MAX_MOVE * this.moveFunction(this.$mouse.normalized.y)
            }
        },
        moveFunction(num) {
            const sign = Math.sign(num);

            return (1 - Math.pow(1 - Math.abs(num), 2)) * sign;
        },
        doMove() {
            const movePos = this.getMovePosition();
            gsap.to('.sennery', {
                ...movePos,
                stagger: 0.01,
            });
        }
    },
    mounted() {
        this.$events.$on('mouse:mousemove', this.doMove);
    },
    beforeDestroy() {
        gsap.killTweensOf('.sennery');
        this.$events.$off('mouse:mousemove', this.doMove);
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