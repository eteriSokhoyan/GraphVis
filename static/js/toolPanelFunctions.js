$(function() {    // on dom ready


///// show/hide Labels
$('#nodeLabelCheck').change(function() {
    if ($(this).is(":checked")) {
        showNodeLabel = "data(id)";  // change to label or name if needed
    } else {
        showNodeLabel = "";
    }

    cy.style()
        .selector('node')
        .css({
            'content': showNodeLabel
        })
        .update();
});

$('#linkLabelCheck').change(function() {
    if ($(this).is(":checked")) {
        showEdgeLabel = "data(id)"; // change to label or name if needed
    } else {
        showEdgeLabel = "";
    }

    cy.style()
        .selector('edge')
        .css({
            'content': showEdgeLabel
        })
        .update();
});


//////// change the shape of the graph 
$('#selectShape').change(function() {

    $("select option:selected").each(function() {
        shape = $(this).val();
    });
    cy.makeLayout({
            'name': shape
        })
        .run();

		$('#selectShape').blur();
});

////////  highlighting outgoing nodes

$('#showOutNode').change(function() {
	if ($('#showOutNode').is(":checked")) {
                 showOut = true;
                 cy.nodes().on("tap", highlightOut);
             } else {
               showOut = false;
					cy.nodes().off("tap", highlightOut);
					resetHighlightOut(showIn, showOut);
             }
});


////////  highlighting incoming nodes

$('#showInNode').change(function() {
	
	if ($('#showInNode').is(":checked")) {
                 showIn = true;
                 cy.nodes().on("tap", highlightIn);
				 
   } else {
               showIn = false;
					cy.nodes().off("tap", highlightIn);
					resetHighlightIn(showIn, showOut);
					cy.nodes().removeClass('connectedNodeIn');
	}

});



//// show number of contained nodes for a collapsed node
$('#collapseCount').change(function() {
	checkBoxes();
});



////expand(Load) nodes
$('#expandNode').click(function() {
         var selectedNode = cy.nodes(':selected');

		// console.log(selectedNode.data());
		 
         if (selectedNode.hasClass('superNode')) {

             unColNode();

         } else {

             expandNodes(selectedNode);
             //selectedNode.unselect();
             $('.btn.expNode').prop('disabled', true);
         }

     });


	 
	 

//
//// disable/unable buttons 
$(document).on('click', function() {

//checkBoxes();
    var selectedNode = cy.nodes(':selected');
	
	//showNodeInfo(selectedNode);

    if (selectedNode.outgoers().length == 0) {

        $('.btn.colNode').prop('disabled', true);


    } else if (selectedNode.hasClass('superNode')) {

        $('.btn.colNode').prop('disabled', true);

    } else {

        $('.btn.colNode').prop('disabled', false);

    }

    if (selectedNode.hasClass('toBeExpaned') || selectedNode.hasClass('superNode')) {

        $('.btn.expNode').prop('disabled', false);

    } else {

        $('.btn.expNode').prop('disabled', true);

    }

    if (cy.nodes(":selected").length > 0) {

        $('.btn.delNode').prop('disabled', false);
    } else {

        $('.btn.delNode').prop('disabled', true);
    }


});


///// keyboard commands

$( document ).keypress(function(e) {

  
  var selectedNode = cy.nodes(':selected');
  
  
  if(e.which == 101 && selectedNode.size() != 0){   // 101 for 'e' = expand
  
	if(selectedNode.hasClass('toBeExpaned') ) {
		
		expandNodes(selectedNode);
		
	}
	else if(selectedNode.hasClass('superNode')){
		
		unColNode();
	}
	
		
  }
   if ( e.which == 99 && selectedNode.size() != 0 && !selectedNode.hasClass('superNode') && selectedNode.outgoers().length != 0) { // 99 for 'c' = collapse
	
	colNode();
		
  }
  
  if ( e.which == 100 && selectedNode.size() != 0) { // 100 for 'd' = delete
	deleteSelectedNodes();
  }
  
  
});



/////////////// tool Panel movement 

$(document).on('click', '.slider-arrow.show', function() {
    $(".slider-arrow, .panel").animate({
        left: "+=243"
    }, 700, function() {
        // Animation complete.
    });
    $(this).html('&laquo;').removeClass('show').addClass('hide');

    document.getElementById('cy').style.left = "243px";
    //document.getElementById('cy').style.width="80%";

    cy.resize();


});

$(document).on('click', '.slider-arrow.hide', function() {
    $(".slider-arrow, .panel").animate({
        left: "-=243"
    }, 700, function() {
        // Animation complete.
    });
    $(this).html('&raquo;').removeClass('hide').addClass('show');
    document.getElementById('cy').style.left = "0px";
    // document.getElementById('cy').style.width="100%";
    cy.resize();
});

//////////////////panel for Node info

$(document).on('click', '.slider-arrow-forNode.show', function() {
    $(".slider-arrow-forNode, .nodePanel").animate({
        right: "+=248"
    }, 700, function() {
        // Animation complete.
    });
    $(this).html('&raquo;').removeClass('show').addClass('hide');

    document.getElementById('cy').style.right = "248px";
    //document.getElementById('cy').style.width="80%";

    cy.resize();


});

$(document).on('click', '.slider-arrow-forNode.hide', function() {
    $(".slider-arrow-forNode, .nodePanel").animate({
        right: "-=248"
    }, 700, function() {
        // Animation complete.
    });
    $(this).html('&laquo;').removeClass('hide').addClass('show');
    document.getElementById('cy').style.right = "0px";
    // document.getElementById('cy').style.width="100%";
    cy.resize();
});


	 
	 
	 
	 


}) // on dom ready END

///////// finding outgoing Nodes		
function highlightOut() {

	
    var selectedNode = this;

	

    var connectedNodes = selectedNode.outgoers();

    if (selectedNode.hasClass('selectedNodeOut')) {

        connectedNodes.removeClass('connectedNodeOut');
        //connectedEdges.removeClass('connectedNodeOut');
        selectedNode.removeClass('selectedNodeOut');

        cy.style()
            .selector('.connectedNodeOut')
            .css({
                'opacity': 0.8
            })
            .update();
    } else {
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
                'background-color': '#FE2E64',
                'line-color': '#FE2E64',
                'target-arrow-color': '#FE2E64',
                'source-arrow-color': '#FE2E64',
                'opacity': 0.8
            })
            .update();
			
			cy.style()
            .selector('.selectedNodeOut')
            .css({
                'background-color': '#FE2E64',
                'line-color': '#FE2E64',
                'target-arrow-color': '#FE2E64',
                'source-arrow-color': '#FE2E64',
                'opacity': 0.8
            })
            .update();

			//cy.nodes().removeClass('selectedNodeOut');
    }
}

/////// reset highlighting of outgoing nodes 		
function resetHighlightOut(showIn, showOut) {

    cy.style()
        .selector('.connectedNodeOut')
        .css({
            'opacity': 0.8,
            'background-color': '#888888',
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
        })
        .update();


    if (!showIn && !showOut) {
        cy.style()
            .selector('.selectedNodeOut')
            .css({
                'opacity': 0.8,
                'background-color': '#888888', //
                'border-width': 0
            })
            .update();

    }
    cy.nodes().removeClass('selectedNodeOut');
    cy.nodes().removeClass('connectedNodeOut');
    cy.edges().removeClass('connectedNodeOut');
}

//////////// find inComing nodes

function highlightIn() {


	//var selectedNode = cy.nodes(':selected');
	var selectedNode = this;
	
	
    var connectedNodes = selectedNode.incomers();
	
    if (selectedNode.hasClass('selectedNodeIn') ) {
	
		cy.style()
            .selector('.connectedNodeIn')
            .css({
                'opacity': 0.8
            })
            .update();
        connectedNodes.removeClass('connectedNodeIn');
        selectedNode.removeClass('selectedNodeIn');
        
    } else {


		
        cy.nodes().not(this).removeClass('connectedNodeIn');
        cy.nodes().not(this).removeClass('selectedNodeIn');
        cy.edges().not(this).removeClass('connectedNodeIn');

        connectedNodes.addClass('connectedNodeIn');
        selectedNode.addClass('selectedNodeIn');
        cy.style()
            .selector('.connectedNodeIn')
            .css({
                'background-color': '#FE2E64',
                'line-color': '#FE2E64',
                'target-arrow-color': '#FE2E64',
                'source-arrow-color': '#FE2E64',
                'opacity': 0.8
            })
            .update();
			cy.style()
            .selector('.selectedNodeIn')
            .css({
                'background-color': '#FE2E64',
                'line-color': '#FE2E64',
                'target-arrow-color': '#FE2E64',
                'source-arrow-color': '#FE2E64',
                'opacity': 0.8
            })
            .update();

       
			
    }
	
}


/////// reset highlighting of incoming nodes 		
function resetHighlightIn(showIn, showOut) {

    cy.style()
        .selector('.connectedNodeIn')
        .css({
            'opacity': 0.8,
            'background-color': '#888888',
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
        })
        .update();

    if (!showIn && !showOut) {
        cy.style()
            .selector('.selectedNodeIn')
            .css({
                'opacity': 0.8,
                'background-color': '#888888', //
                'border-width': 0
            })
            .update();
    }

    cy.nodes().removeClass('selectedNodeIn');
    cy.nodes().removeClass('connectedNodeIn');
    cy.edges().removeClass('connectedNodeIn');

}




////// export PNG 	
function exportFunction() {

    var pngPic = cy.png();
    downloadURI(pngPic, "graph");
   

}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}


///// restore Graph structure
function restorGraphStructure() {

    resetCollapse();

    var shape = "";
    $("select option:selected").each(function() {
        shape = $(this).val();
    });
    cy.makeLayout({
            'name': shape
        })
        .run();

}





///// show node info
/*
$('#nodeInfoCheck').change(function() {
	//checkBoxes();
});
*/
function showNodeInfo(node) {

	//var node = cy.nodes(':selected');
   // var node = this;
    var str = "";
    var nodeContent = node.data();

    var fieldName = [];
    var i = 0;
    var values = [];
    var j = 0;

    for (var key in nodeContent) {
        
        if (key == 'group' || key == 'data') {
            continue;
        }

        fieldName[i] = key;
        i++;
        values[j] = nodeContent[key];
        j++;
        //str += key + odeContent[key] +"\n" ;

    }


    var childNodes = node.outgoers().nodes();
    var childNum = childNodes.length;

    var parentNodes = node.incomers().nodes();
    var parentNum = parentNodes.length;
    var degree = node.degree();

    var table = createTable(fieldName, values, degree, parentNum, childNum);
	
	$('#nodeInfoDiv').html("<p><strong>Node Description </p>" +table);
	for (var i = 0; i < fieldName.length; i++) {

        //parentText += key + " = " + node.data(key)+ "\n";
		
		

        if (isValidUrl(values[i])) {

				
			
			var e = document.createElement( "div" );
			e.id = "linkDiv";
			$('#nodeInfoDiv').append(e);    
			//e.attr('id', 'linkDiv');
			
			
			//$("#nodeInfoDiv").append('<div id="linkDiv" style="display:block; border:1px dashed #CCCCCC;"></div>');


            var url = values[i];
            //console.log("value " + i + "is url");
            document.getElementById("linkDiv").innerHTML += "<br>" + fieldName[i] + "<br>";
            $('<iframe id="iframeId" width = "240"/>').appendTo(document.getElementById("linkDiv")).prop('src', url);
			
            i++;
        }
		


    }
}

function isValidUrl(str) {
    var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/); // fragment locater
    if (!pattern.test(str)) {

        return false;
    } else {
        return true;
    }
}

function createTable(fieldName, values, degree, parentNum, childNum) {

    var table = "<table class='CSSTableGenerator'>";

    for (var i = 0; i < fieldName.length; i++) {


        if (isValidUrl(values[i])) {


            i++;
        }


        table += "<tr>" + "<td>" + fieldName[i] + "</td>" + "<td>" + values[i] + "</td>" + "</tr>";

    }
    table += "<tr>" + "<td>" + "degree" + "</td>" + "<td>" + degree + "</td>" + "</tr>";
    table += "<tr>" + "<td>" + "number of child nodes" + "</td>" + "<td>" + childNum + "</td>" + "</tr>";
    table += "<tr>" + "<td>" + "number of parent nodes" + "</td>" + "<td>" + parentNum + "</td>" + "</tr>";


    table += "</table>";
    return table;

}





/////// delete selected nodes

var nodesToRemove;
var edgesToRemove;

function deleteSelectedNodes() {

        nodesToRemove = cy.nodes(':selected');
        edgesToRemove = nodesToRemove.connectedEdges();

        cy.remove(nodesToRemove);
        cy.remove(edgesToRemove);

    }
    /////// restore Deleted Nodes 
function restoreDeletedNodes() {
    nodesToRemove.restore();
    edgesToRemove.restore();
}

 function expandNodes(selectedNode) {
 
	cy.nodes().unbind( "tap" );

         //var selectedNode = cy.nodes(':selected');
         //var selectedNode = this;
         var selectedNodeId = selectedNode.id();
         selectedNodeId = selectedNodeId.replace(/[^0-9\.]+/g, "");
        // console.log(selectedNodeId);

         var eles = allcy.nodes();


         nodesToAdd = eles[selectedNodeId].outgoers();

         showNodesToExpand(nodesToAdd);
         cy.add(eles[selectedNodeId].outgoers());



         selectedNode.removeClass('toBeExpaned');
         //selectedNode.removeClass('superNode');
         //cy.style()
         //.update() 

         $("select option:selected").each(function() {
             shape = $(this).val();
            // console.log(shape);

         });

         cy.layout({
             name: shape
         });
		  
			checkBoxes();
			 cy.nodes().on("click", function(e){

						showNodeInfo(e.cyTarget);

						});	   

			
		
     }
 
 function showNodesToExpand(toAdd) {

         toAdd.nodes().forEach(function(ele) {


             if (ele.outdegree() > 0 && !ele.hasClass('roots')) {

                 ele.addClass('toBeExpaned');
             } else {

             }

         });

     }


// checkBox options

function checkBoxes(){


           if ($('#showInNode').is(":checked")) {
                 showIn = true;
                 cy.nodes().on("tap", highlightIn);
				 
             } else {
               showIn = false;
					cy.nodes().off("tap", highlightIn);
					resetHighlightIn(showIn, showOut);
					cy.nodes().removeClass('connectedNodeIn');
             }
             if ($('#showOutNode').is(":checked")) {
                 showOut = true;
                 cy.nodes().on("tap", highlightOut);
             } else {
               showOut = false;
					cy.nodes().off("tap", highlightOut);
					resetHighlightOut(showIn, showOut);
             }

			 if ($('#collapseCount').is(":checked")) {
		
         cy.nodes().on("mouseover", function(event) {
				var nd = event.cyTarget;
				countCollapse(nd);
		
		});
           
        cy.nodes().on("mouseout", function(event) {
            var nd = event.cyTarget;
            UnTip();
        });
    }
	else {
		cy.nodes().off("mouseover");
	}	
	
	/*
	if ($('#nodeInfoCheck').is(":checked")) {
       
	   
		cy.nodes().on("click", showNodeInfo);	   
       
    } 
	else{
	
		cy.nodes().off("click", showNodeInfo);	   
	}
	*/

}




