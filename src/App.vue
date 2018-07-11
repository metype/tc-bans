<template>
    <div>
        <v-app>
            <v-toolbar color="primary" dark fixed clipped-left app>
                <v-toolbar-title>{{$appName}}</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-bottom-nav :value="true" absolute color="transparent">
                <v-btn color="teal" flat to="/list/ban">
                    <span>Bans</span>
                    <v-icon>account_circle</v-icon>
                </v-btn>
                <!--<v-btn color="teal" flat to="/list/kick">-->
                    <!--<span>Kick</span>-->
                    <!--<v-icon>history</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn color="teal" flat to="/list/warn">-->
                    <!--<span>Warning</span>-->
                    <!--<v-icon>history</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn color="teal" flat to="/list/mute">-->
                    <!--<span>Mute</span>-->
                    <!--<v-icon>history</v-icon>-->
                <!--</v-btn>-->
            </v-bottom-nav>
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
