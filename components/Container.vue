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
    padding: 0 $spacing * 10;
    box-sizing: border-box;    
}

@media (max-width: $breakpoint-laptop) {
    .container {
        padding: 0 $spacing * 7;
    }
}

@media (max-width: $breakpoint-mobile) {
    .container {
        padding: 0 0 0 5em;
    }
}
</style>