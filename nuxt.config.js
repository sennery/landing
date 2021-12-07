import webpack from 'webpack';

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'landing',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/reset.css',
        '@/assets/css/inject.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/events.js', mode: 'client' },
        { src: '~/plugins/viewport.js', mode: 'client' },
        { src: '~/plugins/mouse.js', mode: 'client' },
        { src: '~/plugins/webgl.js', mode: 'client' },
      ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        'nuxt-svg-loader',
    ],

    svgLoader: {
        svgoConfig: {
            plugins: [
                { cleanupIDs: false },
                { prefixIds: false } // Disables prefixing for SVG IDs
            ]
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, ctx) {
            config.plugins.push(new webpack.ProvidePlugin({ THREE: 'three' }));
            config.module.rules.push({
                test: /\.(glsl|vs|fs)$/,
                use: [
                    require.resolve('raw-loader'),
                    require.resolve('glslify-loader'),
                ]
            });
          },
    }
}
