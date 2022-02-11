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
                    x: 25,
                    y: 0,
                    z: 50
                },
                castShadow: true
            });
            this.light2 = this.createSpotLight({
                color: 0x634aef,
                intensity: 1,
                position: {
                    x: -25,
                    y: -50,
                    z: 100
                },
                //castShadow: true
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

                light.shadow.camera.near = 0.5;
                light.shadow.camera.far = 500;
                light.shadow.camera.fov = 90;
                light.shadow.camera.focus = 0.1;
            }
            return light;            
        },

        initMesh() {
            this.meshGroup = new THREE.Group();
            this.meshGroup2 = new THREE.Group();
            this.meshGroup3 = new THREE.Group();

            this.mainSphere = this.createSphereMesh({
                radius: 15,
                castShadow: true
            });
            this.sphere2 = this.createSphereMesh({
                radius: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 18
                },
                receiveShadow: true,
            });
            this.sphere3 = this.createSphereMesh({
                radius: 3.5,
                position: {
                    x: 0,
                    y: 0,
                    z: 23
                },
                receiveShadow: true,
            });
            this.sphere4 = this.createSphereMesh({
                radius: 3,
                position: {
                    x: 0,
                    y: 0,
                    z: 30
                },
                receiveShadow: true,
            });

            this.meshGroup.add(this.mainSphere, this.sphere2);
            this.meshGroup2.add(this.meshGroup, this.sphere3);
            this.meshGroup3.add(this.meshGroup2, this.sphere4);
            this.$webgl.scene.add(this.meshGroup3);
        },
        createSphereMesh({radius, textureColor = new THREE.Color(0xffffff), position = { x:0, y:0, z:0 }, receiveShadow = false, castShadow = false}) {
            const geometry = new THREE.SphereGeometry(radius, 100, 100);
            const material = new THREE.MeshPhysicalMaterial({
                reflectivity: 0.0,
                transmission: 0.0,
                roughness: 1.0,
                metalness: 0.0,
                clearcoat: 0.0,
                clearcoatRoughness: 0.0,
                color: textureColor,
                ior: 1.2,
                thickness: 10.0
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = castShadow;
            mesh.receiveShadow = receiveShadow;
            mesh.position.set(position.x, position.y, position.z);
            
            return mesh;
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