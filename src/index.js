import ExtendedTable from "./ExtendedTable.vue";
import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";

const plugin = {
  install(Vue, options) {
    Vue.component("v-table", ExtendedTable);
    Vue.prototype.$PptxGenJS = PptxGenJS;
    Vue.prototype.$html2canvas = html2canvas;
  }
};

export default plugin;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}