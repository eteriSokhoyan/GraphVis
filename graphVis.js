 $.ajaxSetup({async: false});

 $(function(){ // on dom ready

var demoNodes = [];
var demoEdges = [];

 //var url = 'graphData.json';
 
  $.ajax({
        'async': false,
        'global': false,
        'url': 'graphData.json',
        'dataType': "json",
        'success': function (data) {
           createGraph(data);
        }
 });
 
 
 ///////// get the json file
 
 document.getElementById('openFile').onchange = function(){

    var file = this.files[0];
	 url = file.name;
	var reader = new FileReader();
	//alert(url);
 
  
    //var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
		 //  console.log("no error");
           createGraph(data);
        },
		'error' :  function (data) {
			//console.log("error");           
			reader.onload = function(){
				var lines = this.result.split('\n');
				var chars;
				for(var line = 0; line < lines.length; line++){
					chars = lines[line].split(/,?\s+/);  // split by comma or space
								
					demoNodes.push({
						data: {
							id: chars[0],
							label:chars[0]
						}
					});
	
					for (var i = 1; i < chars.length; i++) {
						demoEdges.push({
							data: {
								source: chars[0],
								target: chars[i],
								id: chars[0] + chars[i],
								
							}
						})
					}			  
				}
		
				parseAndCreate(demoNodes,demoEdges);
			};
			 reader.readAsText(file);
        }
    });
  

} //// end document.getElementById
 
///////// create graph
 function createGraph(data) {
	var cy = cytoscape({		

		container: document.getElementById('cy'), 
	
		elements : data,	
		layout: {
			// name: 'random',
			name: 'breadthfirst'
			//avoidOverlap: true,
			//padding: 10
		},
		ready: function(){
			//mychange();
			window.cy = this;
		},	
		style: cytoscape.stylesheet()
						.selector('node')
						.css({
							//'content': showNodeLabel,
							'text-valign':'center',
							'background-color': '#888888',
							'opacity': 0.8
						/*	'pie-size': '100%',
							'pie-1-background-color': '#E8747C',
							'pie-1-background-size': '50%',
							'pie-1-background-size': 'mapData(value, 0, 40, 0, 100)',
							'pie-2-background-color': '#74E883',
							'pie-2-background-size': '50%'
						*/	
						})
						.selector('edge')
						.css({
							'target-arrow-shape': 'triangle',
							'width': 4,
							'line-color': '#ddd',
							'target-arrow-color': '#ddd',
						//	'content': showEdgeLabel
						})
						.selector(':selected')
						.css({
							'background-color': '#FE2E64',
							'line-color': '#FE2E64',
							'target-arrow-color': '#FE2E64',
							'source-arrow-color': '#FE2E64',
							'opacity': 1
						})
  });  	// END create graph
}			

 function parseAndCreate(demoNodes,demoEdges){
	var data = {
            nodes: demoNodes,
            edges: demoEdges };
	createGraph(data);
 }

 

}); // END on dom ready