/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import HighchartsVue from "highcharts-vue";
import registerLayouts from "../layouts/layout";

import { GlobalComponents } from "../components";

import { useAppStore } from "@/store/app";

export function registerPlugins(app) {
  registerLayouts(app);
  GlobalComponents(app);
  app.use(vuetify).use(router).use(pinia).use(HighchartsVue);
  app.directive("acl",  (el, binding) => {
    const appStore = useAppStore();
    if (!appStore.hasPermission(binding.value)) {
      el.style.display = "none";
    }
  });
}
