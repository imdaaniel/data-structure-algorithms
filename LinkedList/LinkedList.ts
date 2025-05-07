class ListNode {
    public value: any;
    public next: ListNode | null;

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    private head: ListNode | null;
    private tail: ListNode | null;
    private length: number;
    
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    public addNode(value: any) {
        const newNode = new ListNode(value);
        
        if (this.head == null) {
            // Se for o primeiro elemento da lista
            this.head = newNode;
        } else if (this.tail) {
            // Aponta o elemento que atualmente é o ultimo para o novo
            // Define o novo elemento como next do tail atual
            // tail.next -> newNode
            // Tail nunca será null aqui, pois sempre que há um head há também um tail, e vice-versa.
            this.tail.next = newNode;
        }
        
        // Define o novo elemento como sendo o ultimo
        // previousTail.next -> tail (tail = newNode)
        this.tail = newNode;

        // Incrementa a contagem de nodes na lista
        this.length += 1;
    }

    public addMultipleNodes(values: any[]) {
        values.forEach(value => this.addNode(value));
    }

    public removeNodeByValue(valueToBeRemoved: any): boolean {
        if (this.head == null) {
            return false;
        }

        // Se o valor a ser removido for o primeiro elemento na lista
        if (this.head.value == valueToBeRemoved) {
            this.head = this.head.next;

            // Se a lista so tinha 1 elemento, tanto head quanto tail faziam referencia a esse unico elemento
            // Portanto, se avancei o head pra nulo, preciso avancar o tail tambem, ja que agora nao existe ninguem na lista
            if (this.head == null) {
                this.tail = null
            }

            this.length -= 1;
            return true;
        }

        let currentNode = this.head;

        while (currentNode.next != null) {
            if (currentNode.next.value == valueToBeRemoved) {
                currentNode.next = currentNode.next!.next;

                if (currentNode.next == this.tail) {
                    this.tail = currentNode;
                }
                
                this.length -= 1;
                return true;
            }

            // Avançando o ponteiro do currentNode
            currentNode = currentNode.next;
        }

        return false;
    }

    public reverseList() {
        // Se só tiver um elemento na lista, nao precisa fazer nada
        // Também poderia verificar se o this.length é igual a 1
        if (this.head == this.tail) {
            return;
        }

        let previous: ListNode | null = null;
        let next: ListNode | null = null;
        let current = this.head;

        while (current != null) {
            // Armazenar o proximo node
            next = current.next;

            // Definir o anterior como proximo (revertendo)
            current.next = previous;

            // Avancar os ponteiros
            previous = current;
            current = next;
        }

        const aux = this.head;
        this.head = previous // tambem poderia ser self.head = self.tail
        this.tail = aux;
    }

    public printList() {
        const head = this.head != null ? this.head.value : null;
        const tail = this.tail != null ? this.tail.value : null;

        let currentNode = this.head;
        let nextNodeValue: number | null;

        console.log(`\nHead: ${head} | Tail: ${tail} | Length: ${this.length}`);

        while (currentNode != null) {
            nextNodeValue = currentNode.next != null ? currentNode.next.value : null;
            console.log(`Node: [value: ${currentNode.value}, next: ${nextNodeValue}]`);
            currentNode = currentNode.next;
        }
    }

    public toArray(): any[] {
        let arrayList: any[] = [];
        let currentNode = this.head;

        while (currentNode != null) {
            arrayList.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return arrayList;
    }

    public getHeadValue(): any | null {
        return this.head ? this.head.value : null;
    }

    public getTailValue(): any | null {
        return this.tail ? this.tail.value : null;
    }

    public getLength(): number {
        return this.length;
    }
}

let myLinkedList = new LinkedList();

console.log('Adicionando abacate');
myLinkedList.addNode('abacate');

console.log('Removendo pera');
console.log(myLinkedList.removeNodeByValue('pera'));

console.log('Adicionando banana e maçã');
myLinkedList.addMultipleNodes(['banana', 'maçã']);

console.log('Revertendo lista');
myLinkedList.reverseList();

myLinkedList.printList();



// console.log('Adicionando valor 1');
// myLinkedList.addNode(1);

// console.log('Adicionando valor 2');
// myLinkedList.addNode(2);

// console.log('Adicionando valor 3');
// myLinkedList.addNode(3);

// console.log('Adicionando valor 4, 5 e 6');
// myLinkedList.addMultipleNodes([4,5,6]);

// console.log('Revertendo lista');
// myLinkedList.reverseList();

// console.log('Removendo número 3');
// myLinkedList.removeNodeByValue(3);

// console.log('Removendo número 54 (não está na lista)');
// myLinkedList.removeNodeByValue(54);

// console.log(myLinkedList.toArray());
// console.log(`Head: ${myLinkedList.getHeadValue()}`);
// console.log(`Tail: ${myLinkedList.getTailValue()}`);
// console.log(`Length: ${myLinkedList.getLength()}`);

