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
    methods: {
        getTimeDifference(startDate) {
            const start = new Date(startDate);
            const now = new Date();

            const correctiveMonth = now.getMonth() - start.getMonth() < 0;
            const correctiveDate = now.getMonth() === start.getMonth() && now.getDate() - start.getDate() < 0;
            const correctiveHours = now.getDate() === start.getDate() && now.getHours() - start.getHours() < 0;
            const correctiveMinutes = now.getHours() === start.getHours() && now.getMinutes() - start.getMinutes() < 0;
            const corrective = (correctiveMonth || correctiveDate || correctiveHours || correctiveMinutes) ? -1 : 0;

            return now.getFullYear() - start.getFullYear() + corrective;
        },
    },
    computed: {
        description() {
            const age = this.getTimeDifference('1999-03-18T22:30:00+0500');
            const exp = this.getTimeDifference('2020-01-01T22:30:00+0500');

            const text = `Hi! I'm a Frontend developer from Perm, Russia.
                My name is Arsenii Likhachev and I'm ${ age } years old.
                Over ${ exp } years of the industry expirience.
                Making stuff simple and minimalistic.`;

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