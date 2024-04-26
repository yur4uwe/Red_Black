const RED = false;
const BLACK = true;

class TreeNode {
    constructor(val = 0, left = null, right = null, parent = null, color = BLACK) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.color = color;
    }
}

class RedBlackTree {
    constructor(val, left, right, parent, color) {
        this.root = new TreeNode(val, left, right, parent, color);
    }

    Insert(value) {
        if (this.Find(value)) {
            return;
        }

        let newNode = new TreeNode(value, null, null, null, RED);

        if (!this.root) {
            newNode.color = BLACK;
            this.root = newNode;
            return;
        }

        let currNode = this.root;
        let parent = null;

        while (currNode) {
            parent = currNode;
            if (currNode.val < value) {
                currNode = currNode.left;
            } else if (currNode.val > value) {
                currNode = currNode.right;
            }
        }

        if (value < parent.val) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        newNode.parent = parent;

        this.Recoloring(newNode);
    }

    Recoloring(node) {
        // If the parent of the node is black, no need to recolor
        if (!node.parent || node.parent.color === BLACK) {
            return;
        }
    
        let grandparent = node.parent.parent;
        let uncle = (node.parent === grandparent.left) ? grandparent.right : grandparent.left;
    
        if (!uncle || uncle.color === BLACK) {
            // Case: Uncle is black or null
            if (node.parent === grandparent.left) {
                if (node === node.parent.right) {
                    // Double rotation (left-right)
                    this.RotateLeft(node.parent);
                    node = node.left;
                }
                // Single rotation (right)
                this.RotateRight(grandparent);
            } else {
                if (node === node.parent.left) {
                    // Double rotation (right-left)
                    this.RotateRight(node.parent);
                    node = node.right;
                }
                // Single rotation (left)
                this.RotateLeft(grandparent);
            }
            // Swap colors of parent and grandparent
            node.parent.color = BLACK;
            grandparent.color = RED;
        } else {
            // Case: Uncle is red
            node.parent.color = BLACK;
            uncle.color = BLACK;
            grandparent.color = RED;
            // Recursively fix violations for grandparent
            this.Recoloring(grandparent);
        }
    }
    

    RotateLeft() {
        // Rotation logic goes here
    }

    RotateRight() {
        // Rotation logic goes here
    }

    Delete(value) {
        // Deletion logic goes here
    }

    Find(value) {
        let currNode = this.root;

        while (currNode && currNode.val !== value) {
            if (currNode.val < value) {
                currNode = currNode.left;
            } else if (currNode.val > value) {
                currNode = currNode.right;
            } else {
                return currNode;
            }
        }

        return currNode;
    }
}
