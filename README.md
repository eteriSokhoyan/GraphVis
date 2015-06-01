# Galaxy Graph Visualization Framework (under construction) #

The framework tries to easily visualize and manipulate graphs in Galaxy platform. 
For graph construction and visualization [Cytoscape.js](http://js.cytoscape.org/) library is used.

### Input formats ###

As an input files json or txt formats can be used. 

Examples: 

* json file 
   
```
#!json

{
  "nodes":[
			{
				"id": 1,
			},
			{
				"id": 2,
			}
          ],
 "links":[
			
			{
				"source":1,
				"target":2,
			}
         ]
}

```

* txt file with matrix notation


```
#!python

1	3 4 5
2	4 6
3	1 5 6 2
4	3
5	
6
```
Line "1	 3 4 5" can be read as: source: node "1" , target: node "3" ("4","5")



### Features ###

| Features      | Description                    |
| ------------- | ------------------------------ |
| Lazy loading      |    If the graph contains more than 50 nodes lazy loading will be performed. At first the framework will load only the root nodes(nodes that have no incoming edges) and their child nodes. The child nodes that can be expanded (contain other nodes) will have bigger size. To load the rest of the graph Expand feature must be used on the expandable nodes |
| Delete   | Deletes selected nodes and edges. Can be performed by using corresponding button or shortcut key 'd'     |
| Restore   | Restores the deleted nodes and edges form the very last Deletion performed     |
| Collapse   | Collapse feature can be performed on the selected node which has   outgoing edges. It hides all outgoing (child) nodes and edges of the selected node. Useful for compact view. Can be performed by using corresponding button or shortcut key 'c'. To uncollapse the node Expand or Restore Structure can be used.      |



* Collapsing nodes for compact view
* Displaying node metadata 
* Displaying child/parent dependencies
* Show/hide node(edge) labels
* Export the graph as .png picture