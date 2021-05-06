<template>
    <v-app-bar app dense dark>
        <v-btn plain ripple @click="goTo('')">
            <v-toolbar-title>GoNake</v-toolbar-title>
        </v-btn>
        <v-btn right plain @click="goTo('scores')">
            Scores
        </v-btn>
        <v-spacer></v-spacer>
        
        <v-menu
            left
            bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded
                        v-bind="attrs"
                        v-on="on">
                        
                           {{username}} <v-icon>mdi-account</v-icon> 
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, i) in items"
                        :key="i" @click="goTo(item.title)">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
        </v-menu>
    </v-app-bar>
</template>


<script>
import {getCookie,setCookie,getCurrentUser} from '@/utils/utils.js'
export default{
    data(){
        return{
        items:[],
        username: "Login"
        }
    },     
    methods: {
        goTo (where) {
            if(where=="logout"){
                setCookie("jwt","",100) //delete token after 100 miliseconds
                location.reload()
            }else{
                try {
                    const path = `/${where}`
                    if (this.$route.path !== path) this.$router.push(path)
                } catch (error) {
                    console.log(error)
                }
            }
            
        }
    },
    
    async mounted(){
        var cookie = getCookie("jwt")
        if(!cookie){
            
            this.items= [
                { title: 'login' },
                { title: 'signup' },]
        }else{
            let response = await getCurrentUser();
            this.username = response.data.username
            this.items= [
                { title: 'logout' }]
        }
    }
}
</script>