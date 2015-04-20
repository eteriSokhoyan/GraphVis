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
	
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
		
		 parseJson(data); // *
		 
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
 
 $( "select option:selected" ).each(function() {
		myLayout = $( this ).text();
    });
	
	/*var allcy = cytoscape({
		headless: true,
	});
	
	var cy = cytoscape({		

		container: document.getElementById('cy'),
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
	allcy.load(data);
	cy.add(allcy.nodes().roots().closedNeighborhood());
	
	cy.load( cy.elements('*').jsons());
	cy.nodes().on("click", function(){
	/*
			var selectedNode = this;
			var selectedNodeId = selectedNode.data('id');
			console.log(selectedNodeId);
			
		var nodesToAdd = allcy.nodes('node#1');
			console.log("node id from allcy = " + nodesToAdd.data('id'));
	
		cy.remove(cy.elements());
cy.add(allcy.nodes().closedNeighborhood());

cy.load( cy.elements('*').jsons() );
	//allcy.$('#1').outgoers();
			//console.log(cy.elements('#thisId').data('id'));
			//cy.add(nodesToAdd.outgoers());
			//cy.load( cy.elements('*').jsons());
			
	});
	
	
	*/
	
	
	var cy = cytoscape({		

		container: document.getElementById('cy'), 
	
		elements : data,	
		layout: {
			// name: 'random',
			name: myLayout
			//avoidOverlap: true,
			//padding: 10
		},
		  hideEdgesOnViewport: true,
		  hideLabelsOnViewport : true,
		  motionBlur : true,
		  textureOnViewport : true,
		 // pixelRatio: 0.666,

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
							
						})
						.selector('edge')
						.css({
							'curve-style' : 'unbundled-bezier',
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
						.selector('core')
						.css({
							'outside-texture-bg-color' : 'white'
							
							//'active-bg-size' : 100
						})
  });
  
  cy.boxSelectionEnabled(true);
  
  
/*  
  cy.cxtmenu({
					selector: 'node',
					menuRadius: 50, 
					indicatorSize: 12,
					commands: [
						{
							content: '<span class="fa fa-flash fa-2x">node info</span>',
							select: function(){
								console.log( this.data('name') );
							
							}
						},
						{
							content: '<span class="fa fa-star fa-2x"></span>',
							select: function(){
								console.log( this.data('name') );
							}
						},
						{
							content: 'Text',
							select: function(){
								console.log( "on text" );
							}
						},
						{
							content: 'Text2',
							select: function(){
								console.log( "on text2" );
							}
						},
						{
							content: 'Text2',
							select: function(){
								console.log( "on text2" );
							}
						}
					]
				});
				
*/			
  
  
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
 
	
 
	if(dataToParse.links == null){

		var links = dataToParse.edges;
	}
	else{
		var links = dataToParse.links;
		dataToParse.edges = links;
		
	}
 
	var nodes = dataToParse.nodes;
	
	
	
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
