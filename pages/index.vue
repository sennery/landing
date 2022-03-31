<template>
    <main>
        <h1 class="title">Arsenii Likhachev</h1>     
        <h2 class="subtitle">web developer</h2>
        
        <WebglCircle src="/images/texture-for-wave.png"/>      
    </main>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    user-select: none;

    .title, .subtitle {
        position: relative;
        z-index: 2;
    }
    
    .title {
        max-width: 50%;
        font-size: 10em;
    }

    .subtitle {        
        margin-top: 1em;
        font-size: 2.5em;
        font-weight: 400;
        color: $color-text-secondary;
    }
}

@media (max-width: $breakpoint-mobile) {
    main {
        .title { 
            font-size: 3.5em;
            max-width: 75%;
        }

        .subtitle {
            font-size: 2em;
            margin-top: 0.5em;
        }
    }
}
</style>
