<template>
  <div>
    <v-app :dark="darkTheme">
      <v-toolbar color="primary" dark fixed clipped-left app>
        <router-link to="/">
          <v-toolbar-title id="title" class="mr-3">{{$appName}}</v-toolbar-title>
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
      <v-footer>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="darkTheme = !darkTheme">
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      playerInput: "",
      darkTheme: false
    };
  },
  watch: {
    $route() {
      this.playerInput = "";
    },
    // Save darkTheme state in localStorage
    darkTheme() {
      if (localStorage) localStorage.setItem("darkTheme", this.darkTheme);
    }
  },
  beforeMount() {
    this.darkTheme = this.getThemeState();
  },
  methods: {
    playerLookup() {
      this.$router.push(`/player/${this.playerInput}`);
    },
    getThemeState() {
      if (!localStorage) {
        return false;
      }
      try {
        return JSON.parse(localStorage.getItem("darkTheme") || false);
      } catch (error) {
        return false;
      }
    }
  }
};
</script>


<style scoped>
#title {
  color: white !important;
}
</style>
