class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
/**ABSTRACT DATA TYPE - Albero di ricerca binaria
 * @property root -> nodo radice dell'albero
 * @method insert(data) -> inserire un nodo nell'albero // passare i dati che il nodo memorizzerà
 * @method remove(data) -> elimina un nodo dall'albero // il valore del nodo da eliminare
 * @method inOrder(node) -> attraversare i nodi dell'albero in ordine ascendente in base al valore chiave dell'albero
 * @method preOrder(node) -> attraversare i nodi dell'albero in questo ordine: radice, nodi a sinistra, nodi a destra
 * @method postOrder(node) -> attraversare i nodi dell'albero in questo ordine: nodi a sinistra, radice, nodi a destra
 * @method getRoot() -> ritorna il nodo radice
 * @method getMin() -> restituisce il nodo con valore minimo all'interno dell'albero
 * @method getMax() -> restituisce il nodo con valore massimo all'interno dell'albero
 * @method find(node, data) -> restituisce il nodo cercato
 * @method getNumNodes() -> restituisce il valore che indica il numero dei nodi dell'albero
 * @method getNumEdges() -> restituisce il valore che indica il numero delle connessioni dell'albero
 */

 class BinarySearchTree{
     //creare una funzione di callback per confrontare due elementi da utilizzare nei metodi di attraversamento
    constructor(compare = (a, b) => {
         if (a < b) return -1;
         if (a > b) return 1;
         return 0; })
    {
         this.root = null; // la proprietà radice dell'albero
         this.compare = compare; // la modalità compare

         //creazione del metodo per l'inserimento dei nodi
         this.insertNode = (node, newNode) => { // due parametri per la funzione freccia, l'oggetto node corrente e l'oggetto node da inserire
                // valutare su quale ramo devo inserire il valore del nuovo nodo
                if ( compare(newNode.data, node.data)  === -1 ){ // il valore del nodo che voglio inserire è più piccolo del valore del nodo corrente
                        if(node.left === null){ // se il nodo corrente non ha un ramo di sinistra
                            node.left = newNode;// il nodo di sinistra prende il valore dell'oggetto newNode (valore e proprietà)
                        } else {// altrimenti, nel caso in cui il nodo di sinistra esiste
                            this.insertNode(node.left, newNode);// inserisco il nuovo nodo collegandolo al nodo di sinistra (nodo figlio)
                        }
                } else {
                    if (node.right === null) { //se il nodo corrente non ha un ramo di destra
                        node.right = newNode;
                    } else {
                        this.insertNode(node.right, newNode);
                    }
                }
         }

         //creazione del metodo per l'eliminazione di un nodo scelto
         this.removeNode = (node, nodeRem) => { // due parametri, il nodo corrente e il nodo da eliminare
            // trovare il nodo da eliminare
                //se l'albero è vuoto
                if (node === null) return null; // se l'albero è vuoto restituisco il valore null; non c'è niente da eliminare
                // verificare dove si potrebbe trovare il nodo da eliminare
                if (compare(nodeRem, node.data) === -1 ){ //confronto tra il valore da eliminare e il valore del nodo corrente
                        node.left = this.removeNode(node.left, nodeRem);
                        return node; // restituisce il nodo modificato dopo l'eliminazione del ramo di sinistra
                }
                if (compare(nodeRem, node.data) === 1 ){
                        node.right = this.removeNode(node.right, nodeRem);
                        return node;
                }

            // eliminare il nodo trovato
                // il caso in cui il nodo da eliminare è una foglia
                if(node.left === null && node.right === null) return null
               
                // il caso in cui il nodo da eliminare ha un nodo figlio (a sinistra o a destra)
                if (node.left === null) return node.right; // qui stava l'errore, nel codice originale alla riga 58
                if (node.right === null ) return node.left; // qui stava l'errore, nel codice originale alla riga 59
                // il caso in cui il nodo ha due figli
                        // devo trovare il minimo dei maggiori nel sottoalbero di destra
                        // sostituisco il valore del nodo da eliminare (il nodo corrente) con il valore minimo trovato in precedenza
                        // elimino il valore minimo trovato nel sottoalbero di destra
                    const min = this.getMinR(node.right); // individuazione del minimo, che è un link a quel oggetto; node.right è la radice del sottoalbero di destra
                    node.data = min.data; // sostituisco il valore del nodo
                    node.right = this.removeNode(node.right, min.data); // eliminazione del nodo minimo // restituisce un albero nuovo senza il nodo eliminato
                    return node;                    

                }     
    }// fine della classe costruttore

    insert(data){ //come argomento il valore da inserire, la proprietà dell'albero
        const newNode = new Node(data); // creo un nuovo oggetto nodo con la proprietà data, cioè il valore numerico
        if (this.root === null) {
            return this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    remove(data) { 
        this.root = this.removeNode(this.root, data);//***
    }

    getMinR(node = this.root){ //trovare il minimo utilizzando la funzione ricorsivamente; valore di partenza di default
            if(node.left === null) return node; // se il nodo non ha figli a sinistra, il nodo attuale ha il valore minimo
            return this.getMinR(node.left); // continuare a cercare ricorsivamente il minimo sul ramo di sinistra dell'albero
    } 

    getMaxR(node = this.root){
        if (node.right === null) return node; // se il nodo ha figli a destra, il nodo attuale è il nodo con il valore massimo
        return this.getMaxR(node.right) // continuo a cercare ricorsivamente il massimo sul ramo di destra
    }
     /*
    getRoot(){
        return this.root;// restituisce il valore del nodo radice
    }*/

    // i metodi di attaversamento dell'albero di ricerca binario di ricerca
        inOrderCB(cb = (n) => console.log(n.data), node = this.root ){ // sinistra, radice, destra
            if(node !== null){
                this.inOrderCB(cb, node.left);
                cb(node);
                this.inOrderCB(cb, node.right);
            }
        }

        preOrderCB(cb = (n) => console.log(n.data), node = this.root){ //radice, sinistra, destra
            if(node !== null){
                cb(node);
                this.preOrderCB(cb, node.left);
                this.preOrderCB(cb, node.right);
            }
        }

        postOrderCB(cb = (n) => console.log(n.data), node = this.root){//sinistra, destra, radice
            if(node !== null ){
                this.postOrderCB(cb, node.left);
                this.postOrderCB(cb, node.right);
                cb(node);
            }
        }
    // fine metodi di attraversamento dell'albero binario di ricerca

    // il metodo per trovare un elemento in un albero
    find(node, data){
        if(node === null) return null

        if(this.compare(data, node.data) === -1){
            return this.find(node.left, data);
        }else if(this.compare(data, node.data) === 1){
            return this.find(node.right, data);
        return node;
        }
    }

    // il metodo per calcolare il numero dei nodi
    getNumNodes(){
        let count = 0;
        this.inOrderCB(() => ++count);
        return count;
    }

    getNumEdges(){
        return this.getNumNodes()-1;
    }

}

module.exports = BinarySearchTree
