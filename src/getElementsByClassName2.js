var getElementsByClassName = function(className){

  var result = [];
  var classes = className.split(' ');

  var search = function(node) {

    for (var i = 0; i < classes.length; i++) {
      if(!node.classList.contains(classes[i])) {
        break;
      }
      result.push(node);
    }

    if(node.children !== undefined) {
      for(var x = 0; x < node.children.length; x++) {
        search(node.children[x]);
      }
    }

  };

  search(document.body);

  return result;
};
