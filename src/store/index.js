import Vue from "vue";
import Vuex from "vuex";
import { exceptionHandler } from "../utils/handlers";
import search from "../utils/search";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packageList: [],
    meta: {},
    loading: false,
  },
  getters: {
    getPackageList: (state) => state.packageList,
    getResponseMeta: (state) => state.meta,
  },
  mutations: {
    setPackageList(state, data) {
      state.packageList = data;
    },
    setResponseMeta(state, { hitsPerPage, nbHits, nbPages, page }) {
      state.meta = {
        hitsPerPage,
        maxHits: nbHits,
        maxPages: nbPages,
        page,
      };
    },
    clearPackageList(state) {
      state.packageList = [];
      state.meta = {};
    },
  },
  actions: {
    async fetchPackageList({ commit }, { query, page }) {
      console.log("test", query, page);
      this.loading = true;
      try {
        return await search(query, page).then((result) => {
          if (result.query === query) {
            console.log(result);
            commit("setPackageList", result.response.hits);
            commit("setResponseMeta", result.response);
          }
        });
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
