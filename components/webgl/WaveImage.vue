<template>
    <div
        ref="container"
        class="scene-container"
    >     
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    methods: {
        async initMesh() {
            this.mesh = await this.$webglAssets.getMesh('waveImage');
            this.$webgl.scene.add(this.mesh);
        },

        positionate() {
            this.mesh.position.set(0, 0, 0);
        },
        resize() {
            this.mesh.scale.set(
                this.$webgl.viewsize.width * 0.8,
                this.$webgl.viewsize.height * 0.8,
                1
            );
        },
        onResize() {
            this.positionate();
            this.resize();
        },
        animateMeshAppearance() {
            gsap.fromTo(this.mesh.scale, {
                x: 0,
                y: 0
            }, {
                x: this.$webgl.viewsize.width * 0.8,
                y: this.$webgl.viewsize.height * 0.8,
                duration: 5,
                delay: 0.75,
                ease: 'power3.out',
                onComplete: () => {                     
                    this.$events.$on('viewport:resize', this.onResize);
                }
            });
        },

        updateTime(time) {
            this.mesh.material.uniforms.uTime.value = time;
        },
        updateMouse(mouse) {
            this.mesh.material.uniforms.uMouse.value = [
                mouse.x,
                mouse.y
            ];
        },
        onTick() {
            const elapsed = this.$webgl.clock.getElapsedTime();
            this.updateTime(elapsed);
            this.updateMouse(this.$mouse.lerpedNormalized);
            this.reqFrame = requestAnimationFrame(this.onTick);
        }
    },
    async mounted() {
        await this.initMesh();
        this.animateMeshAppearance();

        this.$webgl.appendToDom(this.$refs.container);
        
        requestAnimationFrame(this.onTick);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.reqFrame);        
        this.$webgl.clearScene();
        this.$events.$off('viewport:resize', this.onResize);
        gsap.killTweensOf(this.mesh.scale);
    }
}
</script>

<style lang="scss">
canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>