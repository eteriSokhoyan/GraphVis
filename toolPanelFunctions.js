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
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
    		var connectedNodes = connectedEdges.targets();
			
			if(selectedNode.hasClass('selectedNodeOut')){
			
				connectedNodes.toggleClass('connectedNode', false);
				connectedEdges.toggleClass('connectedNode', false);
				selectedNode.toggleClass('selectedNodeOut', false);

				cy.style()
				  .selector('.connectedNode')
				  .css({
					'opacity': 1
					})
				  .update() ;
			}
			
			else {
				//connectedNodes.flashClass('connectedNode',1500);			
				//connectedEdges.flashClass('connectedNode',1500);		
			
				connectedNodes.toggleClass('connectedNode', true);
				connectedEdges.toggleClass('connectedNode', true);
				selectedNode.toggleClass('selectedNodeOut', true);
				cy.style()
				  .selector('.connectedNode')
				  .css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 0.8
					})
				  .update() ;
				  				  
				  cy.style()
				  .selector('.selectedNodeOut')
				  .css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 0.8,
					'border-width': 4,
					})
				  .update() ;
			}
	}
		

//////////// find inComing nodes

	function highlightIn (){
			
			var selectedNode = this;
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.source().anySame( selectedNode );
									});
    
			var connectedNodes = connectedEdges.sources();
			
		
			if(selectedNode.hasClass('selectedNodeIn')){
			
				connectedNodes.toggleClass('connectedNode', false);
				connectedEdges.toggleClass('connectedNode', false);
				selectedNode.toggleClass('selectedNodeIn', false);
				cy.style()
				  .selector('.connectedNode')
				  .css({
					'opacity': 1
					})
				  .update() ;
			}
			else {
				
				connectedNodes.toggleClass('connectedNode', true);
				connectedEdges.toggleClass('connectedNode', true);
				selectedNode.toggleClass('selectedNodeIn', true);
				cy.style()
				  .selector('.connectedNode')
				  .css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 0.8
					})
				  .update() ;
				  				  
				  cy.style()
				  .selector('.selectedNodeIn')
				  .css({
					'background-color': 'green',
					'line-color': 'green',
					'target-arrow-color': 'green',
					'source-arrow-color': 'green',
					'opacity': 0.8,
					'border-width': 4,
					})
				  .update() ;
			}
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
	var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
	var connectedNodes = connectedEdges.targets();
			
			// expand node if it was collapsed before
	if(connectedNodes.hasClass('collapsedNode')){
			
		connectedNodes.toggleClass('collapsedNode',false);					
		connectedEdges.toggleClass('collapsedNode',false);		
		selectedNode.toggleClass('superNode',false);
				
			cy.style()
			  .selector('.collapsedNode')
			  .css({
				'background-color': 'green',
				'line-color': 'green',
				'target-arrow-color': 'green',
				'source-arrow-color': 'green',
				'opacity': 1,
				})
			 .update() ;
		
			cy.style()
			  .selector('.superNode')
			  .css({
				'opacity': 1,	
				})
			  .update() ;
			
	}
			//// collapse node if it was not collaped before
	else {

		connectedNodes.toggleClass('collapsedNode',true);					
		connectedEdges.toggleClass('collapsedNode',true);		
		selectedNode.toggleClass('superNode',true);
			
			cy.style()
			  .selector('.collapsedNode')
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
			  .selector('.superNode')
			  .css({
				'opacity': 1,
				'width': 50,
				'height': 50
				})
			  .update() ;
			
	}

}




