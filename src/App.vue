<template>
    <div>
        <v-app>
            <v-toolbar color="primary" dark fixed clipped-left app>
                <v-toolbar-title to="/" > <!-- FIXME: clickable -->
                    {{$appName}}
                    <a href="https://forum.tallcraft.com/t/where-is-the-ban-list/72">
                        <v-chip>BETA</v-chip>
                    </a>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn href="https://forum.tallcraft.com/new-topic?category_id=5" flat>Ban Dispute</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
};
</script>
