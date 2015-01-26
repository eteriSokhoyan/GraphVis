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
			showOutNodes(showOut);
        }
		else{ 
			showOut = false;
			showOutNodes(showOut);
		}
    });  


//////// checkBox for highlighting incoming nodes
var showIn=false; 

	$('#showInNode').change(function() {
		
        if($(this).is(":checked")) {
			showIn = true;
			showInNodes(showIn);
        }
		else{ 
			showIn = false;
			showInNodes(showIn);
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
		
//////// OnClick show outgoing nodes
function showOutNodes(showOut){
	
	if(showOut){
				
		cy.nodes().on("click", highlightOut);
		
	}
	else {
	
		cy.nodes().off("click", highlightOut);
	
	}

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



//////// OnClick show inComing nodes
function showInNodes(showIn){
	
	
	if(showIn){
		
		cy.nodes().on("click", highlightIn);
		
	}
	else {
		cy.nodes().off("click", highlightIn);
	}

}
