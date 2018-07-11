<template>
  <div>
    <h1>List of {{type}}</h1>
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    type: {
      required: true,
      type: String,
    },
    data: {
      required: true,
      validator(data) {
        return Array.isArray(data);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
