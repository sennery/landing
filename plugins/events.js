import Vue from 'vue';

const events = new Vue();

export { events };

export default (context, inject) => {
    inject('events', events);
};