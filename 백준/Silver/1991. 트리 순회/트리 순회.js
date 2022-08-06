const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const n = Number(input[0]);

const nodes = [];
for (let i = 1; i <= n; i++) {
  const [val, left, right] = input[i].trim().split(" ");
  nodes.push([val, left, right]);
}

let preorder_result = "";
let inorder_result = "";
let postorder_result = "";

const root = findNode("A");

function preorder(cur) {
  const [val, left_node, right_node] = cur;

  preorder_result += val;

  if (left_node !== ".") {
    const next = findNode(left_node);
    preorder(next);
  }

  if (right_node !== ".") {
    const next = findNode(right_node);
    preorder(next);
  }
}

function inorder(cur) {
  const [val, left_node, right_node] = cur;

  if (left_node !== ".") {
    const next = findNode(left_node);
    inorder(next);
  }

  inorder_result += val;

  if (right_node !== ".") {
    const next = findNode(right_node);
    inorder(next);
  }
}

function postorder(cur) {
  const [val, left_node, right_node] = cur;

  if (left_node !== ".") {
    const next = findNode(left_node);
    postorder(next);
  }

  if (right_node !== ".") {
    const next = findNode(right_node);
    postorder(next);
  }

  postorder_result += val;
}

function findNode(val) {
  return nodes.find((el) => el[0] === val);
}

preorder(root);
inorder(root);
postorder(root);

console.log(preorder_result + "\n" + inorder_result + "\n" + postorder_result);