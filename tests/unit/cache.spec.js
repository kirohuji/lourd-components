// import { expect } from "chai";
import { dictionaries } from "../../src/composables/context-cache";
describe("Cache", () => {
  it("Dictionaries Cached", () => {
    const dic = dictionaries("test1");
    dic((str) => console.log(str), "test1");
    dic((str) => console.log(str), "test2");
    const dic2 = dictionaries("test2");
    dic2((str) => console.log(str), "test2");
    dic2((str) => console.log(str), "test3");
  });
});
