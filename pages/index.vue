<template>
    <main>
        <Container>            
            <Sennery/>
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

    .subtitle {
        display: flex;
        justify-content: center;
        margin-top: 1em;
        font-size: 2.5em;
        font-weight: 400;
        color: $color-text-secondary;
        position: relative;        
        z-index: 1;
    }
}

@media (max-width: $breakpoint-mobile) {
    main .subtitle {
        margin-top: 0.5em;
        justify-content: flex-start;
    }
}
</style>
