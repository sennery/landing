<template>
    <nav>
        <SLetter 
            class="home-icon"
            @click="showSidenav=!showSidenav"             
        />  
          
        <SideNavigation
            :enabled="showSidenav"
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
    justify-content: center;
    align-items: flex-start;

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

    .menu {
        margin-left: 1em;
    }
}
</style>