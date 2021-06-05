<template> 
    <div class="bgimg" v-bind:style="heroImage">
        <br>
        <br>
        <br>
        <div class="ml-6">
            <h1>CYBERSECURITY TAXONOMY</h1>
            <h1>BASED ON ACM</h1>
            <div class="mt-2 subhdr ml-6">
                <p>
                <i>A taxonomy based on knowledge areas</i>
                </p>
                <p>
                <i>of the ACM to cover lines of research.</i>
                </p>
            </div>
        </div>
        <div>
            <v-container class="pl-2">
                <h3>The taxonomy consists of the following:</h3>
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
        <div class="text-center">
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
         shaped
         color="teal darken-2"
         elevation="24"
        ><v-icon>mdi-account-circle</v-icon>{{ sucessSnackBar.text }}
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


