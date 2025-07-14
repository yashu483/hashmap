'use strict';

class Node {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  get size() {
    let count = 0;

    const getSize = function getSize(node) {
      count += 1;
      if (node.next === null) {
        return count;
      } else {
        return getSize(node.next);
      }
    };
    return getSize(this.head);
  }
  at(index) {
    const getNode = function getNode(node, index) {
      if (index === 0) {
        return node;
      } else if (node.next === null && index > 0) {
        return 'Error: Out of range Index.';
      } else {
        return getNode(node.next, index - 1);
      }
    };
    return getNode(this.head, index);
  }
  pop() {
    const remove = function remove(node) {
      if (node.next.next === null) {
        node.next = null;
        return node;
      } else {
        return remove(node.next);
      }
    };
    this.tail = remove(this.head);
  }

  contains(key) {
    const check = function check(node) {
      if (node.next === null && node.value !== key) {
        return false;
      } else if (node.key === key) {
        return true;
      } else {
        return check(node.next);
      }
    };
    return check(this.head);
  }

  find(key) {
    let count = 0;
    const check = function check(node) {
      if (node.next === null && node.key !== key) {
        return null;
      } else if (node.key === key) {
        return count;
      } else {
        count += 1;
        return check(node.next);
      }
    };
    return check(this.head);
  }
  toString() {
    let string = '';
    const createString = function createString(node) {
      if (node.next === null) {
        return string + `(${node.value}) -> (${node.next})`;
      } else {
        string = string + `(${node.value})` + ` -> `;
        return createString(node.next);
      }
    };
    return createString(this.head);
  }

  insertAt(key, value, index) {
    const newNode = new Node(key, value);
    if (index === 0) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
      return;
    }
    let count = index;

    const insert = function insert(node, count) {
      if ((count > 1 && node.next === null) || count < 0) {
        console.log('Out of range index.');
        return;
      }
      if (count === 1 && node.next === null) {
        node.next = newNode;
        return;
      } else if (count === 1) {
        newNode.next = node.next;
        node.next = newNode;
      } else {
        insert(node.next, count - 1);
      }
    };
    insert(this.head, count);
    if (this.tail.next !== null) {
      this.tail = this.tail.next;
    }
  }

  removeAt(index) {
    if (index === 0) {
      if (this.head === null) {
        return;
      } else {
        this.head = this.head.next;
        return;
      }
    }
    const remove = function remove(node, index) {
      if (
        (index === 1 && node.next === null) ||
        index < 0 ||
        (index > 1 && node.next === null)
      ) {
        console.log('Out of range index.');
        return;
      } else if (index === 1) {
        node.next = node.next.next;
        return;
      } else {
        remove(node.next, index - 1);
      }
    };
    remove(this.head, index);
  }
}

export { LinkedList };
