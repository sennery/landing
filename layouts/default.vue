<template>
    <div class="layout">
        <header
            class="links header"
        >            
            <NuxtLink
                :to="prevLink.path"
                class="link"
            > 
                {{prevLink.name}} 
            </NuxtLink>
            <span
                class="link menu"
                @click="showSidenav=!showSidenav"
            >
                menu
            </span>
        </header>

        <Nuxt
            class="page"
        />

        <footer
            class="links footer"
        >
            <NuxtLink
                :to="nextLink.path"
                class="link"
            > 
                {{nextLink.name}} 
            </NuxtLink>
        </footer>

        <NavigationMenu
            class="navigation"
            :enabled="showSidenav"
            :links="links"
            @disable="showSidenav=false"
        />
    </div>
</template>

<script>
import SLetter from '@/assets/svg/letter.svg';
export default {
    components: {
        SLetter
    },
    data() {
        return {
            showSidenav: false,

            links: [
                {
                    name: 'sennery',
                    path: '/'
                },
                // {
                //     name: 'works',
                //     path: '/works'
                // },
                {
                    name: 'about',
                    path: '/about'
                },
                {
                    name: 'contacts',
                    path: '/contacts'
                },
            ]
        }
    },
    computed: {
        currentLink() {
            return this.links.findIndex( it => it.path == this.$nuxt.$route.path);
        },
        nextLink() {
            return this.links[this.currentLink + 1] ?? this.links[0];
        },
        prevLink() {
            return this.links[this.currentLink - 1] ?? this.links[this.links.length-1];
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.layout {
    position: relative;
    overflow: hidden;  
}

.links {
    display: flex;
    justify-content: space-between;
    width: 100%;    
    position: fixed;
    color: $color-text-secondary;
}

.links, .navigation {
    z-index: 2;
}

.link:hover {
    color: $color-text-primary;
}

.menu {
    cursor: pointer;
}

.header {
    top: 2.5em;
}

.footer {   
    bottom: 2.5em;
}

.page, .links { 
    padding: 0 $spacing * 10;
    box-sizing: border-box; 
}
</style>