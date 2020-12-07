class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return 'Underflow';
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length == 0;
    }
    size() {
        return this.items.length;
    }
}

class SearchBinaryTree {
    /**
     * 
     * @param {node} root - root of the actual tree where the method is searching
     * @param {node} node - node that is wanted to insert in the tree.
     */
    static addNode(root, node) {
        if (root.value.phone == node.value.phone) {
            return false;
        }
        if (root.value.phone < node.value.phone) {
            if (root.right == undefined) {
                root.right = node;
                return true;
            } else {
                return this.addNode(root.right, node);
            }
        } else {
            if (root.left == undefined) {
                root.left = node;
                return true;
            } else {
                return this.addNode(root.left, node);
            }
        }
    }

    /**
     * 
     * @param {Node} root - root of the actual tree where the method is searching
     * @param {integer} phone - number of phone that the methon is seaching in the nodes
     */
    static searchNode(root, phone) {
        if (root.value.phone == phone) {
            return root;
        }

        if (root.value.phone < phone) {
            if (root.right == undefined) {
                return 'Not Found';
            } else {
                return this.searchNode(root.right, phone);
            }
        } else {
            if (root.left == undefined) {
                return 'Not Found';
            } else {
                return this.searchNode(root.left, phone);
            }
        }
    }
}