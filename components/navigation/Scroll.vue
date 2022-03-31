<template>
    <nav>
        <div class="bar">
            <Angle class="angle top"/>

            <span class="prev-link">
                {{ this.prevLink.name }}
            </span>
            

            <SLetter 
                class="home-icon"
                @click="showSidenav=!showSidenav"             
            />

            <span class="next-link">
                {{ this.nextLink.name }}
            </span>

            <Angle class="angle bottom"/>
        </div>        
          
        <NavigationSide
            :enabled="showSidenav"
            :links="links"
            @disable="showSidenav=false"  
        />
    </nav>
</template>

<script>
import SLetter from '@/assets/svg/letter.svg';
import Angle from '@/assets/svg/angle-up.svg';

export default {    
    components: {
        SLetter,
        Angle
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
    },
    methods: {
        onBreakpoint(isNext) {
            this.$router.push({
                path: isNext 
                    ? this.nextLink.path
                    : this.prevLink.path
            });
        },

        updateScroll(scroll) {
            GSAP.set('.home-icon', {
                y: this.$viewport.height * scroll * 0.3
            });
            GSAP.set(['.angle.top', '.prev-link'], {
                y: this.$viewport.height * scroll * 0.35,
                opacity: 1 - scroll * 3
            });
            GSAP.set(['.angle.bottom', '.next-link'], {
                y: this.$viewport.height * scroll * 0.35,
                opacity: 1 + scroll * 3
            });
        },
        loop() {
            this.updateScroll(this.$scroll.lerpedNormalized);
            this.reqFrame = requestAnimationFrame(this.loop);
        }
    },
    mounted() {
        this.$events.$on('scroll:breackpoint', this.onBreakpoint);
        requestAnimationFrame(this.loop);
    },
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
    height: 100vh;

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
        margin: 1em 0;
        z-index: 3;

        border-radius: 10%;
        background-color: rgba(23, 24, 28, 0.4);

        transition: 1s $timing-primary;
        transform: rotateZ(-90deg);

        cursor: pointer; 

        &:hover {
           transform: rotateZ(-90deg) scale(1.1); 
        }
    }

    .bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: $color-text-secondary;
    }

    .angle {
        fill: $color-text-secondary;

        &.bottom {
            transform: rotateZ(180deg);
        }
    }
}
</style>