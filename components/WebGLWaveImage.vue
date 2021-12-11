<template>
    <div
        ref="container"
        class="scene-container"
    >     
    </div>
</template>

<script>
import gsap from 'gsap';
import glsl from 'glslify';

import vertexShader from '@/assets/webgl/shaders/vertex.glsl';
import fragmentShader from '@/assets/webgl/shaders/fragment.glsl';

export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    methods: {
        async initMesh() {
            this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1000, 1000);

            this.material = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture: { value: 0 },
                    uTime:    { value: 0 },
                    uMouse:  { value: [1, 1] },
                },
                vertexShader: glsl(vertexShader),
                fragmentShader: glsl(fragmentShader),
            });

            const texture = await this.loadTexture(this.src);
            this.material.uniforms.uTexture.value = texture;

            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.$webgl.scene.add(this.mesh);
        },        
        loadTexture(src) {
            const loader = new THREE.TextureLoader();
            return new Promise((resolve, reject) => {
                loader.load(
                    src,
                    (texture) => {
                        texture.minFilter = THREE.LinearFilter;
                        texture.generateMipmaps = false;
                        resolve(texture)
                    },
                    undefined,
                    (err) => {
                        console.error('An error happened.', err)
                    }
                );
            });
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
        initResize() {
            gsap.fromTo(this.mesh.scale, {
                x: 0,
                y: 0
            }, {
                x: this.$webgl.viewsize.width * 0.8,
                y: this.$webgl.viewsize.height * 0.8,
                duration: 5,
                delay: 0.75,
                ease: 'power3.out'
            });
        },

        updateTime(time) {
            this.material.uniforms.uTime.value = time;
        },
        updateMouse(mouse) {
            this.material.uniforms.uMouse.value = [
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
        this.positionate();
        this.initResize();

        this.$webgl.appendToDom(this.$refs.container);
        this.$events.$on('viewport:resize', this.onResize);
        requestAnimationFrame(this.onTick);
    },
    async created() {
        
    },
    beforeDestroy() {
        cancelAnimationFrame(this.reqFrame);        
        this.$webgl.clearScene();
        this.$events.$off('viewport:resize', this.onResize);
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