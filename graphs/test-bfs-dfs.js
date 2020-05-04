/**Modificare la classe Graph 
 * in modo che i metodi bfs e dfs 
 * prendano in input una funzione di callback 
 * in grado di lavorare sul vertice visitato 
 * al posto del console.log() 
 * che trovate alle righe 79 per bfs e 57 per dfs. */

 const Graph = require('./Graphs')

 function createGraph(verticies, edges){
     let graph = new Graph();

     for (vertex of verticies) {
         graph.addVertex(vertex);
     }

     for (edge of edges) {
         graph.addEdge(edge[0], edge[1], edge[1])
     }
     return graph;
 }

 let vertex = ["1","2","3","4","5","6"]
 let edges = [["1", "2", 7], ["1", "3", 9], ["1", "6", 14], ["2", "3", 10], ["2", "3", 10], ["2", "4", 14], ["3", "6", 2], ["3", "4", 11], ["4", "5", 6], ["6", "5", 9]]

 var graphEx = createGraph(vertex, edges);
graphEx.display();
graphEx.display();
graphEx.bfs("1", current => console.log(current));
graphEx.dfs("1", current => console.log(current));
