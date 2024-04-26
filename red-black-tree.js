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
            return; // Node already exists
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
            if (value < currNode.val) {
                currNode = currNode.left;
            } else if (value > currNode.val) {
                currNode = currNode.right;
            } else {
                // Value already exists in the tree
                return;
            }
        }
    
        // Now currNode is null, and parent is the parent of the new node
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
        if(node === this.root)
        {
            node.color = BLACK;
            return;
        }
            
        
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

    Print()
    {
        var container = document.getElementById("container2");
        
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        let q = [this.root];

        while(q.length > 0)
        {
            let size = q.length;
            var newLevel = document.createElement("div")
            newLevel.classList.add("level");

            container.appendChild(newLevel);

            for(let i = 0; i < size; i++)
            {
                let currNode = q[0];
                
                var newDiv = document.createElement("div");
                
                newDiv.textContent = currNode.val;
                if(!currNode.color)
                    newDiv.style.background = "black";
                else
                    newDiv.style.background = "red";

                newDiv.classList.add("node");

                newLevel.appendChild(newDiv);

                if(currNode.left) q.push(currNode.left);
                if(currNode.right) q.push(currNode.right);
                q.shift()
            }
        }
    }
}

let tree = new RedBlackTree();

tree.Print();

function Insert() {
    // Get the input value from the input field
    let inputValue = document.getElementById("ins-inp").value;
    
    // Call the Insert function with the input value
    tree.Insert(inputValue);

    tree.Print();
}

function Delete() {
    // Get the input value from the input field
    let inputValue = document.getElementById("del-inp").value;
    
    // Call the Delete function with the input value
    tree.Delete(inputValue);

    tree.Print();
}

function Find() {
    // Get the input value from the input field
    let inputValue = document.getElementById("find-inp").value;
    
    // Call the Find function with the input value
    tree.Find(inputValue);
}

