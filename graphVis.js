 $.ajaxSetup({async: false});

 $(function(){ // on dom ready

 ///////// get the json file
  var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'graphData.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
  return json;
})();

//////////////////////////////// 
  
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

///////// END checkBox for labels

//////// selectionBox for the shape
$('#selectShape').change(function() {
	var shape="";
        $( "select option:selected" ).each(function() {
		shape = $( this ).text();
    });
	cy.makeLayout({'name': shape})
	  .run() ;
			
	});

//////// END selectionBox for the shape

//////// checkBox for highlighting outgoing nodes
var show=false; 
	$('#showOutNode').change(function() {
		
        if($(this).is(":checked")) {
			show = true;
			showOutNodes(show);
        }
		else{ 
			show = false;
			showOutNodes(show);
		}
    });  
//////// END checkBox for highlighting outgoing nodes
	
//////// function for finding outgoing nodes
function showOutNodes(show){
	
	if(show){
		
			
			
		cy.nodes().on("click",  function(){
			
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
			
		});
		
	}
	else {
		cy.nodes().off("click");
	}

}

//////// END function for finding outgoing nodes


///////// create graph

  var cy = cytoscape({		

	container: document.getElementById('cy'), 
	
	elements : json ,
				
	layout: {
		// name: 'random',
		   name: 'circle'
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
		'text-valign':'center'
	/*	'pie-size': '100%',
        'pie-1-background-color': '#E8747C',
        'pie-1-background-size': '50%',
		//'pie-1-background-size': 'mapData(value, 0, 40, 0, 100)',
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
  });  	// END create graph
			
	

}); // END on dom ready