const RED = true;
const BLACK = false;

class Node {
    constructor(data, color) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.color = color; // 0 for black, 1 for red
    }
}

class RedBlackTree {
    constructor() 
    {
        this.root = null;
    }

    FindHelper(value) {
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

    Find(value)
    {
        if(this.FindHelper(value))
            return this.giveResponse(`Node with value ${value} found`);
        else
            return this.giveResponse(`Node with value ${value} not found`);
    }

    leftRotate(node) 
    {
        let y = node.right;
        node.right = y.left;

        if (y.left !== null) 
        {
            y.left.parent = node;
        }

        y.parent = node.parent;
        if (node.parent === null) {
            this.root = y;
        } 
        else if (node === node.parent.left) {
            node.parent.left = y;
        } 
        else {
            node.parent.right = y;
        }

        y.left = node;
        node.parent = y;
    }

    rightRotate(x) 
    {
        let y = x.left;
        x.left = y.right;

        if (y.right !== null) 
            y.right.parent = x;

        y.parent = x.parent;
        if (x.parent === null) 
            this.root = y;
        else if (x === x.parent.right) 
            x.parent.right = y;
        else 
            x.parent.left = y;
        
        y.right = x;
        x.parent = y;
    }   

    rbTransplant(u, v) 
    {
        if (u.parent === null) {
            this.root = v;
        } 
        else if (u === u.parent.left) {
            u.parent.left = v;
        } 
        else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    Delete(key) 
    {
        let z = null;
        let x, y;
        let node = this.root;

        while (node !== null) 
        {
            if (node.data === key) {
                z = node;
            }

            if (node.data <= key) {
                node = node.right;
            } 
            else {
                node = node.left;
            }
        }

        if (z === null) 
        {
            this.giveResponse("Key not found in the tree");
            return;
        }

        y = z;
        let y_original_color = y.color;
        if (z.left === null) 
        {
            x = z.right;
            this.rbTransplant(z, z.right);
        } 
        else if (z.right === null) 
        {
            x = z.left;
            this.rbTransplant(z, z.left);
        } 
        else 
        {
            y = this.minimum(z.right);
            y_original_color = y.color;
            x = y.right;
            if (y.parent === z) 
            {
                x.parent = y;
            }
            else 
            {
                this.rbTransplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }

            this.rbTransplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }

        if (y_original_color === 0) {
            this.deleteFix(x);
        }
    }

    minimum(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    deleteFix(x) 
    {
        let s;
        while (x !== this.root && x.color === 0) 
        {
            if (x === x.parent.left) 
            {
                s = x.parent.right;
                if (s.color === 1) 
                {
                    s.color = 0;
                    x.parent.color = 1;
                    this.leftRotate(x.parent);
                    s = x.parent.right;
                }

                if (s.left.color === 0 && s.right.color === 0) 
                {
                    s.color = 1;
                    x = x.parent;
                } 
                else 
                {
                    if (s.right.color === 0) 
                    {
                        s.left.color = 0;
                        s.color = 1;
                        this.rightRotate(s);
                        s = x.parent.right;
                    }

                    s.color = x.parent.color;
                    x.parent.color = 0;
                    s.right.color = 0;
                    this.leftRotate(x.parent);
                    x = this.root;
                }
            } 
            else 
            {
                s = x.parent.left;
                if (s.color === 1) 
                {
                    s.color = 0;
                    x.parent.color = 1;
                    this.rightRotate(x.parent);
                    s = x.parent.left;
                }

                if (s.right.color === 0 && s.right.color === 0)
                {
                    s.color = 1;
                    x = x.parent;
                } 
                else
                {
                    if (s.left.color === 0)
                    {
                        s.right.color = 0;
                        s.color = 1;
                        this.leftRotate(s);
                        s = x.parent.left;
                    }

                    s.color = x.parent.color;
                    x.parent.color = 0;
                    s.left.color = 0;
                    this.rightRotate(x.parent);
                    x = this.root;
                }
            }
        }
        x.color = 0;
    }

    Insert(key) 
    {
        let node = new Node(key, 1);
        let parent = null;
        let currNode = this.root;

        while (currNode !== null) {
            parent = currNode;
            if (node.data < currNode.data) {
                currNode = currNode.left;
            } 
            else if(node.data > currNode.data){
                currNode = currNode.right;
            }
            else
            {
                this.giveResponse("Node already exists");
                return;
            }
        }

        node.parent = parent;
        if (parent === null) {
            this.root = node;
        } 
        else if (node.data < parent.data) {
            parent.left = node;
        } 
        else {
            parent.right = node;
        }

        if (node.parent === null) {
            node.color = 0;
            return;
        }

        if (node.parent.parent === null) {
            return;
        }

        this.insertFix(node);
    }

    insertFix(k) {
        let u;
    
        while (k.parent && k.parent.color === 1) {
            if (k.parent === k.parent.parent.right) {
                u = k.parent.parent.left;
    
                if (u && u.color === 1) {
                    u.color = 0;
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.left) {
                        k = k.parent;
                        this.rightRotate(k);
                    }
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    this.leftRotate(k.parent.parent);
                }
            } else {
                u = k.parent.parent.right;
    
                if (u && u.color === 1) {
                    u.color = 0;
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.right) {
                        k = k.parent;
                        this.leftRotate(k);
                    }
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    this.rightRotate(k.parent.parent);
                }
            }
            if (k === this.root) {
                break;
            }
        }
        this.root.color = 0;
    }

    Print()
    {        
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let height = 30;
        
        if(!this.root)
            return;

        let q = [this.root];

        while(q.length > 0)
        {
            let size = q.length;
            
            for (let i = 0; i < size; i++) 
            {
                let currNode = q[0];
                
                ctx.beginPath();

                ctx.arc(canvas.width / 4 + i * 50, height, 20, 0, 2 * Math.PI);
                
                ctx.fillStyle = currNode.color ? "red" : "black";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.stroke();

                ctx.font = "5px";
                ctx.fillStyle = "white";
                ctx.fillText(currNode.data, canvas.width / 4 + i * 50 - 5, height + 2);
            
                if (currNode.left) q.push(currNode.left);
                if (currNode.right) q.push(currNode.right);
                q.shift()
            }
            height += 60;
        }
    }

    giveResponse(message)
    {
        let output = document.getElementById("response");
        
        output.textContent = message; // Use '=' instead of '()' to set text content
        
        setTimeout(() => {
            output.textContent = ""; // Reset text content after 3000 milliseconds
        }, 3000);
    }
}

let tree = new RedBlackTree();

//tree.Print();

function Insert() {
    // Get the input value from the input field
    let inputValue = document.getElementById("ins-inp").value;

    // Check if the input is empty or not a number
    if (inputValue === "" || isNaN(inputValue)) {
        // Display an error message or handle the invalid input
        tree.giveResponse("Invalid input. Please enter a valid number.");
        return;
    }
    
    // Call the Insert function with the input value
    tree.Insert(parseInt(inputValue)); // Convert input value to integer before insertion

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

