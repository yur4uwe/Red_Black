const ERROR = 0; 
const WARNING = 1;
const SUCCESS = 2;

const msgType = ['red', 'orange', 'green'];

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
        this.height = 0;
    }

    checkHeight(node, height)
    {
        if(!node)
        {
            return height;
        }

        return Math.max(this.checkHeight(node.left, height + 1),
                        this.checkHeight(node.right, height + 1));
    }

    FindHelper(value) {
        let currNode = this.root;
    
        while (currNode !== null && currNode.data !== value) {
            if (currNode.data < value) {
                currNode = currNode.right;
            } else {
                currNode = currNode.left;
            }
        }
    
        return currNode;
    }

    Find(value)
    {
        if(this.FindHelper(value) !== null)
            return this.giveResponse(`Node with value ${value} found`, SUCCESS);
        else
            return this.giveResponse(`Node with value ${value} not found`, ERROR);
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

    rbTransplant(u, v) {
        if (u.parent === null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v !== null) {
            v.parent = u.parent; // Update the parent of the replacement node
        }
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
                break;
            }

            if (node.data < key) {
                node = node.right;
            } 
            else if(node.data > key){
                node = node.left;
            }
        }
        
        

        if (z === null) 
        {
            this.giveResponse("Key not found in the tree", ERROR);
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

        this.height = this.checkHeight(this.root, 0);
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
                this.giveResponse("Node already exists", ERROR);
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

        this.height = this.checkHeight(this.root, 0);
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

        let canvasheight = 30, nodeheight = 0;
        
        if(!this.root)
            return;

        let q = [[this.root, canvas.width / 4, canvasheight]];

        while(q.length > 0)
        {
            let size = q.length;
            
            for (let i = 0; i < size; i++) 
            {
                let currNode = q[0][0];
                let coordX = q[0][1], coordY = q[0][2];
                
                let diff = 25 * Math.pow(2, this.height - nodeheight - 2),
                    leftsonX = coordX - diff,
                    rightSonX = coordX + diff;

                if (currNode.left)
                { 
                    q.push([currNode.left, leftsonX, canvasheight + 50]);
                    ctx.beginPath();
                    ctx.moveTo(coordX, coordY);
                    ctx.lineTo(leftsonX, canvasheight + 50);
                    ctx.lineWidth = 2;
                    ctx.lineCap = "round";
                    ctx.stroke();
                }
                if (currNode.right)
                { 
                    q.push([currNode.right, rightSonX, canvasheight + 50]);
                    ctx.beginPath();
                    ctx.moveTo(coordX, coordY);
                    ctx.lineTo(rightSonX, canvasheight + 50);
                    ctx.lineWidth = 2;
                    ctx.lineCap = "round";
                    ctx.stroke();
                }
                q.shift();

                ctx.beginPath();

                ctx.arc(coordX, coordY, 20, 0, 2 * Math.PI);
                
                ctx.fillStyle = currNode.color ? "red" : "black";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.stroke();

                ctx.font = "5px";
                ctx.fillStyle = "white";
                ctx.fillText(currNode.data, coordX - 5, coordY + 2);
            }
            canvasheight += 50;
            nodeheight++;
        }
    }

    giveResponse(message, type) {
        let output = document.getElementById("response");
        
        output.textContent = message;
        output.style.color = msgType[type]; // Set text color based on message type
        
        setTimeout(() => {
            output.textContent = "";
            output.style.color = ""; // Reset text color
            output.style.backgroundColor = ""; // Reset background color
        }, 3000);
    }
}

let tree = new RedBlackTree();

function Insert() 
{
    let input = document.getElementById("ins-inp");

    if (input.value === "" || isNaN(input.value)) {
        tree.giveResponse("Invalid input. Please enter a valid number.", WARNING);
        return;
    }
    
    tree.Insert(parseInt(input.value));

    input.value = '';

    inputBlur('ins-inp');

    tree.Print();
}


function Delete() {
    let input = document.getElementById("del-inp");

    if (input.value === "" || isNaN(input.value)) {
        tree.giveResponse("Invalid input. Please enter a valid number.", WARNING);
        return;
    }

    // Parse input value as an integer before passing it to Delete method
    tree.Delete(parseInt(input.value));

    input.value = '';

    inputBlur('del-inp');

    tree.Print();
}


function Find() 
{
    let input = document.getElementById("find-inp");

    if (input.value === "" || isNaN(input.value)) {
        tree.giveResponse("Invalid input. Please enter a valid number.", WARNING);
        return;
    }
    
    tree.Find(parseInt(input.value));

    inputBlur('find-inp');

    input.value = '';
}

function inputFocus(inputId) 
{
        var field = document.querySelector('[for="' + inputId + '"]').closest('.float-label-field');
        field.classList.add('input-focused');

        var input = document.getElementById(inputId);
}
    
function inputBlur(inputId) 
{
        var input = document.getElementById(inputId);

        if(input.value === '')
        {
                var field = document.querySelector('[for="' + inputId + '"]').closest('.float-label-field');
                field.classList.remove('input-focused');
        }
}