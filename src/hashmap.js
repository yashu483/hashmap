'use strict';

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }
}

export { HashMap };
