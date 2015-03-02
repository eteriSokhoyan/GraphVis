
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

var collapseOrder = 0;	
function colNode(){
	
	var selectedNode = this;
	var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
	var connectedNodes = connectedEdges.targets();
	
	
			// expand node if it was collapsed before
	if(selectedNode.hasClass('superNode')){
			collapseOrder --;	
		connectedNodes.removeClass('collapsedNode'+ collapseOrder);					
		connectedEdges.removeClass('collapsedNode' + collapseOrder);		
		selectedNode.removeClass('superNode');
		
		removeCollapsedEdges(selectedNode, collapseOrder);
		
		cy.style()
		  .update() ;// remove invisibility
		
		
		
	}
			//// collapse node if it was not collaped before
	else {
		
		connectedNodes.addClass('collapsedNode' + collapseOrder);					
		connectedEdges.addClass('collapsedNode' + collapseOrder);		
		selectedNode.addClass('superNode');
		
		
		addCollapsedEdges(selectedNode, collapseOrder);	
			
			cy.style()
			  .selector('.collapsedNode' + collapseOrder)
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
		collapseOrder = collapseOrder + 1;		
	}
		
}

function addCollapsedEdges(selectedNode,collapseOrder){
			
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
	
//	console.log("new target Nodes = " + ele.data('id'));
	
	});	
	
	newSourceNodes.each(function(i,ele){
	
//	console.log("new source Nodes = " + ele.data('id'));
	
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
		
			//console.log("second ele = " + ele.data('id'));
				cy.add({
				group: "edges", 
				data: {
					source: selectedNode.data('id'), 
					target: ele.data('id')
					} 
				})
				.addClass('virtualEdges' + collapseOrder)
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
		.addClass('virtualEdges' + collapseOrder)
		}
		});
	
	
	
//console.log(selectedNode.connectedEdges().data('id'));
		
//console.log(selectedNode.connectedEdges().hasClass('virtualEdges'));		
			
	/*	selectedNode.connectedEdges().each(function(i, ele){
		console.log( ele.id() + ' has virtual class ' + ele.hasClass('virtualEdges') );
		});
		*/
	
}


function removeCollapsedEdges(selectedNode, collapseOrder){

	selectedNode.connectedEdges().each(function(i, ele){
	//	console.log("edges to be removed =  " + ele.data('id'));
		if(ele.hasClass('virtualEdges'+collapseOrder)){
			
			cy.remove(ele);
		}			
	});
	//collapseOrder --;
}


function resetCollapse(){
	
	for(var i = collapseOrder; i>= 0; i--){
	
	cy.style()
	  .selector('.collapsedNode'+i)
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
		 
		cy.remove('.virtualEdges'+i);
		
		cy.nodes().removeClass('superNode');
		cy.nodes().removeClass('collapsedNode'+i);
		cy.edges().removeClass('collapsedNode'+i);
		cy.edges().removeClass('virtualEdges'+i);
	console.log("collapseOrder = " + collapseOrder);
	}
}