<template>
  <div>
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'ListView',
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
