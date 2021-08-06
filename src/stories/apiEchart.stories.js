import ApiEchart from "../components/organisms/ApiEchart/index";

export default {
  component: ApiEchart,
  title: "Design System/Organisms/ApiEchart(未写完)",
  argTypes: {
    isLoading: {
      control: { type: "boolean" },
    },
    template: {
      control: {
        type: "radio",
        options: ["bar-chart", "line-stack", "bar-stack", "pie-doughnut"],
      },
    },
    options: {
      control: { type: "object" },
    },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: "red", value: "#f00" },
        { name: "green", value: "#0f0" },
        { name: "blue", value: "#00f" },
      ],
    },
  },
  decorators: [
    () => ({
      template:
        '<div style="margin:auto auto;margin-top: 77px;height:500px;width:500px;position: relative;"><story /></div>',
    }),
  ],
};
// export const withPieDoughnut = () => ({
//   render() {
//     return <ApiEchart template="pie-doughnut" />;
//   },
// });

const Template = (args, { argTypes }) => ({
  components: { ApiEchart },
  props: Object.keys(argTypes),
  template: `<ApiEchart 
                :template="template"
                :options="options"
                :isLoading="isLoading"
             />`,
});
export const withPieDoughnut = Template.bind({});
withPieDoughnut.args = {
  /**
   * @description "模板名称"
   */
  template: "pie-doughnut",
  options: {},
  isLoading: false,
};
