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

                <template
                    v-for="contact in contacts"

                >
                    <ContactLink
                        class="contact"
                        :key="contact.name"
                        :name="contact.name"
                        :link="contact.link"
                        :color="contact.color"
                    />
                </template>
            </div>
        </Container>        
    </main>
</template>

<script>
export default {
    data() {
        return {
            contacts: [
                {
                    name: 'GitHub',
                    color: '#bb268a',
                    link: ''
                },
                {
                    name: 'LinkedIn',
                    color: '#9b2a9f',
                    link: ''
                },
                {
                    name: 'Telegram',
                    color: '#7132bb',
                    link: ''
                },
                {
                    name: 'Email',
                    color: '#5a38cb',
                    link: ''
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

.side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: $color-background;

    position: absolute;
    top: 0;
    left: 50%;

    height: 100vh;    

    .title {
        font-size: 10em;
        transform: translate(-10%, -20%);

    }

    .contact {
        width: 50%;
        font-size: 2.5em;
        margin: 0.5em 0 0 1em;
    }
}
</style>