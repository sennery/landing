<template>
    <main>
        <WebglWaveImage
            class="wave-back" 
        />
        <div 
            class="side"
        >
            <div>
                <div 
                    class="title"
                >
                    <TextTransition>
                        <h1>
                            contacts
                        </h1>
                    </TextTransition> 
                </div>

                <TextTransition
                    v-for="(contact, i) in contacts"
                    :key="contact.name"
                    :delay="(i + 2) * 0.1"
                    :rotate="{x: 0, y: -90}"
                >
                    <ContactsLink
                        class="contact"
                        :name="contact.name"
                        :link="contact.link"
                        :color="contact.color"
                    />
                </TextTransition>
            </div>                
        </div>       
    </main>
</template>

<script>
export default {
    data() {
        return {
            contacts: [
                // {
                //     name: 'LinkedIn',
                //     color: '#bb268a',
                //     link: 'https://github.com/sennery'
                // },
                {
                    name: 'GitHub',
                    color: '#9b2a9f',
                    link: 'https://github.com/sennery'
                },
                {
                    name: 'Telegram',
                    color: '#7132bb',
                    link: 'https://t.me/sennery'
                },
                {
                    name: 'Email',
                    color: '#5a38cb',
                    link: 'mailto:mac452ares@gmail.com'
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
        transform: translate(-10%, 0);
        margin-bottom: 0.25em
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
        padding-right: 2.5em;

        .title {
            font-size: 3.5em;
            transform: translate(0, -20%);
        }

        .contact {
            width: auto;
            font-size: 2em;
        }
    }
}

// @media (max-height: $breakpoint-mobile) {
//     .side {
//         .title {
//             font-size: 4em;
//             transform: translate(0, -20%);
//         }

//         .contact {
//             font-size: 1.5em;
//             width: auto;
//         }
//     }
// }
</style>