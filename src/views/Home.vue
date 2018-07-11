<template>
  <List v-if="bans" :data="bans" type="Bans"></List>
</template>

<script>
import gql from 'graphql-tag';
import List from '@/components/List';

export default {
  name: 'Home',
  components: { List },
  data() {
    return {
      bans: null,
    };
  },
  apollo: {
    bans: gql`
    {
  bans {
    player {
      uuid
      name
    }
    active
    reason
    staff
    server
    begin
    end
  }
}

    `,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
