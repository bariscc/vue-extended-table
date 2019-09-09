import { VueGoodTable } from 'vue-good-table';
import PptxGenJS from 'pptxgenjs';
import html2canvas from 'html2canvas';

var pptxTableParser = function (tableData) {
  var headerArray = tableData.columns.reduce(function (o, i) {
    o.push(i.label);
    return o;
  }, []);

  var headerKeys = tableData.columns.reduce(function (o, i) {
    o.push(i.field);
    return o;
  }, []);

  var dataArray = tableData.rows.reduce(function (o, i) {
    var entry = [];
    for (var key in i) {
      if (headerKeys.indexOf(key) > -1) {
        entry.push(i[key]);
      }
    }
    if (entry.length) {
      o.push(entry);
    }
    return o;
  }, []);

  return [headerArray ].concat( dataArray);
};

var CONSTANTS = {
  IMAGE: {
    x: 2.25,
    y: 0.06,
    sizing: {
      type: "contain",
      w: 5.5,
      h: 5.5
    }
  },
  PPTX_PAGE_POS: {
    x: 0.5,
    y: 0.5
  }
};

//

var script = {
  name: "ExtendedTable",
  components: {
    VueGoodTable: VueGoodTable
  },
  props: {
    tableData: {
      data: Object,
      required: true
    },
    exportType: {
      data: String,
      default: function default$1() {
        return "pptxTable";
      },
      validator: function(value) {
        return ["pptxTable", "pptxImage"].indexOf(value) !== -1;
      }
    },
    onExport: Function,
    fileName: {
      data: String,
      default: function default$2() {
        return "Report";
      }
    }
  },
  methods: {
    onClickExport: function onClickExport() {
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
    exportPptxTable: function exportPptxTable() {
      var pptx = new PptxGenJS();
      var pptxTable = pptxTableParser(this.tableData);

      if (this.onExport) {
        this.onExport(pptx, pptxTable);
      } 
      else {
        // default export
        var slide = pptx.addNewSlide();
        slide.addTable(pptxTable, CONSTANTS.PPTX_PAGE_POS);
        pptx.save(this.fileName);
      }
    },
    exportPptxImage: function exportPptxImage() {
      var this$1 = this;

      var pptx = new PptxGenJS();

      var image;

      html2canvas(document.querySelector(".capture")).then(function (canvas) {
        image = canvas.toDataURL();
        var rect = {
          w: canvas.width,
          h: canvas.height,
          ratio: canvas.width / canvas.height
        };

        if (this$1.onExport) {
          this$1.onExport(pptx, image);
        } 
        else {
          // default export
          var slide = pptx.addNewSlide();
          slide.addImage(Object.assign({}, {data: image,
            w: rect.w,
            h: rect.h},
            CONSTANTS.IMAGE));
          pptx.save(this$1.fileName);
        }
      });
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "extended" },
    [
      _c(
        "Button",
        {
          on: {
            click: function($event) {
              return _vm.onClickExport()
            }
          }
        },
        [_vm._v("Export")]
      ),
      _vm._v(" "),
      _c(
        "div",
        { ref: "captureDiv", staticClass: "capture" },
        [
          _c(
            "VueGoodTable",
            _vm._b({}, "VueGoodTable", _vm.tableData, false),
            [_vm._t("default")],
            2
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ExtendedTable = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var plugin = {
  install: function install(Vue, options) {
    Vue.component("ExtendedTable", ExtendedTable);
    Vue.prototype.$PptxGenJS = PptxGenJS;
    Vue.prototype.$html2canvas = html2canvas;
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
