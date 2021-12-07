import Vue from 'vue';

const events = new Vue();

Vue.prototype.$events = events;

export default events;