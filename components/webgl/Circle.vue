<template>
    <div
        ref="container"
        class="scene-container circle"
    >     
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    methods: {
        async initLight() {
            const lights = await this.$webglAssets.getLight('circles');
            this.light1 = lights.light1;
            this.light2 = lights.light2;
            
            this.$webgl.scene.add(this.light1, this.light2);
        },

        async initMesh() {
            const circleMeshes = await this.$webglAssets.getMesh('circles');
            console.log(circleMeshes)
            
            this.meshGroup = new THREE.Group();
            this.meshGroup.add(circleMeshes.mainSphere, circleMeshes.sphere2);
            
            this.meshGroup2 = new THREE.Group();
            this.meshGroup2.add(this.meshGroup, circleMeshes.sphere3);

            this.meshGroup3 = new THREE.Group();
            this.meshGroup3.add(this.meshGroup2, circleMeshes.sphere4);

            this.$webgl.scene.add(this.meshGroup3);
        },

        animateMeshAppearance() {
            gsap.fromTo(this.meshGroup3.scale, {
                x: 0,
                y: 0,
                z: 0
            }, {
                x: 1,
                y: 1,
                z: 1,
                delay: 0.5,
                duration: 0.75,
                ease: 'power3.out'
            });
        },

        updateMouse(mouse) {
            this.meshGroup3.position.set(
                mouse.x * 5,
                mouse.y
            );
            
            this.meshGroup3.rotation.z = -mouse.x * Math.PI / 4;
            this.meshGroup3.rotation.x = -mouse.y * Math.PI / 4;
        },
        updateAngle(time, mouse) {
            this.meshGroup.rotation.y = time / 1500;            
            this.meshGroup2.rotation.y = time / 1500;
            this.meshGroup3.rotation.y = (time + mouse.x * 1000)  / 1500;
        },
        onTick(time) {
            this.updateMouse(this.$mouse.lerpedNormalized);
            this.updateAngle(time, this.$mouse.lerpedNormalized);
            this.reqFrame = requestAnimationFrame(this.onTick);
        }
    },
    async mounted() {
        await this.initLight();
        await this.initMesh();       
        this.animateMeshAppearance(); 

        this.$webgl.appendToDom(this.$refs.container);

        requestAnimationFrame(this.onTick);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.reqFrame);
        this.$webgl.clearScene();
    }
}
</script>

<style lang="scss">
@import "@/assets/css/theme.scss";

canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}

.circle canvas{
    left: 25%;
}

@media (max-width: $breakpoint-mobile) {
    .circle canvas{
        left: 0;
    }
}
</style>