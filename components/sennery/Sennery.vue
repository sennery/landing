<template>
    <div class="wrapper">        
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
            <h1 class="sennery">SENNERY</h1>
        </div>
    </div>
</template>

<script>
import Lines from '@/assets/svg/pencil-lines.svg';

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
            GSAP.to('.sennery', {
                ...movePos,
                stagger: 0.01,
            });
        }
    },
    mounted() {
        this.$events.$on('mouse:mousemove', this.doMove);
    },
    beforeDestroy() {
        GSAP.killTweensOf('.sennery');
        this.$events.$off('mouse:mousemove', this.doMove);
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.wrapper {
    position: relative;
    height: 1em;
    font-size: 15em;
    z-index: 1;

    .part {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .part:nth-child(2) {
        color: #f0f;
    }

    .part:nth-child(1) {
        color: #0ff;
    }
}

@media (max-width: $breakpoint-laptop) {
    .wrapper {
        font-size: 10em;
    }
}

@media (max-width: $breakpoint-mobile) {
    .wrapper {
        font-size: 4em;
        
        .part {
            justify-content: flex-start;
        }
    }
}
</style>