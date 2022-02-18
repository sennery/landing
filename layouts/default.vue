<template>
    <div class="layout">
        <header
            class="links header"
        >
            <span
                class="link menu"
                @click="showSidenav=!showSidenav"
            >
                menu
            </span>
            <NuxtLink
                to="/about"
                class="link"
            > 
                about 
            </NuxtLink>
        </header>

        <Nuxt
            class="page"
        />

        <footer
            class="links footer"
        >
            <NuxtLink
                to="/contacts"
                class="link"
            > 
                contacts 
            </NuxtLink>
        </footer>

        <NavigationMenu
            class="navigation"
            :enabled="showSidenav"
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
            showSidenav: false
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.layout {
    position: relative;
    overflow: hidden;
    max-height: 100vh;    
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

@media (max-width: $breakpoint-laptop) {
    .page, .links {
        padding: 0 $spacing * 7;
    }
}

@media (max-width: $breakpoint-mobile) {
    .page, .links {
        padding: 0 $spacing * 5;
    }
}
</style>