### Features

This Vue plugin is a wrapper around vue-good-table, PptxGenJS and html2canvas for data exporting.



### Installation

First, install with:
`$ npm install bariscc/vue-extended-table#master`

Then add it globally on your Vue Instance (main.js):

	// main.js
	
	import ExtendedTable from "extended-table";
	Vue.use(ExtendedTable);


### Methods

	<ExtendedTable 
		:tableData="tableData" 
		exportType="pptxImage" 
		:onExport="myExportFn" 
		fileName="MyFile"
		/>

| Props         | Type | Default | Description   
| ------------- |-------------| -----|   -----|                    
| `tableData`   | {} | Required | accepts VueGoodTable props.    
| `exportType`  | String | pptxTable | Currently accepts 'pptxTable' or 'pptxImage'.    
| `onExport`    | Fn |  | If not used, a default export will run. Returns `(pptx, data)` if a function provided. 
| `fileName`    | String | Report | Exported file name. Extension is not required.    

### Customization

#### onExport

Returns a `pptxGenJS` instance and `data`.

`data` is either an array to be used in the pptx or a Base64 image depending on `exportType`.

#### Exposed methods

Once the plugin imported, the objects `this.$pptxGenJS` and `this.$html2canvas` can be accessed from vue instance for further customization. 

### Links

[vue-good-table](https://github.com/xaksis/vue-good-table)
[PptxGenJS](https://github.com/gitbrent/PptxGenJS)
[html2canvas](https://html2canvas.hertzen.com/documentation)
