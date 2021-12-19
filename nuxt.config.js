import webpack from 'webpack';

const title = 'Arsenii Likhachev';
const description = 'Hello! My name is Arsenii Likhachev, i\'m a web developer from Russia.';

export default {
    target: process.env.GH_PAGES ? 'static' : 'server',

    router: {
        base: process.env.GH_PAGES ? '/landing/' : ''
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: title,
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
            { hid: 'description', name: 'description', content: description },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'msapplication-TileColor', content: '#17181c' },
            { name: 'theme-color', content: '#ffffff' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
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
        { src: '~/plugins/scroll.js', mode: 'client' },
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
    },

    // pageTransition: {
    //     mode: ''
    // }
}
