<template>
    <header>
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
                :name="link"
                :key="link"
            />
        </template>
    </header>
</template>

<script>
import SLetter from '@/assets/images/letter.svg';

export default {
    data() {
        return {
            links: [
                'works',
                'about',
                'contacts'
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

header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 15vh;

    position: absolute;
    top: 0;
    left: 0;

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        
        height: 100%;
        margin: 0.75em;
    }

    .home-icon {
        height: 25%;
        padding: 0.75em;

        transition: 1s $easing-primary;
        transform: rotateZ(-90deg);

        cursor: pointer; 

        &:hover {
           transform: rotateZ(-90deg) scale(1.1); 
        }
    }
}
</style>