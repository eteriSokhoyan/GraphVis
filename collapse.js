
var collapse=false;
$('#compressNodeCheck').change(function() {
        if($(this).is(":checked")) {
			collapse = true;
			cy.nodes().on("cxttap ", colNode);
        }
        else{
			collapse = false;
			cy.nodes().off("cxttap ", colNode);
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

	var newTargetEdges = connectedNodes.connectedEdges(function(){
										return !this.target().anySame( connectedNodes );
									});
	var newSourceEdges = connectedNodes.connectedEdges(function(){
										return !this.source().anySame( connectedNodes );
									});
	
	var newTargetNodes = newTargetEdges.targets();
	var newSourceNodes = newSourceEdges.sources();	
	
	console.log("target edges = " + newTargetEdges.data('id'));
	console.log("source edges = " + newSourceEdges.data('id'));
	
	cy.add({
			group: "edges", 
			data: {
				
				source: selectedNode.data('id'), 
				target: newTargetNodes.data('id')
				} 
		})
	
	cy.add({
			group: "edges", 
			data: {
				source: newSourceNodes.data('id'),
				target: selectedNode.data('id')
				} 
		})	
				
}

/*
function removeCollapsedEdges(selectedNode){

	var connectedEdges = selectedNode.connectedEdges(function(){
										return !this.target().anySame( selectedNode );
									});
									
									
	var connectedNodes = connectedEdges.targets();

	var newTargetEdges = connectedNodes.connectedEdges(function(){
										return !this.target().anySame( connectedNodes );
									});
	var newSourceEdges = connectedNodes.connectedEdges(function(){
										return !this.source().anySame( connectedNodes );
									});
	
	var newTargetNodes = newTargetEdges.targets();
	var newSourceNodes = newSourceEdges.sources();	
	
	cy.remove()


}

*/
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
	
	
		cy.nodes().removeClass('superNode');
		cy.nodes().removeClass('collapsedNode');
		cy.edges().removeClass('collapsedNode');

}