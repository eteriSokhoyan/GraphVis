 $.ajaxSetup({async: false});

var showNodeLabel;
var showEdgeLabel;
var showOut; 
var showIn; 
var demoNodes = [];
var demoEdges = [];
var myLayout;
 
 $(function(){ // on dom ready
  
  $.ajax({
        'async': false,
        'global': false,
        'url': 'nodelinkjson_output.json',
        'dataType': "json",
        'success': function (data) {
		 parseJson(data);
         //  createGraph(data);
        }
 });
 
 
 ///////// get the json file
 
 document.getElementById('openFile').onchange = function(){

    var file = this.files[0];
	var fname = file.name;
	 url = URL.createObjectURL(event.target.files[0]);
	 
	 var fileExt= fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
	
	 
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
         // createGraph(data);
		 parseJson(data); // *
		 
        },
		'error' :  function (data) {
			//console.log("error");   
		if(fileExt == "json" ){
			
			 parseJson(data);
		}
		else {
		
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
        }
    });
  

} //// end document.getElementById
 

///////// create graph
 function createGraph(data) {
 
 $( "select option:selected" ).each(function() {
		myLayout = $( this ).text();
    });
	var cy = cytoscape({		

		container: document.getElementById('cy'), 
	
		elements : data,	
		layout: {
			// name: 'random',
			name: myLayout
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
							'content': showNodeLabel,
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
							'content': showEdgeLabel
						})
						.selector(':selected')
						.css({
							'background-color': '#FE2E64',
							'line-color': '#FE2E64',
							'target-arrow-color': '#FE2E64',
							'source-arrow-color': '#FE2E64',
							'opacity': 1
						})
  });
  cy.boxSelectionEnabled(true);
  
  if($('#showInNode').is(":checked")){
		showIn = true;
		cy.nodes().on("click", highlightIn);
	}
	else {
		showIn = false;
	}
	if($('#showOutNode').is(":checked")){
		showOut = true;
		cy.nodes().on("click", highlightOut);
	}
	else {
		showOut = false;
	}
	
  
}		// END create graph	

 function parseAndCreate(demoNodes,demoEdges){
	var data = {
            nodes: demoNodes,
            edges: demoEdges };
	createGraph(data);
 }
 
 
 
 function parseJson(dataToParse){
 
	//console.log(dataToParse);
	if(dataToParse.links == null){
		//console.log("no links");
		var links = dataToParse.edges;
	}
	else{
		var links = dataToParse.links;
		dataToParse.edges = links;
		
	}
 
	var nodes = dataToParse.nodes;
	//var nodes = dataToParse;
	
	
			
	for(var i = 0; i<nodes.length; i++){
	
		dataToParse.nodes[i].data = nodes[i];
		dataToParse.nodes[i].data.id = '"' +  nodes[i].id + '"';
	}
	
	
	for(var i = 0; i<links.length; i++){
		
		dataToParse.edges[i].data = links[i];
		dataToParse.edges[i].data.source = '"' +  links[i].source + '"';
		dataToParse.edges[i].data.target = '"' +  links[i].target + '"';
	}
	
	createGraph(dataToParse);
}
 	
}); // END on dom ready
