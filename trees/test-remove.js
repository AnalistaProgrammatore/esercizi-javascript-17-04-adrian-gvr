const BinarySearchTree = require('./BinarySearchTree');




let bst = new BinarySearchTree();
bst.insert(23); // nodo radice --> il quarto nodo da eliminare
bst.insert(13); // nodo con 1 figlio, dopo l'eliminazione del 7 ---> il secondo nodo da eliminare
bst.insert(7); // nodo foglia --> primo nodo da eliminare
bst.insert(15);
bst.insert(54); // nodo con 2 figli --> il terzo nodo da eliminare
bst.insert(46);
bst.insert(77);

console.log('I valori iniziali dell\'albero sono: ', bst.root);
console.log('\n\n Inizio rimozione nodi: \n');
bst.remove(7);
bst.remove(13);
bst.remove(54);
bst.remove(23);

console.log('I valori dell\'albero dopo l\'eliminazione dei nodi sono: ',bst.root);
