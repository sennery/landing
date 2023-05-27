import './assets/css/main.css'

import { ViteSSG } from 'vite-ssg/single-page'
import type { Component } from 'vue'
import App from './App.vue'

export const createApp = ViteSSG(App as Component)
