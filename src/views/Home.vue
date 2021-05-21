<template> 
    <div class="bgimg" v-bind:style="heroImage">
        <br>
        <br>
        <br>
        <div class="ml-6">
            <h1>TAXONOMÍA DE CIBERSEGURIDAD</h1>
            <h1>BASADA EN ACM</h1>
            <div class="mt-2 subhdr ml-6">
                <p>
                <i>Una taxonomía basada en las áreas de conocimientos</i>
                </p>
                <p>
                <i>del ACM para cubrir 
                líneas de investigación.</i>
                </p>
            </div>
        </div>
        <div>
            <v-container class="pl-2">
                <h3>La taxonomía se compone de lo siguiente:</h3>
                <br>
                <ul>
                    <li>Knowledge Area (KA) y New Trends</li>
                    <li>Knowledge Units (KU)</li>
                    <li>Congresses</li>
                    <li>Certifications</li>
                    <li>Research by sector (Keyword and Knowledge Objetive)</li>
                    <li>Work Roles (Knowledge, Skills and Abilities)</li>
                </ul>
                <br>
                <br>
                <div>
                <h3>
                    We introduce to you the taxonomy guide
                    <router-link to="/taxonomyChart">Here</router-link>
                </h3>
                </div>
            </v-container>
            <div class="relleno"></div>
        </div>
        <div class="text-center mt-1">
                <v-btn
                    elevation="5"
                    :color="active ? 'primary' : 'teal lighten-2'"
                    :dark="active"
                    class="mx-auto py-12 px-12 button-font-enter"
                    rounded="true"
                    @click="onCLickGetIn(); track()"
                    >{{ active ? 'Entering KS . . .' : 'Enter' }}</v-btn>
        </div>

        <v-snackbar
         v-model="sucessSnackBar.snackbar"
         :timeout="sucessSnackBar.timeout"
         absolute
         right
         top
         color="teal darken-2"
         elevation="24"
        >{{ sucessSnackBar.text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "Home",
    data:()=>({
        active: false,
        sucessSnackBar : {
         snackbar: true,
         text: 'Welcome!!',
         timeout: 3000
      },
    }),
    methods:{
        onCLickGetIn(){
            this.active = true;
            setTimeout(()=>{this.$router.push('/karea');},800);
        },
        track(){
            console.log('evento enter');
            this.$gtag.event('enter_knowledge', {
                'event_category' : 'engagement',
                'event_label' : 'enter_knowledge'
            })
        },
    },
    computed: {
        heroImage() {
            return {
                backgroundImage: `url(${require('../assets/cyber-security-lock.jpg')})`
            };
        }
    }
}
</script>

<style scoped>
    .bgimg {
        color: white;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .relleno{
        height: 150px;
    }
    .subhdr{
        font-size: 20px;
        font-weight: 300;
        color: #42ff83;
    }
    .button-font-enter {
        font-size: 26px;
        color: white;
    }
</style>


