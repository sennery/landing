<template>
    <transition
        name="side"
    >            
        <nav
            v-if="enabled" 
            class="sidenav"
        >  
            <TextTransition
                v-for="(link, i) in links"
                :key="link.name"
                :delay="0 + 0.1 * i"                    
                :rotate="{x: 0, y: -90}"
                :translate="{x: 100, y: 0}" 
            >                    
                <NavigationRouteLink                    
                    class="menu-item" 
                    :name="link.name"
                    :link="link.path"
                    @click.native="$emit('disable')"
                />
            </TextTransition>

            <div
                class="close-icon"
                @click="$emit('disable')"
            >
                close
            </div>
        </nav>
    </transition>    
</template>

<script>
export default {
    props: {
        enabled: {
            type: Boolean,
            required: true
        },
        links: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.menu-item {
    z-index: 3;
    margin-right: 0.5em;
    font-size: 7.5em;
    font-weight: 300;
}

.close-icon {
    position: fixed;
    top: 2.5em;
    right: var(--spacing);    
    color: $color-text-secondary;
    z-index: 3;
    cursor: pointer;
}

.close-icon:hover {  
    color: $color-text-primary;
}

.sidenav,
.sidenav::before,
.sidenav::after {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 0 var(--spacing);
    background-color: $color-background;
    user-select: none;
}

.side-enter,
.side-enter::before,
.side-enter::after {       
    transform: translateY(-100%);
}

.side-leave-to {      
    transform: translateY(-100%);
}

.side-enter-active {
    transition: transform 0.75s $timing-primary;
} 

.side-enter-active.sidenav::after {
    transition: transform 0.75s cubic-bezier(0, 1, 0.2, 1);
}
 
.side-enter-active.sidenav::before,
.side-leave-active {
    transition: transform 0.75s cubic-bezier(0, 1, 0.8, 1);
} 

.side-enter-active {
    &.sidenav::after {
        content: '';
        z-index: 1;
        background: $color-underscore;
    }

    &.sidenav::before {
        content: '';
        z-index: 2;
    }  
}

@media (max-width: $breakpoint-laptop) {
    .menu-item {
        font-size: 7em;
    }
}

@media (max-width: $breakpoint-mobile) {
    .menu-item {
        font-size: 5em;
    }
}

@media (max-height: $breakpoint-tablet) {
    .menu-item {
        font-size: 3.5em;
    }
}

@media (max-height: $breakpoint-mobile) {
    .menu-item {
        font-size: 2.5em;
    }
}
</style>