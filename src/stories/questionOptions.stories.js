import { Radio } from "element-ui";
import QuestionOption from "../components/molecules/QuestionOption";

export default {
  title: "Design System/Molecules/QuestionOptions",
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <QuestionOption
        {...{
          props: this.$props,
        }}
      >
        <Radio label="1" name="1">
          1
        </Radio>
      </QuestionOption>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  config: true,
};
