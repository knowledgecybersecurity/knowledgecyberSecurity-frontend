<template>
    <div>
        <v-img src="../assets/TaxonomyChart.jpg">

        </v-img>
        <br>
        <div 
            class="text-center">
            <v-btn
                color="secondary"
                elevation="5"
                x-large
                @click="onClickGoBack(); trackBackTax()">
                Volver
            </v-btn>
        </div>
    </div>    
</template>

<script>
export default {
    methods:{
        onClickGoBack(){
            this.$router.push('/');
        },
        trackBackTax(){
            console.log('back_action_tax')
            this.$gtag.event('back_action_tax', {
                'event_category' : 'engagement',
                'event_label' : 'back_action_tax'
            })
        },
    }
}
</script>