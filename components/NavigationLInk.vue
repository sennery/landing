<template>
    <div class="link-container">
        <NuxtLink 
            :to="'/' + name"
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.link-container {
    $animation-duration: 0.2s;

    display: inline-block;
    margin: 0.5em;
    padding: 0.5em;
    width: auto;
    position: relative;
    overflow: hidden;

    font-size: 1.5em;
    
    $transition-first: transform $animation-duration $easing-primary;
    $transition-second: transform $animation-duration $animation-duration $easing-primary;     

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
        transition: $transition-first;
    }

    &:hover .link {
        transform: translateX(-10%);
        color: white;
    }
}
</style>