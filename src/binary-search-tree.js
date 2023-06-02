const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  roots() {
    if(this.root === null) return null;
    return this.root.data;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    }
    let current = this.root;
    while(current) {
      if(data === current.data) return undefined;
      if(data < current.data) {
        if(current.left === null){
          current.left = newNode;  
          return this;        
        }
        current = current.left;
      } else {
        if(current.right === null){
          current.right = newNode;
          return this;
        } 
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.root;
    while(current) {
      if(data === current.data) return true;
      if(data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.root;
    while(current) {
      if(data === current.data) return current;
      if(data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    if (this.root === null) return null;
    this.root = this._deleteNode(this.root, data);
  }

  _deleteNode(currentNode, itemData) {
    if (currentNode.data === itemData) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      if (currentNode.left === null) {
        return currentNode.right;
      }
      if (currentNode.right === null) {
        return currentNode.left;
      }  
      const minNodeInRightSubtree = this._findMinNode(currentNode.right);
      currentNode.data = minNodeInRightSubtree.data;
      currentNode.right = this._deleteNode(currentNode.right, minNodeInRightSubtree.data);
      return currentNode;
    }

    if (itemData < currentNode.data) {
      if (currentNode.left === null) {
        console.warn(elementNotFoundMessage);
        return currentNode;
      }

      currentNode.left = this._deleteNode(currentNode.left, itemData);
      return currentNode;
    }
    if (itemData > currentNode.data) {
      if (currentNode.right === null) {
        console.warn(elementNotFoundMessage);
        return currentNode;
      }
      
      currentNode.right = this._deleteNode(currentNode.right, itemData);
      return currentNode;
    }
  }

  _findMinNode(node) {
    if (node.left === null) return node;
    return this._findMinNode(node.left);
  }
  
  min() {
    let current = this.root;
    if(!current) {
      return null;
    }
    while(current) {
      if(!current.left){
        return current.data;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  max() {
    let current = this.root;
    if(!current) {
        return null;
    }
    while(current) {
      if(!current.right){
        return current.data;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}

module.exports = {
  BinarySearchTree
};