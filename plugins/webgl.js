import { events } from './events';
import { viewport } from './viewport';

class WebGL {
    constructor() {
        // clock
        this.clock = new THREE.Clock();
    
        // scene
        this.scene = new THREE.Scene();
    
        //camera
        this.camera = new THREE.PerspectiveCamera(
            70,
            viewport.ratio,
            0.1,
            100
        );    

        // this.camera = new THREE.OrthographicCamera(
        //     viewport.width / -2,
        //     viewport.width / 2,
        //     viewport.height / 2,
        //     viewport.height / -2,
        //     -10000,
        //     10000
        //   )

        this.camera.position.z = 50;
    
        // renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            premultipliedAlpha: false,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(viewport.width, viewport.height);
        this.renderer.setPixelRatio(1);
    
        // events
        events.$on('viewport:resize', this.onWindowResize);
    }
    
    loop = () => {
        console.log(this.scene.children.length)
        this.renderer.render(this.scene, this.camera);
        this.reqFrame = requestAnimationFrame(this.loop);
    }

    onWindowResize = () => {
        if (this.camera.type === 'PerspectiveCamera') {
            this.camera.aspect = viewport.ratio;        
        } else if (this.camera.type === 'OrthographicCamera') {
            this.camera.left = viewport.width / -2;
            this.camera.right = viewport.width / 2;
            this.camera.top = viewport.height / 2;
            this.camera.bottom = viewport.height / -2;
        }
        this.camera.updateProjectionMatrix();        
        this.renderer.setSize(viewport.width, viewport.height);
    }
    
    appendToDom(container) {
        container.appendChild(this.renderer.domElement);
        requestAnimationFrame(this.loop);
    }
    
    get viewsize() {
        let width, height
        if (this.camera.type === 'PerspectiveCamera') {
            const distance = this.camera.position.z;
            const vFov = (this.camera.fov * Math.PI) / 180;
            height = 2 * Math.tan(vFov / 2) * distance;
            width = height * this.camera.aspect;
        } else if (this.camera.type === 'OrthographicCamera') {
            width = viewport.width;
            height = viewport.height;
        }
    
        return { width, height };
    }
    
    clearScene() {
        cancelAnimationFrame(this.reqFrame);
        this.scene.children = [];

        console.log(this);
    }
}

export default (context, inject) => {
    inject('webgl', new WebGL());
}

    