import gsap from 'gsap';
import glsl from 'glslify';

import vertexShader from '@/assets/webgl/shaders/vertex.glsl';
import fragmentShader from '@/assets/webgl/shaders/fragment.glsl';

const meshes = {};
const lights = {};

function initWaveImageMesh(src) {
    const waveGeometry = new THREE.PlaneBufferGeometry(1, 1, 250, 250);
    const waveMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTexture: { value: 0 },
            uTime:    { value: 0 },
            uMouse:  { value: [1, 1] },
        },
        vertexShader: glsl(vertexShader),
        fragmentShader: glsl(fragmentShader),
    });

    loadTexture(src, waveMaterial);

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);

    return waveMesh;
}

function loadTexture(src, material) {
    const loader = new THREE.TextureLoader();
    loader.load(
        src,
        (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            material.uniforms.uTexture.value = texture;
        },
        undefined,
        (err) => {
            console.error('An error happened.', err)
        }
    );
}


function initCircleMeshes() {
    const mainSphere = createSphereMesh({
        radius: 15,
        castShadow: true
    });
    const sphere2 = createSphereMesh({
        radius: 2,
        position: {
            x: 0,
            y: 0,
            z: 18
        },
        receiveShadow: true,
    });
    const sphere3 = createSphereMesh({
        radius: 3.5,
        position: {
            x: 0,
            y: 0,
            z: 23
        },
        receiveShadow: true,
    });
    const sphere4 = createSphereMesh({
        radius: 3,
        position: {
            x: 0,
            y: 0,
            z: 30
        },
        receiveShadow: true,
    });

    return {
        mainSphere,
        sphere2,
        sphere3,
        sphere4
    }
}

function createSphereMesh({radius, textureColor = new THREE.Color(0xffffff), position = { x:0, y:0, z:0 }, receiveShadow = false, castShadow = false}) {
    const sphereGeometry = new  THREE.SphereGeometry(radius, 100, 100);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
        reflectivity: 0.0,
        transmission: 0.0,
        roughness: 1.0,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 1.5,
        color: textureColor,
        ior: 1.2,
        thickness: 10.0
    });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.castShadow = castShadow;
    sphereMesh.receiveShadow = receiveShadow;
    sphereMesh.position.set(position.x, position.y, position.z);
    
    return sphereMesh;
}


function initMeshes() {
    meshes.waveImage = initWaveImageMesh('images/wave-image-texture.jpg');
    meshes.circles = initCircleMeshes();    
    return meshes;
}

function initCirclesLight() {
    const light1 = createSpotLight({
        color: 0xda055a,
        intensity: 0.5,
        position: {
            x: 25,
            y: 0,
            z: 50
        },
        castShadow: true
    });
    const light2 = createSpotLight({
        color: 0x634aef,
        intensity: 1,
        position: {
            x: -25,
            y: -50,
            z: 100
        },
        //castShadow: true
    });

    return {
        light1,
        light2
    }
}

function createSpotLight({color, intensity, position, castShadow}) {
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
}

function initLights() {
    lights.circles = initCirclesLight();
    return lights;
}

function initAssets() {
    return {
        meshes: initMeshes(),
        lights: initLights()
    }
}

export default (context, inject) => {
    inject('webglAssets', initAssets());
}