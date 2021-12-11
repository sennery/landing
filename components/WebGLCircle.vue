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
    props: {
        src: {
            type: String,
            required: true
        }
    },
    methods: {
        initLight() {
            this.light1 = this.createSpotLight({
                color: 0xda055a,
                intensity: 0.5,
                position: {
                    x: 0,
                    y: 50,
                    z: 50
                },
                castShadow: true
            });
            this.light2 = this.createSpotLight({
                color: 0x634aef,
                intensity: 1,
                position: {
                    x: 0,
                    y: -10,
                    z: 50
                },
                castShadow: true
            });
            
            this.$webgl.scene.add(this.light1, this.light2);
        },
        createSpotLight({color, intensity, position, castShadow}) {
            const light = new THREE.SpotLight(color, intensity);
            light.position.set(position.x, position.y, position.z);

            if (castShadow) {
                light.castShadow = true;

                light.shadow.mapSize.width = 1024;
                light.shadow.mapSize.height = 1024;

                light.shadow.camera.near = 500;
                light.shadow.camera.far = 4000;
                light.shadow.camera.fov = 30;
            }
            return light;            
        },

        initMesh() {
            this.meshGroup = new THREE.Group();

            this.mesh1 = this.createSphereMesh({
                radius: 1,
                textureColor: 0xffffff
            });
            this.mesh2 = this.createSphereMesh({
                radius: 0.1,
                textureColor: 0xffffff,
                position: {
                    x: 0,
                    y: 0,
                    z: 1.75
                }
            });

            this.meshGroup.add(this.mesh1, this.mesh2);
            this.$webgl.scene.add(this.meshGroup);
        },
        createSphereMesh({radius, textureColor, position = { x:0, y:0, z:0 }}) {
            const geometry = new THREE.SphereGeometry(radius, 100, 100);
            const material = new THREE.MeshPhysicalMaterial({
                color: textureColor
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(position.x, position.y, position.z);
            
            return mesh;
        },

        updateMouse(mouse) {
            this.light1.position.set(
                mouse.x * 50,
                50 + mouse.y * 50
            );
            this.meshGroup.scale.set(
                10 * (2.5 - (Math.abs(mouse.x) + Math.abs(mouse.y))),
                10 * (2.5 - (Math.abs(mouse.x) + Math.abs(mouse.y))),
                10 * (2.5 - (Math.abs(mouse.x) + Math.abs(mouse.y)))
            );
            this.mesh2.position.set(
                mouse.x,
                mouse.y
            );
        },
        onTick() {
            this.updateMouse(this.$mouse.lerpedNormalized);
            this.reqFrame = requestAnimationFrame(this.onTick);
        }
    },
    mounted() {
        this.initLight();
        this.initMesh();

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
canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>