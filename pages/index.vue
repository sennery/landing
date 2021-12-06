<template>
    <main>        
        <Sennery/>
        <div class="subtitle">web developer</div>
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
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    user-select: none;

    .subtitle {
        font-size: 2em;
        font-weight: 400;
        color: $color-text-secondary;
    }
}
</style>
