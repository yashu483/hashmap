'use strict';
import { LinkedList } from './linkedlist';

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.container = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 32;
    }

    return hashCode;
  }

  length() {
    let count = 0;
    this.container.forEach((item) => {
      if (item instanceof LinkedList) {
        count += item.size;
      }
    });
    return count;
  }
  appendFromLinkedList(node) {
    if (node.next === null) {
      this.set(node.key, node.value);
      return;
    } else {
      this.set(node.key, node.value);
      this.appendFromLinkedList(node.next);
    }
  }
  loadFactorReached() {
    const totalBuckets = this.length();
    const currentLoad = Math.round(this.capacity * this.loadFactor);
    return totalBuckets >= currentLoad;
  }
  increaseCapacity() {
    this.capacity *= 2;
    let tempContainer = this.container;
    this.container = [];
    tempContainer.forEach((item, index) => {
      if (Object.prototype.hasOwnProperty.call(tempContainer, index)) {
        this.appendFromLinkedList(item.head);
      }
    });
  }
  set(key, value) {
    const hashCode = this.hash(key);
    if (this.loadFactorReached()) {
      this.increaseCapacity();
    }
    if (!Object.prototype.hasOwnProperty.call(this.container, hashCode)) {
      const list = new LinkedList();
      list.append(key, value);
      this.container[hashCode] = list;
      return;
    } else {
      if (this.container[hashCode].contains(key)) {
        let valueIndex = this.container[hashCode].find(key);
        this.container[hashCode].insertAt(key, value, valueIndex);
        return;
      } else {
        this.container[hashCode].append(key, value);
        return;
      }
    }
  }
  get(key) {
    const hashCode = this.hash(key);

    if (!Object.prototype.hasOwnProperty.call(this.container, hashCode)) {
      return null;
    }

    if (this.container[hashCode].contains(key)) {
      let keyIndex = this.container[hashCode].find(key);
      let node = this.container[hashCode].at(keyIndex);
      return node.value;
    } else {
      return null;
    }
  }
  has(key) {
    const hashCode = this.hash(key);

    if (!Object.prototype.hasOwnProperty.call(this.container, hashCode)) {
      return false;
    }
    if (this.container[hashCode].contains(key)) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (!Object.prototype.hasOwnProperty.call(this.container, hashCode)) {
      return false;
    }
    if (this.container[hashCode].contains(key)) {
      let keyIndex = this.container[hashCode].find(key);
      this.container[hashCode].removeAt(keyIndex);
      if (this.container[hashCode].size === 0) {
        this.container.splice(hashCode, 1);
        return true;
      }
      return true;
    } else {
      return false;
    }
  }
  clear() {
    this.container = [];
  }
  keys() {
    let arr = [];
    this.container.forEach((item, index) => {
      if (Object.prototype.hasOwnProperty.call(this.container, index)) {
        function returnKeys(node, array) {
          if (node.next === null) {
            array.push(node.key);
            return;
          } else {
            array.push(node.key);
            returnKeys(node.next, array);
          }
        }
        returnKeys(item.head, arr);
      }
    });
    return arr;
  }

  values() {
    let arr = [];
    this.container.forEach((item, index) => {
      if (Object.prototype.hasOwnProperty.call(this.container, index)) {
        function returnKeys(node, array) {
          if (node.next === null) {
            array.push(node.value);
            return;
          } else {
            array.push(node.value);
            returnKeys(node.next, array);
          }
        }
        returnKeys(item.head, arr);
      }
    });
    return arr;
  }
  entries() {
    let keyArr = this.keys();
    let valueArr = this.values();

    const entryArr = [];
    for (let i = keyArr.length; i > 0; i--) {
      let tempArr = [];
      tempArr.push(keyArr[i]);
      tempArr.push(valueArr[i]);
      entryArr.push(tempArr);
    }
    return entryArr;
  }
}

export { HashMap };
