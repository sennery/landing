<template>
    <nav>
        <NuxtLink 
            to="/" 
            class="link"
        >
            <SLetter 
                class="home-icon" 
            />
        </NuxtLink>        
        
        <template
            v-for="link in links"
        >
            <NavigationLink
                class="menu" 
                :name="link.name"
                :link="link.link"
                :key="link.name"
            />
        </template>
    </nav>
</template>

<script>
import SLetter from '@/assets/svg/letter.svg';

export default {
    data() {
        return {
            links: [
                {
                    name: 'works',
                    link: '/works'
                },
                {
                    name: 'about',
                    link: '/about'
                },
                {
                    name: 'contacts',
                    link: '/contacts'
                },
            ]
        }
    },
    components: {
        SLetter
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    max-width: 100vw;
    height: 10vh;

    position: absolute;
    top: 0;
    left: 0;
    padding: 0.75em;

    font-weight: 300;

    z-index: 999;

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        
        height: 100%;
        margin-right: 1em;
    }

    .home-icon {
        height: 25%;
        padding: 0.75em;

        transition: 1s $timing-primary;
        transform: rotateZ(-90deg);

        cursor: pointer; 

        &:hover {
           transform: rotateZ(-90deg) scale(1.1); 
        }
    }

    .menu {
        margin-left: 1em;
    }
}
</style>