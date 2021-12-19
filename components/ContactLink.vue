<template>
    <a
        target="_blank" 
        :href="link"
        :style="{'--background-color': color }"
    >
        <span>{{ name }}</span>
        <LinkIcon
            class="icon"
        />
        <div
            class="back"
        />
    </a>
</template>

<script>
import LinkIcon from '@/assets/svg/external-link.svg';

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    components: {
        LinkIcon
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

a {
    font-weight: 300;
    color: $color-text-secondary;
    overflow: hidden;
    line-height: initial;    
    
    position: relative;

    span {
        position: relative;
        margin-left: 1em;
        z-index: 1;
    }    

    .icon {
        position: relative;
        fill: $color-text-secondary;
        vertical-align: middle;
        width: 0.5em;
        height: 0.5em;
        z-index: 1;
    }
    
    &:hover {
        color: $color-text-primary;
    }

    &:hover .icon {
        fill: $color-text-primary;
    }

    .back {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: var(--background-color);
        transition: transform 0.5s $timing-primary;
    }

    &:hover .back {
        transform: translateY(-100%);
    }
}
</style>