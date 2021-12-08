<template>
    <main>
        <Container>
            <WebGLWaveImage 
                src="/images/texture-for-wave.png"
            />
            <div 
                class="side"
            >
                <span 
                    class="title"
                >
                    contacts
                </span>

            </div>
        </Container>        
    </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.side {
    display: flex;
    flex-direction: column;
    background-color: $color-background;

    position: absolute;
    top: 0;
    left: 50%;

    height: 100vh;

    .title {
        font-size: 10em;
        transform: translateX(-10%);
    }
}
</style>