<template>
    <div class="container">
        <slot/>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.container {
    width: 100%;
    max-width: $breakpoint-desktop;
    margin: auto;
    padding: 0 $spacing * 5;
    box-sizing: border-box;    
}
</style>