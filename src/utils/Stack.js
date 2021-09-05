const items = new WeakMap();
export default class Stack {
  constructor() {
    items.set(this, []);
  }
  push(ele) {
    let s = items.get(this);
    s.push(ele);
  }
  pop() {
    let s = items.get(this);
    return s.pop();
  }
  peek() {
    let s = items.get(this);
    return s[s.length - 1];
  }
  isEmpty() {
    let s = items.get(this);
    return s.length === 0;
  }
  clear() {
    let s = items.get(this);
    let result = [];
    let length = s.length;
    for (let i = 0; i < length; i++) {
      result.push(s.pop(s[i]));
    }
    return result;
  }
  print() {
    let s = items.get(this);
    return s.toString();
  }
}
