import Vue from 'vue';
import events from './events';

const viewport = new Vue({
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    computed: {
        ratio() {
            return this.width / this.height;
        }
    },
    methods: {
        onWindowResize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            const vh = this.height * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            events.$emit('viewport:resize', this.$data);

            return this.$data;
        }
    },
    created() {
        this.onWindowResize();
        addEventListener('resize', this.onWindowResize, false);
    },
    beforeDestroy() {
        removeEventListener('resize', this.onWindowResize);
    }
  });
  
  Vue.prototype.$viewport = viewport;
  
  export default viewport;