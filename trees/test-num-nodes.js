const BinarySearchTree = require('./BinarySearchTree');




let bst = new BinarySearchTree();
bst.insert(23);
bst.insert(13);
bst.insert(7);
bst.insert(15);
bst.insert(54);
bst.insert(46);
bst.insert(77);

console.log('L\'albero bst ha un numero di ',bst.getNumNodes(),' nodi per i quali ho trovato ',bst.getNumEdges(),'connessioni.');
