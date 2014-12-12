 $.ajaxSetup({async: false});

 $(function(){ // on dom ready

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
  
///// checkBox  

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

///////// end checkBox

//////// selectionBox

$('#selectShape').change(function() {
	var shape="";
        $( "select option:selected" ).each(function() {
		shape = $( this ).text();
    });
	cy.makeLayout({'name': shape})
	  .run() ;
			
	});

//////// end selectionBox

	

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
  });
	
	
////////higlight

//cy.on('tap', 'node', function(){


  
//}); // on tap
//////////////////////////

}); // on dom ready