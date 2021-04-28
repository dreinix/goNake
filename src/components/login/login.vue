<template>
    <v-container>
            <v-layout>
                <v-flex style="padding-top:15%">
                    <v-card dark >
                        <v-card-text>
                            <v-form @submit.prevent="login" :dark="true">
                                <v-layout>
                                    <v-flex>
                                        <v-text-field 
                                        name="usrn"
                                        label="Nombre de usuario"
                                        v-model="usrn"
                                        id="usrn" 
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex>
                                        <v-text-field 
                                        name="pwd"
                                        label="Contraseña"
                                        v-model="pwd"
                                        id="pwd" 
                                        required
                                        type="password"></v-text-field>
                                    </v-flex>
                                </v-layout>    
                                <v-layout>
                                    <v-flex>
                                        <v-btn type="summit">
                                            Login
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-card-text>
                        <v-alert type="error" :value="unvalid">
                            Usuario o contraseña incorrecta
                        </v-alert>
                    </v-card>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import {setCookie} from '@/utils/utils.js'
export default{
    data(){
        return{
            usrn: "",
            pwd: "",
            unvalid: false,
            reload:false,
            ans: {}
        }
    },
    methods: {
        async login(){
            try {
                await axios
                .post(`http://127.0.0.1:3001/api/users/login`,{
                    username:this.usrn,
                    password:this.pwd})
                .then(response =>  (this.ans = response.data))
                .catch(err=>{
                    console.log(err)
                    if(!err.status){
                    return "Server down"
                    } 
                })
            } catch (e) {
                console.log(e)
            }

            if(this.ans.Token){
                this.unvalid = false;
                setCookie("jwt",this.ans.Token,5)
                this.$router.replace("/#logged")
            }else{
                this.unvalid = true;
            }
        },
    }
}
</script>
