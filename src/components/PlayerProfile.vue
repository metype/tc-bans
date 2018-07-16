<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-progress-linear indeterminate v-show="$apollo.queries.player.loading"></v-progress-linear>
      <v-card v-if="playerNotFound"><v-card-title>Player not found</v-card-title></v-card>
      <v-card v-if="player != null">
        <v-card-media
                :src="playerAvatarUrl"
                height="300px"
        >
          <v-layout
                  column
                  fill-height
          >

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{player.name}}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">perm_identity</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{player.uuid}}</v-list-tile-title>
              <v-list-tile-sub-title>UUID</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">date_range</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{playerLastLogin}}</v-list-tile-title>
              <v-list-tile-sub-title>Last Login</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>


          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">date_range</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{playerFirstLogin}}</v-list-tile-title>
              <v-list-tile-sub-title>First Login</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>


          <!--<v-divider inset></v-divider>-->

          <!--<v-list-tile>-->
            <!--TODO: Ban data-->
          <!--</v-list-tile>-->


        </v-list>
      </v-card>
    </v-flex>
  </v-layout>



</template>

<script>
  import gql from 'graphql-tag';

  // TODO: allow providing either name or uuid as prop
export default {
  name: 'PlayerProfile',
  props: {
    name: {
      required: true,
      type: String,
    }
  },
  computed: {
    playerNotFound() {
      return !this.$apollo.queries.player.loading && this.player == null;
    },
    playerAvatarUrl() {
      if(this.player == null) {
        return '';
      }
      return `https://crafatar.com/avatars/${this.player.uuid}?size=300&overlay`;
    },
    playerFirstLogin() {
      return this.formatDate(this.player.firstLogin);
    },
    playerLastLogin() {
      return this.formatDate(this.player.lastLogin);
    },
  },
  methods: {
    formatDate(date) {

      if(date == null) {
        return '-';
      }
      const d = new Date(date);
      return d.toLocaleString();

    },
  },
  apollo: {
    // Query with parameters
    player: {
      // gql query
      query: gql`query player($name: String!) {
      player(name: $name) {
            name
            uuid
            firstLogin
            lastLogin
      }
    }`,
      // Static parameters
      variables() {
        return {
          name: this.name,
        };
      },
    },
  },
};
</script>