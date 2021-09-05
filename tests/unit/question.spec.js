import Stack from "../../src/utils/Stack";

const text = `
1、【单选题】当前生存情况
活动能力完全正常，与患病前活动能力无差异
能自由走动和从事轻体力劳动
能自由自动及生活自理，但工作丧失工作能力
卧床不起，生活不能自理
死亡
2、【多选题】您是否有家
糖尿病
高血压
心脏病
3、【多选题】您是否有家族病史
糖尿病
高血压
心脏病
`;
describe("Question", () => {
  it("[0-9]+、.*", () => {
    let pattern = /[0-9]*、.*/g;
    let questions = new Map();
    let temp = new Stack();
    const textList = text.split("\n");
    textList.forEach((e) => {
      if (pattern.test(e)) {
        if (temp.isEmpty()) {
          temp.push(e);
        } else {
          let question = temp.clear().reverse();
          questions.set(question[0], question);
          temp.push(e);
        }
      } else {
        temp.push(e);
      }
    });
    if (!temp.isEmpty()) {
      let question = temp.clear().reverse();
      questions.set(question[0], question);
    }
  });
});
