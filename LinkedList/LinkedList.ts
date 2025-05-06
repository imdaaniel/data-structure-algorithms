class ListNode {
    public value: number;
    public next: ListNode | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    private head: ListNode | null;
    private tail: ListNode | null;
    private length: number;
    public alwaysShowList: boolean = false;
    
    constructor(alwaysShowList: boolean = false) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.alwaysShowList = alwaysShowList;
    }

    public addNode(value: number) {
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

        if (this.alwaysShowList) {
            return this.getList();
        }
    }

    public addMultipleNodes(values: number[]) {
        values.forEach(value => this.addNode(value));
    }

    public removeNode(node: ListNode, previousNode: ListNode) {
        previousNode.next = node.next;
        this.length -= 1;

        if (this.alwaysShowList) {
            return this.getList();
        }
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

        if (this.alwaysShowList) {
            return this.getList();
        }
    }

    public getList() {
        const head = this.head != null ? this.head.value : null;
        const tail = this.tail != null ? this.tail.value : null;

        let currentNode = this.head;
        let nextNodeValue: number | null;

        console.log(`
            Head: ${head}
            Tail: ${tail}
            Length: ${this.length}`);

        while (currentNode != null) {
            nextNodeValue = currentNode.next != null ? currentNode.next.value : null;
            console.log(`Node: [value: ${currentNode.value}, next: ${nextNodeValue}]`);
            currentNode = currentNode.next;
        }
    }
}

let myLinkedList = new LinkedList(true);

console.log('Adicionando valor 1');
myLinkedList.addNode(1);

console.log('Adicionando valor 2');
myLinkedList.addNode(2);

console.log('Adicionando valor 3');
myLinkedList.addNode(3);

console.log('Adicionando valor 4, 5 e 6');
myLinkedList.addMultipleNodes([4,5,6]);

console.log('Revertendo lista');
myLinkedList.reverseList();