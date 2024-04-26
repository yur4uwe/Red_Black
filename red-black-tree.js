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

class redBlackTree{
    constructor(val, left, right, parent, color)
    {
        this.root = new TreeNode(
            val === undefined ? 0 : val,
            left === undefined ? null : left,
            right === undefined ? null : right,
            parent === undefined ? null : parent,
            color
        );
    }

    Insert(node, value) 
    {
        if(this.Find(value))
            return;

        let newNode = new TreeNode(value, null, null, null, RED);

        if(!this.root)
        {
            newNode.color = BLACK;
            this.root = newNode;
            return;
        }

        let currNode = this.root;
        let parent = null;

        while(currNode)
        {
            parent = currNode;
            if(currNode.val < value)
            {
                currNode = currNode.left;
            }
            else if(currNode > value)
            {
                currNode = currNode.right;
            }
        }

        if(value < parent.val)
            parent.left = newNode;
        else
            parent.right = newNode;

        newNode.parent = parent;

        this.Recoloring(newNode);
    }

    Recoloring(node)
    {

    }

    Rotation()
    {

    }

    Delete(value)
    {

    }

    Find(value)
    {
        let currNode = this.root;

        while(currNode && currNode.val !== value)
        {
            if(currNode.val < value)
            {
                currNode = currNode.left;
            }
            else if(currNode > value)
            {
                currNode = currNode.right;
            }
            else
                return currNode ? currNode : null;
        }

        return currNode ? currNode : null;
    }
};