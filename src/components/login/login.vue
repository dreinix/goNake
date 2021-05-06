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
import {setCookie,loginUser} from '@/utils/utils.js'
export default{
    data(){
        return{
            usrn: "",
            pwd: "",
            unvalid: false,
            reload:false,
        }
    },
    methods: {
        async login(){
            let response = await loginUser(this.usrn,this.pwd)
            if(response.Token){
                this.unvalid = false;
                setCookie("jwt",response.Token,5)
                this.$router.replace("/#logged")
            }else{
                this.unvalid = true;
            }
        },
    }
}
</script>
