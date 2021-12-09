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
    min-width: 5em;

    font-size: 1.5rem;
    
    $transition-first: transform $animation-duration $timing-primary;
    $transition-second: transform $animation-duration $animation-duration $timing-primary;     

    &::after {        
        content: "";
        position: absolute;
        bottom: 0;
        left: -100%;
        width: 100%;
        height: 2px;
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
        height: 2px;
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
</style>