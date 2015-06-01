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

* Lazy loading for big graphs (>50 nodes)
* Deletion of nodes and edges
* Collapsing nodes for compact view
* Displaying node metadata 
* Displaying child/parent dependencies
* Show/hide node(edge) labels
* Export the graph as .png picture