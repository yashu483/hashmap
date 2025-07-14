'use strict';

import { HashMap } from './hashmap';

// add HashMap constructor to window so that it can be used in console
window.HashMap = HashMap;

const myMap = new HashMap(); // or HashMap() if using a factory

myMap.set('apple', 'red');
myMap.set('banana', 'yellow');
myMap.set('carrot', 'orange');
myMap.set('dog', 'brown');
myMap.set('elephant', 'gray');
myMap.set('frog', 'green');
myMap.set('grape', 'purple');
myMap.set('hat', 'black');
myMap.set('ice cream', 'white');
myMap.set('jacket', 'blue');
myMap.set('kite', 'pink');
myMap.set('lion', 'golden');

window.myMap = myMap;

function initialize() {
  console.clear();
  console.log('');
  console.log(
    `You can use HashMap constructor to test the code. myMap is a built in hashmap created using same HashMap constructor. And it contains key value pair as shown in the table on landing page. You can freely test it.`,
  );
}

initialize();
