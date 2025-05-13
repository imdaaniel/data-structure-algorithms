class ListNode {
    public value: any;
    public next: ListNode | null;

    constructor(value: any, next: ListNode | null = null) {
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

    public insertAtIndex(index: number, value: any): boolean {
        if (index < 0 || index > this.length) {
            return false;
        }

        const newNode = new ListNode(value, this.head);
        this.length += 1;

        if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
            return true;
        }

        if (index == this.length) {
            if (this.tail) {
                this.tail.next = newNode
            }
            this.tail = newNode;
            return true;
        }

        let currentNode = this.head!;

        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next!;
        }

        const next = currentNode.next;
        currentNode.next = newNode;
        newNode.next = next;

        return true;
    }

    public removeAtIndex(index: number): boolean {
        if (index < 0 || index > this.length) {
            return false;
        }

        this.length -= 1;

        // todo

        return true;
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

    public getHead(): any | null {
        return this.head ? [this.head.value, this.head.next] : null;
    }

    public getTail(): any | null {
        return this.tail ? [this.tail.value, this.tail.next] : null;
    }

    public getLength(): number {
        return this.length;
    }
}

let myLinkedList = new LinkedList();

console.log('Adicionando A');
myLinkedList.addNode('A');
myLinkedList.printList();

console.log('Removendo D', console.log(myLinkedList.removeNodeByValue('D')));

console.log('Adicionando B e C');
myLinkedList.addMultipleNodes(['B', 'C']);
myLinkedList.printList();

console.log('Adicionando aaa no inicio');
console.log(myLinkedList.insertAtIndex(0, 'aaa'));
myLinkedList.printList();

console.log('Adicionando zzz no final');
console.log(myLinkedList.insertAtIndex(myLinkedList.getLength(), 'zzz'));
myLinkedList.printList();

console.log('Adicionando ESTOU NO MEIO na posicao 2');
console.log(myLinkedList.insertAtIndex(2, 'ESTOU NO MEIO'));
myLinkedList.printList();

// console.log('Revertendo lista');
// myLinkedList.reverseList();

// myLinkedList.printList();

// console.log(`Head: ${myLinkedList.getHeadValue()}`);
// console.log(`Tail: ${myLinkedList.getTailValue()}`);
// console.log(`Length: ${myLinkedList.getLength()}`);

