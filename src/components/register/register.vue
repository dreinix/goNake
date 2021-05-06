<template>
  <v-container>
    <v-layout>
      <v-flex style="padding-top: 10%">
        <v-alert
          v-model="err"
          type="error"
          elevation="5"
          
        >
          Este usuario ya existe, por favor, cambie el nombre usuario
        </v-alert>
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
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                  <v-text-field
                    name="usrn"
                    label="Nombre de usuario"
                    v-model="usrn"
                    id="usrn"
                    required
                  ></v-text-field>
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
                    type="password"
                  ></v-text-field>
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
                    :rules="[conparePwd]"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>
                  <v-btn type="summit"> Registrar </v-btn>
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
import { signupUser, loginUser, setCookie } from "@/utils/utils.js";
export default {
  data() {
    return {
      usrn: "",
      pwd: "",
      name: "",
      pwdc: "",
      err: false,
    };
  },
  computed: {
    conparePwd() {
      return this.pwd == this.pwdc ? true : "Las contraseñas no son iguales";
    },
  },
  methods: {
    async signup() {
      let response = await signupUser(this.usrn, this.pwd, this.name);
      if (
        response.data ==
        "Username already exist, we couldn't create your account."
      ) {
          this.err = true;
      } else {
          let login = await loginUser(this.usrn,this.pwd)
                setCookie("jwt",login.Token,5)
                this.$router.replace("/#logged")
      }
    },
  },
};
</script>
