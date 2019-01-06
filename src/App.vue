<template>
    <div>
        <v-app>
            <v-toolbar color="primary" dark fixed clipped-left app>
                <router-link to="/">
                    <v-toolbar-title id="title"  class="mr-3" >
                        {{$appName}}
                    </v-toolbar-title>
                </router-link>
                <!-- FIXME: mobile view -->
                <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        label="Player Lookup"
                        v-model="playerInput"
                        @change="playerLookup"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn href="https://forum.tallcraft.com/new-topic?category_id=5" flat>Ban Dispute</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      playerInput: '',
    };
  },
  watch: {
    $route() {
      this.playerInput = '';
    },
  },
  methods: {
    playerLookup() {
      this.$router.push(`/player/${this.playerInput}`);
    },
  },
};
</script>


<style scoped>
    #title{
        color: white !important;
    }
</style>
