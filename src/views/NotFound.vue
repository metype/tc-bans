<template>
    <div>
        <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <h1 class="mb-5">Page not found</h1>
                <img :src="squidSrc">
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Squid from '@/assets/squid.png';

    export default {
      name: 'NotFound',
      computed: {
        squidSrc() {
          return Squid;
        }
      }
    }
</script>