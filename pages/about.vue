<template>
    <main>
        <Container>
            <div
                class="title"
            >
                <TextRaiseTransition
                    :duration="0.75"
                >
                    <h1>
                        about
                    </h1>
                </TextRaiseTransition>
            </div>
            
            <p 
                class="info"
            >
                <TextRaiseTransition
                    v-for="(word, i) in description"
                    :key="i"
                    :delay="i * 0.025"
                    :mode="'inline-block'"
                >
                    <span
                        class="word"
                    >
                        {{ word + ' ' }}
                    </span>
                </TextRaiseTransition>                           
            </p>

            <div                
                class="hello"
            >
                <TextRaiseTransition
                    :delay="description.length * 0.025"
                >
                    <NavigationRouteLink
                        :name="'Contact with me!'"
                        :link="'/contacts'"
                    />   
                </TextRaiseTransition>       
            </div>

            <WordSlider/>
        </Container>
    </main>    
</template>

<script>
export default {
    data() {
        return {
            mounted: false
        }
    },
    computed: {
        myAge() {
            const born = new Date('1999-02-13T22:30:00+0500');
            const now = new Date();

            const correctiveMonth = now.getMonth() - born.getMonth() < 0;
            const correctiveDate = now.getMonth() === born.getMonth() && now.getDate() - born.getDate() < 0;
            const correctiveHours = now.getDate() === born.getDate() && now.getHours() - born.getHours() < 0;
            const correctiveMinutes = now.getHours() === born.getHours() && now.getMinutes() - born.getMinutes() < 0;
            const corrective = (correctiveMonth || correctiveDate || correctiveHours || correctiveMinutes) ? -1 : 0;

            return now.getFullYear() - born.getFullYear() + corrective;
        },
        description() {
            const text = `Hi, whoever you are! I'm a Web developer based in Perm, Russia.
                My name is Arsenii Likhachev and I'm ${ this.myAge } years old.
                Making stuff simple and minimalistic. Work in Nowhere.`;

            return text.split(' ').filter(it => it);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

main {
    display: flex;
    min-height: 100vh;

    position: relative;
    overflow: hidden;
    
    .title {
        font-size: 10em;
        margin-bottom: 0.5em;
        max-width: 50%;
    }

    .info {
        max-width: 35vw;        
        padding-left: 2.5em;
        margin-bottom: 0.5em;        
        font-size: 2.5em;
        font-weight: 400;
        line-height: normal;        
        color: $color-text-secondary;

        .word {
            display: inline-block;
            padding-right: 0.25em;
        }
    }    

    .hello {        
        color: $color-text-primary;
        margin-left: 40%;        
        font-size: 2.5em;
    }

    .back {
        position: absolute;
        top: 0;
        right: 0;
        height: 100vh;
        width: 30vw;
        background: $color-underscore;
    }
}

@media (max-width: $breakpoint-laptop) {
    main {        
        .title {
            font-size: 7em;
        }

        .info, .hello {
            font-size: 2em;
        }
    }
}

@media (max-width: $breakpoint-tablet) {
    main {        
        .title {
            font-size: 4em;
        }

        .info, .hello {
            font-size: 1.75em;
        }
    }
}

@media (max-width: $breakpoint-mobile) {
    main {
        .title {
            font-size: 2.5em;
        }

        .info {
            max-width: 65vw;
        }

        .info, .hello {
            padding-left: 0;
            margin-left: 0;
            font-size: 1.5em;
        }
    }
}

@media (max-height: $breakpoint-mobile) {
    main {
        font-size: 0.5em;
    }
}
</style>