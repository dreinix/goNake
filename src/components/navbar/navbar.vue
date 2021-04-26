<template>
    <v-app-bar app dense dark>
        <v-btn plain ripple @click="goTo('')">
            <v-toolbar-title>GoNake</v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu
            left
            bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                        v-bind="attrs"
                        v-on="on">
                            <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="goTo('login')">
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item @click="goTo('signup')">
                        <v-list-item-title>Singup</v-list-item-title>
                    </v-list-item>
                </v-list>
        </v-menu>
    </v-app-bar>
</template>


<script>
export default{
    methods: {
        goTo (where) {
            try {
                console.log(where)
                const path = `/${where}`
                if (this.$route.path !== path) this.$router.push(path)
            } catch (error) {
                console.log(error)
            }
            
        }
    },
}
</script>