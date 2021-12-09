<template>
    <main>
        <Container>
            <div
                class="title"
            >
                about
            </div>
            <div 
                class="info"
            >
                <p>
                    Hi, whoever you are! I'm a
                    <span>Web developer</span>
                    based in Perm, Russia.
                    My name is Arsenii Likhachev
                    and I'm {{ myAge }} years old.
                    Making stuff simple and minimalistick.
                    Work in Nowhere.
                </p>
                <NavigationLink
                    class="hello"
                    :name="'Contact with me!'"
                    :link="'/contacts'"
                />     
            </div>
            <WordSlider/>
        </Container>
    </main>    
</template>

<script>
export default {
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";

main {
    display: flex;
    min-height: 100vh;
    font-size: 15em;
    
    .title {
        font-size: 10rem;
        margin-bottom: 0.5em;
    }

    .info {
        display: flex;
        flex-direction: column;
        max-width: 35vw;    
        font-size: 2.5rem;
        font-weight: 400;
        line-height: initial;        
        color: $color-text-secondary;

        span {
            color: $color-text-primary;
        }

        p {
            margin-bottom: 0.5em;
        }
    }    

    .hello {        
        color: $color-text-primary;        
        font-size: 1em;
        width: 50%;
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
</style>