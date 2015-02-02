
var collapse=false;
$('#compressNodeCheck').change(function() {
        if($(this).is(":checked")) {
			collapse = true;
			cy.nodes().on("cxttap", colNode);  //// "cxttap " sometimes not working ?!
        }
        else{
			collapse = false;
			cy.nodes().off("cxttap ", colNode);	//// "cxttap " sometimes not working ?!
			resetCollapse();
		}
		
});


function colNode(){
	
	var selectedNode = this;
	var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
	var connectedNodes = connectedEdges.targets();
		
	
			// expand node if it was collapsed before
	if(selectedNode.hasClass('superNode')){
			
		connectedNodes.removeClass('collapsedNode');					
		connectedEdges.removeClass('collapsedNode');		
		selectedNode.removeClass('superNode');
			
		removeCollapsedEdges(selectedNode);
		
		cy.style()
		  .update() ;// remove invisibility
			
		
	}
			//// collapse node if it was not collaped before
	else {

		connectedNodes.addClass('collapsedNode');					
		connectedEdges.addClass('collapsedNode');		
		selectedNode.addClass('superNode');
			
		addCollapsedEdges(selectedNode);	
			
			cy.style()
			  .selector('.collapsedNode')
		      .css({
				'visibility': 'hidden'
				})
			  .update() ;
			
			cy.style()
			  .selector('.superNode')
			  .css({
				'opacity': 0.8,
				'width': 50,
				'height': 50
				})
			  .update() ;
			
	}

}

function addCollapsedEdges(selectedNode){
			
	var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});					
									
	var connectedNodes = connectedEdges.targets();
	//console.log("connectedNodes = " + connectedEdges.data('id'));

	var newTargetEdges = connectedNodes.connectedEdges(function(){
										return !this.target().anySame( connectedNodes );
									});
	var newSourceEdges = connectedNodes.connectedEdges(function(){
										return !this.source().anySame( connectedNodes );
									});
	
	var newTargetNodes = newTargetEdges.targets();
	var newSourceNodes = newSourceEdges.sources();	
	
	newTargetNodes.each(function(i,ele){
	
	console.log("new target Nodes = " + ele.data('id'));
	
	});	
	
	newSourceNodes.each(function(i,ele){
	
	console.log("new source Nodes = " + ele.data('id'));
	
	});	
		
	newTargetNodes.each(function(i, ele){
	
			//console.log(" ele.edgesTo(selectedNode).targets().data('id') = " + ele.edgesTo(selectedNode).sources().data('id'));
			//console.log("selected node  = " + selectedNode.data('id'));
			//console.log(ele.data('id') + " is going to = " + ele.edgesTo(selectedNode).targets().data('id'));
			
		if(ele.edgesTo(selectedNode).sources().data('id') == selectedNode.data('id') || ele.data('id') == selectedNode.data('id') ){  // preventing duplicate edges 
		//	console.log("selected node source = " + ele.edgesTo(selectedNode).sources().data('id'));
		//	console.log("selected node  = " + selectedNode.data('id'));
			ele=ele+1;			
		}
		else {		
		
			console.log("second ele = " + ele.data('id'));
				cy.add({
				group: "edges", 
				data: {
					source: selectedNode.data('id'), 
					target: ele.data('id')
					} 
				})
				.addClass('virtualEdges')
		}
	});
		
		
	
	
	newSourceNodes.each(function(i, ele){
	
		if(ele.edgesTo(selectedNode).targets().data('id') == selectedNode.data('id') || ele.data('id') == selectedNode.data('id')){   
		//	console.log("selected node target = " + ele.edgesTo(selectedNode).targets().data('id'));
		//	console.log("selected node  = " + selectedNode.data('id'));
			ele=ele+1;			
		}
		else {		
		
			cy.add({
			group: "edges", 
			data: { 
				source: ele.data('id'),
				target: selectedNode.data('id')
				} 
		})	
		.addClass('virtualEdges')
		}
		});
	
	
	
//console.log(selectedNode.connectedEdges().data('id'));
		
//console.log(selectedNode.connectedEdges().hasClass('virtualEdges'));		
			
	/*	selectedNode.connectedEdges().each(function(i, ele){
		console.log( ele.id() + ' has virtual class ' + ele.hasClass('virtualEdges') );
		});
		*/
	
}


function removeCollapsedEdges(selectedNode){

	selectedNode.connectedEdges().each(function(i, ele){
	
		if(ele.hasClass('virtualEdges')){
		
			cy.remove(ele);
		}			
	});
}


function resetCollapse(){

	cy.style()
	  .selector('.collapsedNode')
	  .css({
			'opacity': 0.8,
			'background-color': '#888888',
			'line-color': '#ddd',
			'target-arrow-color': '#ddd'
		})
	  .update() ;
				  
		cy.style()		
		  .selector('.superNode')
		  .css({
				'opacity': 0.8,
				'background-color': '#888888', //
				'border-width': 0
			})	
		 .update() ;
		 
		cy.remove('.virtualEdges');
		
		cy.nodes().removeClass('superNode');
		cy.nodes().removeClass('collapsedNode');
		cy.edges().removeClass('collapsedNode');
		cy.edges().removeClass('virtualEdges');

}