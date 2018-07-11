<template>
  <div>
    <h1 v-if="type !== 'ban'">Invalid type</h1>
    <div v-else-if="bans">
      <ListView :data="bans" :type="type"></ListView>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ListView from '@/components/ListView';

export default {
  name: 'Home',
  components: { ListView },
  data() {
    return {
      bans: null,
    };
  },
  props: {
    type: {
      required: true,
      type: String,
    },
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
