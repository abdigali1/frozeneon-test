<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          {{ data.name }}
        </v-col>
        <v-col>
          <v-chip style="margin-right: 1rem">{{ data.version }}</v-chip>
          <v-chip>
            <v-icon style="margin-right: 0.5rem">mdi-scale-balance</v-icon>
            {{ data.license }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          {{ data.description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip
            v-for="item in data.keywords"
            :key="item"
            style="margin-right: 1rem"
            >{{ item }}</v-chip
          >
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-footer padless>
      <v-col>
        <v-avatar tile size="25" style="margin-right: 1rem">
          <img :src="data.owner.avatar" alt="" />
        </v-avatar>
        {{ data.owner.name }}
      </v-col>
      <v-col>
        <a
          :href="data.owner.link"
          target="_blank"
          style="text-decoration: none"
        >
          <v-icon>mdi-github</v-icon>
        </a>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
};
</script>
