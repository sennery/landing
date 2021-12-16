<template>
    <main>
        <Container>
            <WebGLWaveImage
                class="wave-back" 
                src="images/wave-image-texture.jpg"
            />
            <div 
                class="side"
            >
                <div>
                    <div 
                        class="title"
                    >
                        <TextRaiseTransition>
                            <h1>
                                contacts
                            </h1>
                        </TextRaiseTransition> 
                    </div>

                    <TextRaiseTransition
                        v-for="(contact, i) in contacts"
                        :key="contact.name"
                        :delay="i * 0.15"
                    >
                        <ContactLink
                            class="contact"
                            :name="contact.name"
                            :link="contact.link"
                            :color="contact.color"
                        />
                    </TextRaiseTransition>
                </div>                
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

main {
    width: 100vw;
    height: 100vh;
}

.side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: $color-background;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 
        0px 3px 4px 0px rgb(0 0 0 / 14%), 
        0px 1px 8px 0px rgb(0 0 0 / 12%);

    position: absolute;
    top: 0;
    left: 50%;

    height: 100vh;    

    .title {
        font-size: 10em;
        transform: translate(-10%, -20%);
    }

    .contact {
        display: block;
        width: 50%;
        font-size: 2.5em;
        margin: 0.5em 0 0 1em;
    }
}

@media (max-width: $breakpoint-laptop) {
    .side {
        .title {
            font-size: 5em;
            transform: translate(0, -20%);
        }

        .contact {
            width: auto;
        }
    }
}

@media (max-width: $breakpoint-mobile) {
    .side {
        left: 0;
        padding-left: 5em;

        .title {
            font-size: 5em;
            transform: translate(0, -20%);
        }

        .contact {
            width: auto;
        }
    }
}

@media (max-height: $breakpoint-mobile) {
    .side {
        .title {
            font-size: 4em;
            transform: translate(0, -20%);
        }

        .contact {
            font-size: 1.5em;
            width: auto;
        }
    }
}
</style>