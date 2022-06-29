<template>
  <div class="frozeneon" data-app>
    <div class="frozeneon__header">
      <div class="frozeneon__header-content">
        <img
          src="https://cdn.jsdelivr.net/www.jsdelivr.com/b61fc52e3e828ce0579e510be1c480c7610ef076/img/logo-horizontal.svg"
          alt=""
        />
        <h1>A free CDN for Open Source</h1>
      </div>
    </div>
    <div class="frozeneon__content">
      <div class="frozeneon__form">
        <v-text-field
          v-model="packageName"
          label="Package name"
          :loading="loading"
          @change="onChange"
        >
          <v-icon slot="prepend" color="green">mdi-magnify</v-icon>
        </v-text-field>
      </div>
      <div class="frozeneon__table">
        <template v-if="getPackageList.length">
          <v-simple-table>
            <template #default>
              <tbody>
                <tr v-for="item in getPackageList" :key="item.id">
                  <td style="padding: 1rem">
                    <v-card @click="openPackageModal(item)">
                      <v-card-title class="text-h5 grey lighten-2">
                        {{ item.name }}
                      </v-card-title>

                      <v-card-text>
                        {{ item.description }}
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-pagination
            color="#f98459"
            v-model="meta.page"
            :length="getResponseMeta.maxPages"
            :total-visible="meta.totalVisible"
            @input="OnPageChange"
          ></v-pagination>
        </template>
        <template v-else>
          <div class="frozeneon__empty">Start searching npm packages!</div>
        </template>
      </div>
    </div>
    <v-dialog v-model="dialog" width="700">
      <package-modal :data="packageData"></package-modal>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import PackageModal from "./components/PackageModal.vue";

export default {
  name: "App",
  components: { PackageModal },
  data: () => ({
    packageName: "",
    loading: false,
    dialog: false,
    packageData: {},
    meta: {
      page: 1,
      length: 10,
      totalVisible: 5,
    },
  }),
  computed: {
    ...mapGetters(["getPackageList", "getResponseMeta"]),
  },
  methods: {
    ...mapActions(["fetchPackageList"]),
    ...mapMutations(["clearPackageList"]),
    onChange(value) {
      if (value) this.fetchPackageList({ query: this.packageName });
      else this.clearPackageList();
    },
    OnPageChange(page) {
      this.fetchPackageList({
        query: this.packageName,
        page: page - 1,
      });
    },
    openPackageModal(packageData) {
      this.dialog = true;
      this.packageData = packageData;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";

.frozeneon {
  &__content {
    max-width: 1080px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  &__header {
    background: #f98459;
    padding: 1rem;
  }
  &__header-content {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-weight: bold;
      margin-right: 9rem;
    }

    @media only screen and (max-width: 600px) {
      img {
        width: 110px;
      }
      h1 {
        font-size: 17px;
        margin-right: 0;
      }
    }
  }
  &__empty {
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
}
</style>
