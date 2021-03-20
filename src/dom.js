window.dom = {
  create(string) {
    const template = document.createElement('template')
    template.innerHTML = string.trim()
    return template.content.firstChild
  },
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling)
  },
  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node.previousSibling)
  },
  append(parent, child) {
    parent.appendChild(child)
  },
  wrap(node, newNode) {
     this.before(node, newNode)
     this.append(newNode, node)
  },
  remove(node) {
    node.parentNode.removeChild(node)
  },
  empty(node) {
    const arr = []
    while(node.firstChild) {
      arr.push(node.firstChild)
      this.remove(node.firstChild)
    }
    return arr
  },
  attr(node, name, value) {
    if (arguments.length === 2) {
      return node.getAttribute(name)
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  text(node, text) {
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = text;
      } else {
        node.textContent = text;
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.html = string;
    } else if (arguments.length === 1) {
      return node.html;
    }
  },
  style(node, css, value) {
    if (arguments.length === 3) {
      node.style[css] = value;
    } else if (arguments.length === 2) {
      if (typeof css === 'string') {
        return node.style[css]
      } else {
        for (const key in css) {
          if (css.hasOwnProperty(key)) {
            node.style[key] = css[key];
            
          }
        }
      }
    }
  },
  class: {
    add(node, className) {
      if (!node.classList.contains(className)) {
        node.classList.add(className)
      }
    },
    remove(node, className) {
      if (node.classList.contains(className)) {
        node.classList.remove(className)
      }
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  on(node, event, fn) {
    node.addEventListener(event, fn)    
  },
  off(node, event, fn) {
    node.removeEventListener(event, fn)
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    const array = Array.from(node.parentNode.children);
    return array.filter((i) => i !== node);
  },
  next(node) {
    let n = node.nextSibling;
    while(n && n.nodeType === 3) {
      n = n.nextSibling;
    }
    return n;
  },
  previous(node) {
    let n = node.previousNode;
    while(n && n.nodeType === 3) {
      n = n.previousNode;
    }
    return n;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], index, nodeList)
      
    }
  },
  index(node) {
    const { children } = node.parentNode;
    let i;
    for (let i = 0; i < children.length; i++) {
      if (node === children[i]) {
        return i
      }
      
    }
  }
}