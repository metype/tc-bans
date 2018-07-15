<template>
  <div>
      <ListView></ListView>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue';

export default {
  name: 'List',
  components: { ListView },
  data() {
    return {};
  },
  props: {
    type: {
      required: true,
      type: String,
    },
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
