import Vue from 'vue';
import { events } from './events';

const viewport = new Vue({
    data() {
        return {
            width: document.documentElement.clientWidth || document.body.clientWidth,
            height: Math.min(window.innerHeight, document.documentElement.clientHeight),
        }
    },
    computed: {
        ratio() {
            return this.width / this.height;
        }
    },
    methods: {
        onWindowResize() {
            this.width = document.documentElement.clientWidth || document.body.clientWidth;
            this.height = Math.min(window.innerHeight, document.documentElement.clientHeight);

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
  
export { viewport };

export default (context, inject) => {
    inject('viewport', viewport);
};