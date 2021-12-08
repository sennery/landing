<template>
    <main>
        <Container>            
            <Sennery/>
            <div 
                class="subtitle"
            >
                <span>
                    web developer
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
    }
}
</style>
