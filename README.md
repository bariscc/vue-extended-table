### Features

This Vue plugin is a wrapper around vue-good-table, PptxGenJS and html2canvas for data exporting.
Currently features are:
Exposes PptxGenJS and html2canvas objects globally via `this.$PptxGenJS`



### Installation

First, install with:
`$ npm install vue-extended-table`

Then add it globally on your Vue Instance (main.js):

	// main.js
	
	import ExtendedTable from "extended-table";
	Vue.use(ExtendedTable);

or, import to a component and register:

	// MyComponent.vue
	
	import ExtendedTable from "extended-table";
	...

	components: {
		ExtendedTable
	}


### Methods

	<ExtendedTable :tableData="tableData" exportType="pptxImage" :onExport="myExportFn" fileName='MyFile' />

| Props         | Description                    |
| ------------- | ------------------------------ |
| `tableData`   | accepts VueGoodTable props.    |
| `exportType`  | Optional, default is 'ptxTable'. Currently accepts 'pptxTable' or 'pptxImage'.    |
| `onExport`    | Optional. if not used, a default export will be created and downloaded. Returns `(pptx, data)` if a function provided. |
| `fileName`    | optional. default is 'Report'. Extension is not required.    |

### Customization

## onExport

Returns a `pptxGenJS` instance and `data`.
`data` is either an array to be used in the pptx or a Base64 image depending on `exportType`.

## Exposed methods

Once the plugin imported, the objects `this.$pptxGenJS` and `this.$canvas2html` can be accessed from vue instance for further customization. 

### Links

[vue-good-table](https://github.com/xaksis/vue-good-table)
[vue-good-table](https://github.com/gitbrent/PptxGenJS)