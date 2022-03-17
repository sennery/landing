<template>
    <main>
        <h1
            class="title"
        >
            <TextTransition
                :duration="0.75"
                :translate="{x: 100, y: 0}"
                :rotate="{x: 0, y: 90}"
            >
                <div>
                    about
                </div>
            </TextTransition>
        </h1>
        
        <p 
            class="info"
        >
            <TextTransition
                v-for="(word, i) in description"
                :key="i"
                :delay="i * 0.025"
                :mode="'inline-block'"
                :overflowHidden="false"
                :translate="{x: 100, y: 0}"
                :rotate="{x: 0, y: 90}"
            >
                <span
                    class="word"
                >
                    {{ word }}
                </span>
            </TextTransition>                           
        </p>

        <div                
            class="contact-me"
        >
            <TextTransition
                :delay="description.length * 0.025"
                :translate="{x: 100, y: 0}"
                :rotate="{x: 0, y: 90}"
            >
                <NavigationRouteLink
                    :name="'Contact with me!'"
                    :link="'/contacts'"
                />   
            </TextTransition>       
        </div>

        <AboutAside/>
    </main>    
</template>

<script>
export default {
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
            const age = this.getTimeDifference('1999-03-18');
            const exp = this.getTimeDifference('2020-01-01');

            const text = `Hi! I'm a Frontend developer from Russia.
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

.page-enter,
.page-leave-to {
    transform: translateX(-100vw) scaleX(0);
    opacity: 0;  
}

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;

    position: relative;
    overflow: hidden;
    
    .title {
        font-size: 10em;
        margin-bottom: 0.25em;
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

    .contact-me {        
        color: $color-text-primary;
        margin-left: 40%;        
        font-size: 2.5em;
    }
}

@media (max-width: $breakpoint-laptop) {
    main {        
        .title {
            font-size: 7em;
        }

        .info {
            max-width: 50vw;
        }

        .info, .contact-me {
            font-size: 2em;
        }
    }
}

@media (max-width: $breakpoint-tablet) {
    main {        
        .title {
            font-size: 4em;
        }

        .info {
            font-size: 1.5em;
        }
    }

    .page-enter,
    .page-leave-to {
        transform: translateY(-100vh);
        opacity: 0;  
    }
}

@media (max-width: $breakpoint-mobile) {
    main {
        .title {
            font-size: 3.5em;
        }

        .info {
            max-width: 80vw;
        }

        .info, .contact-me {
            padding-left: 0;
            margin-left: 0;
        }
    }
}
</style>