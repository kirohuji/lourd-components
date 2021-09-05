import QuestionEditor from "../components/organisms/QuestionEditor";
import "../components/organisms/QuestionEditor/index.scss";
export default {
  title: "Design System/Organisms/QuestionEditor",
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
