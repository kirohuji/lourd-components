import QuestionPreview from "../components/organisms/QuestionPreview";
export default {
  title: "Design System/Organisms/QuestionPreview",
};
const text = `
1、【单选题】当前生存情况
活动能力完全正常，与患病前活动能力无差异
能自由走动和从事轻体力劳动
能自由自动及生活自理，但工作丧失工作能力
卧床不起，生活不能自理
死亡
2、【多选题】您是否有家族病史
糖尿病
高血压
心脏病`;
export const withBasic = () => ({
  render() {
    return <QuestionPreview value={text} />;
  },
});
