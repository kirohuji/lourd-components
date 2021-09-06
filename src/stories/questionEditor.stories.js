import QuestionEditor from "../components/template/Questionnaire/components/QuestionEditor";
import "../components/template/Questionnaire/components/QuestionEditor/index.scss";
export default {
  title: "Design System/Template/Questionnaire/QuestionEditor",
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <QuestionEditor
        {...{
          props: this.$props,
        }}
      />
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  config: false,
};
