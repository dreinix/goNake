<template>
    <v-container>
            <v-layout>
                <v-list dark>
                    <v-list-item-content>
                        <v-card dark v-for="(score, i) in scores"
                        :key="i" elevation="10" class="mx-auto" max-width="40%">
                            <v-card-title>
                                {{i+1}}.  {{score.user.name}} 
                                <v-card-title style="padding-left: 20%">
                                    Score: {{score.value}} 
                                </v-card-title>  
                            </v-card-title>
                                <v-card-text>
                                    When: {{formatDate(score.date)}} 
                                </v-card-text>                      
                            </v-card>
                    </v-list-item-content>
                </v-list>                  
            </v-layout>
        <v-container v-observe-visibility="handleScrolledToBottom"></v-container>
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default{
    name:'observer',
    data(){
        return{
            scores: [],
            observer: null,
            last: 0,
            scoreData:null
        }
    },
    async mounted(){
        loadData:{
            try {  
            this.scoreData = await axios.get(`http://127.0.0.1:3001/api/scores/`)
            .catch(err=>{
                if(!err.status){
                return "Server down"
                } 
            })
        } catch (e) {
            console.log(e)
        }
        this.scores = [...this.scores,...this.scoreData.data.slice(0,20)]
        this.last = 20
        this.observer = new IntersectionObserver(([entry]) => {
            if(entry && entry.isIntersecting){
                this.$emit('intersect')
            }
        });
        this.observer.observe(this.$el)
        }
        
    },
     methods: {
        loadScores(){
            try {
                let newElements = this.scoreData.data.slice(this.last,this.last+20)
                this.scores.push(...newElements)
                this.last+=20; 
            } catch (error) {
                this.loadData
            }
        },
        handleScrolledToBottom(isVisible){
            if(!isVisible){
                return
            }
            this.loadScores();

        },
        formatDate(date){
            return moment(String(date)).add(4, 'hours').format('DD/MM/YYYY hh:mm a')
        }
    },
}
</script>