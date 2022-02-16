<template>
    <main>
        <Container>
            <div
                class="title"
            >
                Arsenii Likhachev
            </div>     
            <div 
                class="subtitle"
            >
                web developer
            </div>
            
            <WebGLCircle
                src="/images/texture-for-wave.png"
            />
        </Container>        
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
    align-items: center;
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
