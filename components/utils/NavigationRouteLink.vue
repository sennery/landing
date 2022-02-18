<template>
    <div class="link-container">
        <NuxtLink 
            :to="link"
            class="link"
        > 
            {{name}} 
        </NuxtLink>
    </div>    
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true          
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.link-container {
    $animation-duration: 0.2s;

    display: inline-block;
    position: relative;
    overflow: hidden;
    //min-width: 5em;
    
    $transition-first: transform $animation-duration $timing-text;
    $transition-second: transform $animation-duration $animation-duration $timing-text;
    
    $stroke-width: calc(1px + 0.025em);

    &::after {        
        content: "";
        position: absolute;
        bottom: 0;
        left: -100%;
        width: 100%;
        height: $stroke-width;
        background: $color-underscore;
        transition: $transition-second;
    }

    &:hover::after {
        transition: $transition-first;
        transform: translateX(100%);
    }

    &::before {        
        content: "";
        position: absolute;
        bottom: 0;
        left: calc(100% + 1px);
        width: 0.5em;
        height: $stroke-width;
        background: #3c3cde;
        transition: $transition-first;
        transform-origin: left;
    }

    &:hover::before {
        transition: $transition-second;
        transform: rotateZ(30deg) translateX(-100%);
    }

    .link {
        display: block;
        transition: $transition-second;        
        min-height: 1.5em;
    }

    &:hover .link {
        color: $color-text-active;
    }
}

@media (max-width: $breakpoint-mobile) {
    .link-container {
        min-width: auto;
    }
}
</style>