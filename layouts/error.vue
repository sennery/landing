<template>
    <div class="wrapper">        
        <Container>
            <div>
                <div 
                    v-if="statusCode === 404"
                    class="error"
                >
                    <span>404</span>
                    <span>page not found</span>
                </div>
                <div
                    v-else
                >
                    Oops, something went wrong...
                </div>

                <NuxtLink 
                    to="/"
                >
                    Go to home page
                </NuxtLink>
            </div>
        </Container>
    </div>
</template>

<script>
export default {
    props: {
        error: {
        type: Object,
        default: null
        }
    },
    computed: {
        statusCode () {
            return (this.error && this.error.statusCode) || 500
        },
        message () {
            return this.error.message || '<%= messages.client_error %>'
        }
    },
    head () {
        return {
            title: this.message,
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.wrapper {
    display: flex;
    width: 100vw;
    height: 100vh;
    font-size: 5em;
    font-weight: 400;
    color: $color-text-secondary;

    .error {
        color: $color-text-primary;

        span:first-child {
            font-weight: 800;
        }
    }    
}
</style>