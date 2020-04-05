<template>
  <div>
      <v-data-table
              v-if="bans"
              :headers="tableHeaders"
              :items="tableItems"
              :pagination.sync="pagination"
              :rows-per-page-items="pageSizeOptions"
              :total-items="totalItems"
              :loading="$apollo.queries.bans.loading"
              class="elevation-1"
              item-key="id"
      >
          <template slot="items" slot-scope="props">
              <td v-for="(item, key) in props.item" :key="key">
                  <router-link
                          v-if="key === 'player'"
                          :to="`/player/${item}`">
                      {{ item }}
                  </router-link>
                  <template v-else>{{item}}</template>
              </td>
          </template>
      </v-data-table>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default {
  name: 'ListView',
  props: {},
  data() {
    return {
      bans: null,
      pagination: {
        rowsPerPage: 10,
        page: 1,
      },
      pageSizeOptions: [5, 10, 25, 50],
    };
  },
  methods: {
  },
  computed: {
    pageSize() {
      return this.pagination.rowsPerPage;
    },
    offset() {
      return (this.pagination.page - 1) * this.pageSize;
    },
    totalItems() {
      // TODO: return total item field from this.bans
      return 999;
    },
    tableHeaders() {
      // If there is no bans don't return any headers
      if (this.bans == null || this.bans.length === 0) {
        return [];
      }
      return Object.keys(this.bans[0]).map((label) => {
        if (label.startsWith('__')) return null;
        return {
          sortable: false,
          text: (label[0].toUpperCase() + label.substr(1) === 'End') ? 'Expires' : label[0].toUpperCase() + label.substr(1),
          value: label,
        };
      }).filter(l => l != null);
    },
    tableItems() {
      return this.bans.map((row) => {
        const r = this.$clone(row);
        if (row.player) {
          r.player = row.player.name;
        }
        if (row.begin) {
          r.begin = new Date(row.begin).toLocaleString();
        }
        if (row.end) {
          r.expires = new Date(row.end).toLocaleString();
        } else {
          r.expires = 'Never';
        }
        // eslint-disable-next-line no-underscore-dangle
        delete r.__typename;
        delete r.end;
        return r;
      });
    },
  },
  apollo: {
    // Query with parameters
    bans: {
      // gql query
      query: gql`query bans($limit: Int!, $offset: Int!) {
      bans(limit: $limit, offset: $offset, banState: true  ) {
            player {
            uuid
            name
            }
        reason
        staff
        server
        begin
        end
      }
    }`,
      // Static parameters
      variables() {
        return {
          limit: this.pageSize,
          offset: this.offset,
        };
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: unset;
    }
</style>
