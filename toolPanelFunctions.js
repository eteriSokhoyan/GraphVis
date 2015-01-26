///// checkBox  for Labels
var showNodeLabel = "data(label)";
var showEdgeLabel = "data(label)";

  $('#nodeLabelCheck').change(function() {
        if($(this).is(":checked")) {
			showNodeLabel = "data(label)";		
        }
        else{
			showNodeLabel = "";	
		}
		
		cy.style()
			.selector('node')
			.css({'content': showNodeLabel})
			.update() ;
    });
	
	$('#linkLabelCheck').change(function() {
        if($(this).is(":checked")) {
			showEdgeLabel = "data(label)";		
        }
        else{
			showEdgeLabel = "";
		}
		
		cy.style()
			.selector('edge')
			.css({'content': showEdgeLabel})
			.update() ;
    });


//////// selectionBox for the shape
$('#selectShape').change(function() {
	var shape="";
        $( "select option:selected" ).each(function() {
		shape = $( this ).text();
    });
	cy.makeLayout({'name': shape})
	  .run() ;
			
	});

//////// checkBox for highlighting outgoing nodes
var showOut=false; 

	$('#showOutNode').change(function() {
		
        if($(this).is(":checked")) {
			showOut = true;
			cy.nodes().on("click", highlightOut);
        }
		else{ 
			showOut = false;
			cy.nodes().off("click", highlightOut);
		}
    });  


//////// checkBox for highlighting incoming nodes
var showIn=false; 

	$('#showInNode').change(function() {
		
        if($(this).is(":checked")) {
			showIn = true;
			cy.nodes().on("click", highlightIn);
        }
		else{ 
			showIn = false;
			cy.nodes().off("click", highlightIn);
		}
    });  


///////// finding outgoing Nodes		
	function highlightOut(){
			
			var selectedNode = this;
			//var child = selectedNode.children();
			
			
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
    
			var connectedNodes = connectedEdges.targets();
			
			connectedNodes.flashClass('sNode',1500);			
			connectedEdges.flashClass('sNode',1500);		
			
			//connectedNodes.toggleClass('sNode', true);
			//connectedEdges.toggleClass('sNode', true);
			
			cy.style()
			.selector('.sNode')
			.css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 1
					
					})
			.update() ;
			//connectedNodes.toggleClass('sNode', false);
			//connectedEdges.toggleClass('sNode', false);
	}
		

//////////// find inComing nodes

	function highlightIn (){
			
			var selectedNode = this;
			//var child = selectedNode.children();
			
			
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.source().anySame( selectedNode );
									});
    
			var connectedNodes = connectedEdges.sources();
			
		
			connectedNodes.flashClass('sNode',1500);			
			connectedEdges.flashClass('sNode',1500);		
			
			
			
			cy.style()
			.selector('.sNode')
			.css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 1
					
					})
			.update() ;
			
		}

//// node Collapse

var collapse=false;
$('#compressNodeCheck').change(function() {
        if($(this).is(":checked")) {
			collapse = true;
			cy.nodes().on("cxttap ", colNode);
        }
        else{
			collapse = false;
			cy.nodes().off("cxttap ", colNode);
		}
		
});

function colNode(){
	
	var selectedNode = this;
			//var child = selectedNode.children();
			
			
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.source().anySame( selectedNode );
									});
    
			var connectedNodes = connectedEdges.sources();
			
		
			connectedNodes.toggleClass('hNode',true);					
			connectedEdges.toggleClass('hNode',true);		
			
			selectedNode.toggleClass('cNode',true);
			
			cy.style()
			.selector('.hNode')
			.css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 1,
					'visibility': 'hidden'
					})
			.update() ;
			
			cy.style()
			.selector('.cNode')
			.css({
					'opacity': 1,
					'width': 50,
					'height': 50
					
					})
			.update() ;
			
	

}




