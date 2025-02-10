class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (!this.nodes.has(vertex)){
      this.nodes.add(vertex);
    }
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {  
      if (!this.nodes.has(vertex)) {   
        this.nodes.add(vertex);        
      }
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);  // Add v2 to v1's adjacency set
      v2.adjacent.add(v1);  // Add v1 to v2's adjacency set
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);  // Delete v2 to v1's adjacency set
      v2.adjacent.delete(v1);  // Delete v1 to v2's adjacency set
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)){
      this.nodes.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    if (!this.nodes.has(start)) return [];
    const visitedNodes = new Set();  // Track visited nodes
    const result = [];  // Store visited node values

    dfsHelper = (node) => {
      if (visitedNodes.has(node)) return;  // Stop if already visited

      visitedNodes.add(node);  // Mark node as visited
      result.push(node.value);  // Add node value to result

      for (let neighbor of node.adjacent) {
        dfsHelper(neighbor);
      }
    }
    dfsHelper(start);  // Start recursion
    return result;  // Return the final traversal order
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visitedNodes = new Set();  // Track visited nodes
    const queue = [start];  // FIFO Queue (start with the first node)
    const result = [];  // Store visited node values
    
    while (queue.length > 0){
      const node = queue.shift();  // Remove the first element (FIFO)

      if (!visitedNodes.has(node)) {
        visitedNodes.add(node);  // Mark node as visited
        result.push(node.value);  // Add node value to result

        for (let neighbor of node.adjacent) {  // Add neighbors to queue
          if (!visitedNodes.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return result;  // Return final traversal order
  }
}


// Testing of adding edges
let g = new Graph();  // Create a graph

let a = new Node("A");  // Create node A
let b = new Node("B");  // Create node B

g.addVertex(a);  // Add node A to the graph
g.addVertex(b);  // Add node B to the graph

g.addEdge(a, b);  // Add an edge between A and B

console.log(a.adjacent); // Expected output: Set { Node { value: 'B', adjacent: Set { [Circular] } } }
console.log(b.adjacent); // Expected output: Set { Node { value: 'A', adjacent: Set { [Circular] } } }

let c = new Node("C");
g.addVertex(c);
g.addEdge(a, c);

console.log(a.adjacent); // Should now contain {B, C}
console.log(c.adjacent); // Should contain {A}



module.exports = {Graph, Node}