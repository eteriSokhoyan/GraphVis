///// show/hide Labels


$("#openFile").change(function () {
var fileName = $(this).val().replace('C:\\fakepath\\', '');
$("#file-upload-filename").html(fileName + "<br><br>");
});




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


//////// change the shape of the graph
$('#selectShape').change(function() {
	var shape="";
        $( "select option:selected" ).each(function() {
		shape = $( this ).text();
    });
	cy.makeLayout({'name': shape})
	  .run() ;
			
	});

////////  highlighting outgoing nodes

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


////////  highlighting incoming nodes

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
					
			var connectedNodes = selectedNode.outgoers();
			
			if(selectedNode.hasClass('selectedNodeOut')){
			
				connectedNodes.removeClass('connectedNodeOut');
				//connectedEdges.removeClass('connectedNodeOut');
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
				//connectedEdges.addClass('connectedNodeOut');
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
		
/////// reset highlighting of outgoing nodes 		
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
			
//////////// find inComing nodes

	function highlightIn (){
			
			var selectedNode = this;
			var connectedNodes = selectedNode.incomers();
		
			if(selectedNode.hasClass('selectedNodeIn')){
			
				connectedNodes.removeClass('connectedNodeIn');
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


/////// reset highlighting of incoming nodes 		
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

		





////// export PNG 	
 function exportFunction(){
 
  var pngPic = cy.png();
   downloadURI(pngPic, "graph");
	console.log(pngPic);

 
 /*
  var e = document.createElement('script'); 
    if (window.location.protocol === 'https:') { 
        e.setAttribute('src', 'https://rawgit.com/NYTimes/svg-crowbar/gh-pages/svg-crowbar.js'); 
    } else { 
        e.setAttribute('src', 'http://nytimes.github.com/svg-crowbar/svg-crowbar.js'); 
    } 
    e.setAttribute('class', 'svg-crowbar'); 
    document.body.appendChild(e); 

		
*/
	//downloadURI(pngPic, "graph");
}
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}


///// restore Graph structure
function restorGraphStructure(){

	var shape="";
        $( "select option:selected" ).each(function() {
		shape = $( this ).text();
    });
	cy.makeLayout({'name': shape})
	  .run() ;
			
}




///// show node info

$('#nodeInfoCheck').change(function() {
		
        if($(this).is(":checked")) {
		
			showIn = true;
			cy.nodes().on("click", showNodeInfo);
			
        }
		else{ 
			showIn = false;
			cy.nodes().off("click", showNodeInfo);
		}
    });  
/*
function showNodeInfo(){
	
	var selectedNode = this;	
	
			//info = ele.data('name')+ '<br>' + ele.data('charts');
			//window.open().document.write(ele.data);
	window.open(selectedNode.data('charts'),"MsgWindow", "width=300, height=300");//.document.write(info);
	
	//window.open().document.write(info);
}
*/
function showNodeInfo(node){

	var node = this;
	
	var childNodes = node.outgoers().nodes();
	var childNum = childNodes.length;
	
	var parentNodes = node.incomers().nodes();
	var parentNum = parentNodes.length;
		
	popupWin = window.open('popUp.html',"MsgWindow", "width=400, height=400");
	popupWin.document.writeln('<html><head><title>Node Details</title>'
								+'<style type="text/css">'
									+'textarea{'
									+'width: 100%;'
									+'height: 100%;'
									+'font-size: 14;'
									+'font-family: Verdana, Arial, Helvetica, sans-serif;'
									+'border: none;}'
								+'</style>'
								+'</head>'
								+'<body>'
									+'<textarea id="popupTextBox" readonly></textarea>'
								+'</body>'
								+'</html>');
	popupWin.document.close();
	popupText = popupWin.document.getElementById('popupTextBox');
			
	parentText = "id : "  + node.data('id') ;
	parentText +="\nname : " + node.data('name');
	parentText +="\nscore : " + node.data('score');
	parentText +="\ndegree : " + node.degree();
	parentText +="\nnumber of child nodes : " + childNum;
	parentText +="\nnumber of parent nodes : " + parentNum;
	
	
	popupText.value = parentText;
	
}

/////// delete selected nodes

var nodesToRemove;
var edgesToRemove;

function deleteSelectedNodes(){

	nodesToRemove =	cy.nodes(':selected');
	edgesToRemove = nodesToRemove.connectedEdges();
	
	cy.remove(nodesToRemove);
	cy.remove(edgesToRemove);
	
}
/////// restore Deleted Nodes 
function restoreDeletedNodes(){
	nodesToRemove.restore();
	edgesToRemove.restore();
}

/////////////// tool Panel movement 

$(document).on('click','.slider-arrow.show',function(){
	    $( ".slider-arrow, .panel" ).animate({
          left: "+=243"
		  }, 700, function() {
            // Animation complete.
          });
		  $(this).html('&laquo;').removeClass('show').addClass('hide');
		
		document.getElementById('cy').style.left="243px";
		//document.getElementById('cy').style.width="80%";
		  
		cy.resize();
		  
		  
    });
	
$(document).on('click','.slider-arrow.hide',function(){
	    $( ".slider-arrow, .panel" ).animate({
          left: "-=243"
		  }, 700, function() {
            // Animation complete.
          });
		  $(this).html('&raquo;').removeClass('hide').addClass('show');
		  document.getElementById('cy').style.left="0px";
		 // document.getElementById('cy').style.width="100%";
		   cy.resize();
    });

$(document).on('click', function(){
 
 var selectedNode = cy.nodes(':selected');

if(selectedNode.outgoers().length == 0){
	
	$('.btn.colNode').prop('disabled', true);

	
}
else if(selectedNode.hasClass('superNode')){

	$('.btn.colNode').prop('disabled', true);

}
else {

	$('.btn.colNode').prop('disabled', false);

}

if(selectedNode.hasClass('toBeExpaned') || selectedNode.hasClass('superNode') ){

	$('.btn.expNode').prop('disabled', false);

}
else{
	
	$('.btn.expNode').prop('disabled', true);

}

if(cy.nodes(":selected").length > 0){

	$('.btn.delNode').prop('disabled', false);
}
else{

	$('.btn.delNode').prop('disabled', true);
}


});
