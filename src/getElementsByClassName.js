// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return Array.prototype.slice.apply(document.getElementsByClassName(className));
// };
// jQuery(document).ready(function($) {
// console.log("doc body is " + document.body);
  var getElementsByClassName = function(targetClass) {
    // firstchild -- first child of a given node
    // nextsibling -- next sibling of a given node    

    //  nodeType;
    // ELEMENT_NODE    1
    // TEXT_NODE   3
    // COMMENT_NODE    8

    // parentNode;
    // childNodes;
    // firstChild;
    // lastChild;
    // previousSibling;
    // nextSibling;


    // The general recursive pattern for traversing a (non-empty) binary tree is this: At node N you must do these three things:

    // (L) recursively traverse its left subtree. When this step is finished you are back at N again.
    // (R) recursively traverse its right subtree. When this step is finished you are back at N again.
    // (N) Actually process N itself.

    //depth first preorder
    //do something with the node
    //look at the node's first child
    //recursively look at at that nodes child
    //then look at its siblings

    var result = [];
    var storeTargetedClass = function(node) {
      if (node.nodeType === 1 && node.classList.contains(targetClass)) {
        result.push(node);
      }
    };

    var walkTheDOM = function(node, func) {
      func(node);
      node = node.firstChild;
      while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
      }
    };

    walkTheDOM(document.body, storeTargetedClass);
    return result;
  };
