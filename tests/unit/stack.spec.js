import Stack from "../../src/utils/Stack";

describe("Stack", () => {
  it("Stack init", () => {
    let stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    console.log(stack.clear());
  });
});
