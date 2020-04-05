<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-progress-linear indeterminate
                               v-show="$apollo.queries.player.loading"></v-progress-linear>

            <v-card v-if="name == null || name === ''">
                <v-card-title>Please provide a player name to search for</v-card-title>
            </v-card>
            <v-card v-else-if="playerNotFound">
                <v-card-title>Could not find player '{{name}}'</v-card-title>
            </v-card>
            <v-card v-else-if="player != null">
                <v-img
                        :src="playerAvatarUrl"
                        height="300px"
                >
                </v-img>

                <v-card-title primary-title>
                    <div class="headline">{{player.name}}</div>
                </v-card-title>


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

                </v-list>

                <v-card-text>
                    <h3>Infractions</h3>
                    <v-data-table
                            :headers="playerHistoryHeader"
                            :items="playerHistoryData"
                            hide-actions
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td v-for="(item, i) in props.item" :key="i">
                                {{ item }}
                            </td>
                        </template>
                    </v-data-table>

                </v-card-text>
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
      default: '',
      type: String,
    },
  },
  data() {
    return {
      playerHistoryHeader: [
        {
          text: 'Type',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Server',
          sortable: false,
          value: 'server',
        },
        {
          text: 'Reason',
          sortable: false,
          value: 'reason',
        },
        {
          text: 'Staff',
          sortable: false,
          value: 'staff',
        },
        {
          text: 'Date',
          sortable: false,
          value: 'date',
        },
        {
          text: 'Expires',
          sortable: false,
          value: 'active',
        },
      ],
    };
  },
  computed: {
    playerNotFound() {
      return !this.$apollo.queries.player.loading && this.player == null;
    },
    playerAvatarUrl() {
      if (this.player == null) {
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
    playerHistoryData() {
      if (this.player == null) return null;

      return this.player.bans.map(ban => ({
        type: 'Ban',
        server: ban.server,
        reason: ban.reason,
        staff: ban.staff,
        date: this.formatDate(ban.begin),
        end: (ban.end == null) ? 'Never' : this.formatDate(ban.end),
      }))
        .concat(this.player.kicks.map(kick => ({
          type: 'Kick',
          server: kick.server,
          reason: kick.reason,
          staff: kick.staff,
          date: this.formatDate(kick.date),
          end: 'N/A',
        })))
        .concat(this.player.mutes.map(mute => ({
          type: 'Mute',
          server: mute.server,
          reason: mute.reason,
          staff: mute.staff,
          date: this.formatDate(mute.begin),
          end: (mute.end == null) ? 'Never' : this.formatDate(mute.end),
        })))
        .concat(this.player.warns.map(warn => ({
          type: 'Warning',
          server: 'N/A',
          reason: warn.reason,
          staff: warn.staff,
          date: this.formatDate(warn.date),
          end: 'N/A',
        })));
    },
  },
  methods: {
    formatDate(date) {
      if (date == null) {
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
            bans {
              end
              staff
              reason
              begin
              server
            }
            kicks {
              staff
              reason
              date
              server
            }
            mutes {
              end
              staff
              reason
              begin
              server
            }
            warns {
              staff
              reason
              date
            }
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
