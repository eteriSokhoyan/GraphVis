///// checkBox  for Labels
var showNodeLabel = "data(id)";
var showEdgeLabel = "data(label)";

  $('#nodeLabelCheck').change(function() {
        if($(this).is(":checked")) {
			showNodeLabel = "data(id)";		
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
			showEdgeLabel = "data(id)";		////// change back to label!!!!
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
			resetHighlightOut(showIn,showOut); 
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
			resetHighlightIn(showIn,showOut);
			cy.nodes().removeClass('connectedNodeIn');
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
			
				connectedNodes.removeClass('connectedNodeOut');
				connectedEdges.removeClass('connectedNodeOut');
				selectedNode.removeClass('selectedNodeOut');

				cy.style()
				  .selector('.connectedNodeOut')
				  .css({
					'opacity': 0.8
					})
				  .update() ;
			}
			
			else {
				//connectedNodes.flashClass('connectedNodeOut',1500);			
				//connectedEdges.flashClass('connectedNodeOut',1500);		
			
				cy.nodes().not(this).removeClass('connectedNodeOut');
				cy.nodes().not(this).removeClass('selectedNodeOut');
				cy.edges().not(this).removeClass('connectedNodeOut');
			
				connectedNodes.addClass('connectedNodeOut');
				connectedEdges.addClass('connectedNodeOut');
				selectedNode.addClass('selectedNodeOut');
				cy.style()
				  .selector('.connectedNodeOut')
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
		
		
	function resetHighlightOut(showIn,showOut){
	
			cy.style()
				  .selector('.connectedNodeOut')
				  .css({
					'opacity': 0.8,
					'background-color': '#888888',
					'line-color': '#ddd',
					'target-arrow-color': '#ddd'
					})
				  .update() ;
				  
				  
			if(!showIn && !showOut){		
				cy.style()		
				  .selector('.selectedNodeOut')
				  .css({
					'opacity': 0.8,
					'background-color': '#888888', //
					'border-width': 0
					})	
				  .update() ;
		
			}
				cy.nodes().removeClass('selectedNodeOut');
				cy.nodes().removeClass('connectedNodeOut');
				cy.edges().removeClass('connectedNodeOut');
	}
	
	
	function resetHighlightIn(showIn,showOut){
	
			cy.style()
				  .selector('.connectedNodeIn')
				  .css({
					'opacity': 0.8,
					'background-color': '#888888',
					'line-color': '#ddd',
					'target-arrow-color': '#ddd'
					})
					.update() ;
					
			if(!showIn && !showOut){		
				cy.style()		
				  .selector('.selectedNodeIn')
				  .css({
					'opacity': 0.8,
					'background-color': '#888888', //
					'border-width': 0
					})	
				  .update() ;
			}	  
			
			cy.nodes().removeClass('selectedNodeIn');
			cy.nodes().removeClass('connectedNodeIn');
			cy.edges().removeClass('connectedNodeIn');
		
	}
		
		
//////////// find inComing nodes

	function highlightIn (){
			
			var selectedNode = this;
			var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.source().anySame( selectedNode );
									});
    
			var connectedNodes = connectedEdges.sources();
			
		
			if(selectedNode.hasClass('selectedNodeIn')){
			
				connectedNodes.removeClass('connectedNodeIn');
				connectedEdges.removeClass('connectedNodeIn');
				selectedNode.removeClass('selectedNodeIn');
				cy.style()
				  .selector('.connectedNodeIn')
				  .css({
					'opacity': 0.8
					})
				  .update() ;
			}
			else {
			
			
				cy.nodes().not(this).removeClass('connectedNodeIn');
				cy.nodes().not(this).removeClass('selectedNodeIn');
				cy.edges().not(this).removeClass('connectedNodeIn');
				
				connectedNodes.addClass('connectedNodeIn');
				connectedEdges.addClass('connectedNodeIn');
				selectedNode.addClass('selectedNodeIn');
				cy.style()
				  .selector('.connectedNodeIn')
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



