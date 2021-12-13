<template>
    <nav>
        <SLetter 
            class="home-icon"
            @click="showSidenav=!showSidenav"             
        />

        <div
            class="scroll-title"
        >
            <span>click</span>
            <span>or</span>
            <span>scroll</span>
        </div>

        <ScrollBar
            :link="nextLink"
        />
          
        <SideNavigation
            :enabled="showSidenav"
            :links="links"
            @disable="showSidenav=false"  
        />
    </nav>
</template>

<script>
import SLetter from '@/assets/svg/letter.svg';

export default {
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
        nextLink() {
            const currentLink = this.links.findIndex( it => it.path == this.$nuxt.$route.path);

             return this.links[currentLink + 1] ?? this.links[0];
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    max-width: 5em;
    //height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
    z-index: 999;

    font-weight: 300;    

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        
        height: 100%;
        margin-right: 1em;
    }

    .home-icon {
        width: 100%;
        //min-width: 5em;
        padding: 0.75em;
        margin-top: 2em;
        z-index: 3;

        transition: 1s $timing-primary;
        transform: rotateZ(-90deg);

        cursor: pointer; 

        &:hover {
           transform: rotateZ(-90deg) scale(1.1); 
        }
    }

    .scroll-title {
        display: flex;
        flex-direction: column;
        margin: 1em 0;
        color: $color-text-secondary;

        & > * {
            margin: auto;
        }
    }
}
</style>