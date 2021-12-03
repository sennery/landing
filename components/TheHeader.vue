<template>
    <header>
        <template
            v-for="link in links"
        >
            <NavigationLInk 
                :name="link"
                :key="link"
            />
        </template>
    </header>
</template>

<script>
export default {
    data() {
        return {
            links: [
                'works',
                'about',
                'contacts'
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 10vh;

    position: absolute;
    top: 0;
    left: 0;
}
</style>