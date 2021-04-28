<template>
    <v-container >
            <v-layout>
                <v-flex style="padding-top:10%">
                    <v-card dark>
                        <v-card-text>
                            <v-form @submit.prevent="signup" :dark="true">
                                <v-layout>
                                    <v-flex>
                                        <v-text-field 
                                        name="name"
                                        label="Nombre"
                                        v-model="name"
                                        id="name" 
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
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
                                        <v-text-field 
                                        name="pwdc"
                                        label="Confirmar contraseña"
                                        id="pwdc" 
                                        v-model="pwdc"
                                        required
                                        type="password"
                                        :rules="[conparePwd]"></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                    <v-flex>
                                        <v-btn type="summit">
                                            Registrar
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            usrn: "",
            pwd: "",
            name: "",
            pwdc: ""
        }
    },
    computed:{
        conparePwd(){
            return this.pwd == this.pwdc ? '': 'Las contraseñas no son iguales'
        }
    },
    methods: {
        signup(){
            try {
                axios
                .post(`http://127.0.0.1:3001/api/users/`,{
                    username:this.usrn,
                    password:this.pwd,
                    name:this.name})
                .then(response => (console.log(response.data)))
                .catch(err=>{
                    if(!err.status){
                    return "Server down"
                    } 
                })
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>
