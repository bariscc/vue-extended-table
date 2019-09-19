<template>
  <div class="extended">
    <Button @click="onClickExport()">Export</Button>
    <div class="capture" ref="captureDiv">
      <VueGoodTable v-if='tableData' v-bind="tableData">
        <slot></slot>  
      </VueGoodTable>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
/* import "vue-good-table/dist/vue-good-table.css"; */
import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";
import { pptxTableParser } from "./helper";
import CONSTANTS from "./constants";

export default {
  name: "ExtendedTable",
  components: {
    VueGoodTable
  },
  props: {
    tableData: {
      data: Object
    },
    exportType: {
      data: String,
      default() {
        return "pptxImage";
      },
      validator: function(value) {
        return ["pptxTable", "pptxImage"].indexOf(value) !== -1;
      }
    },
    onExport: Function,
    fileName: {
      data: String,
      default() {
        return "Report";
      }
    }
  },
  methods: {
    onClickExport() {
      switch (this.exportType) {
        case "pptxTable":
          this.exportPptxTable();
          break;
        case "pptxImage":
          this.exportPptxImage();
          break;
        default:
          return;
      }
    },
    exportPptxTable() {
      const pptx = new PptxGenJS();
      const pptxTable = pptxTableParser(this.tableData);

      if (this.onExport) {
        this.onExport(pptx, pptxTable);
      } 
      else {
        // default export
        const slide = pptx.addNewSlide();
        slide.addTable(pptxTable, CONSTANTS.PPTX_PAGE_POS);
        pptx.save(this.fileName);
      }
    },
    exportPptxImage() {
      const pptx = new PptxGenJS();

      let image;

      html2canvas(document.querySelector(".capture")).then(canvas => {
        image = canvas.toDataURL();
        const rect = {
          w: canvas.width,
          h: canvas.height,
          ratio: canvas.width / canvas.height
        };

        if (this.onExport) {
          this.onExport(pptx, image);
        } 
        else {
          // default export
          const slide = pptx.addNewSlide();
          slide.addImage({
            data: image,
            w: rect.w,
            h: rect.h,
            ...CONSTANTS.IMAGE
          });
          pptx.save(this.fileName);
        }
      });
    }
  }
};
</script>
