<template>
  <div>
      <v-data-table
              v-if="bans"
              :headers="tableHeaders"
              :items="tableItems"
              :pagination.sync="pagination"
              :total-items="999"
              :loading="$apollo.loading.ban"
              class="elevation-1"
              item-key="id"
      >
          <template slot="items" slot-scope="props">
              <td v-for="(item, i) in props.item" :key="i">
                  {{ item }}
              </td>
          </template>
      </v-data-table>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ListView',
  props: {
    watch: {
      // Get new data when the pagination (table buttons) updates
      pagination: {
        handler() {
          // TODO: call apollo to re-fetch with changed page number
        },
        deep: true,
      },
    },
  },
  data() {
    return {
      bans: null,
      pagination: {
        rowsPerPage: 10,
        page: 1,
      },
    };
  },
  methods: {
  },
  computed: {
    pageSize() {
      return this.pagination.rowsPerPage;
    },
    pageNumber() {
      return this.pagination.page;
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
          text: label[0].toUpperCase() + label.substr(1),
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
          r.begin = new Date(row.begin).toLocaleDateString();
        }
        if (row.end) {
          r.end = new Date(row.end).toLocaleDateString();
        }
        // eslint-disable-next-line no-underscore-dangle
        delete r.__typename;
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
      }
    }`,
      // Static parameters
      variables() {
        return {
          limit: this.pageSize,
          offset: this.pageNumber,
        };
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
