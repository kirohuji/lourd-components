import BaseEchart from "../components/molecules/BaseEchart";

export default {
  component: BaseEchart,
  title: "molecules/BaseEchart",
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

/** 使用了JSX语法 */
export const withBarChartByJSX = () => ({
  render() {
    return <BaseEchart template="bar-chart" />;
  },
});
withBarChartByJSX.storyName = "bar-chart(Jsx)";

/** 使用了template语法 */
export const withBarStackByTemplate = () => ({
  components: { BaseEchart },
  template: '<BaseEchart template="bar-stack"  />',
});
withBarStackByTemplate.storyName = "bar-stack(template)";

/** 使用了props进行数据的传参数 */

export const withLineSmooth = () => ({
  components: { BaseEchart },
  props: {
    template: {
      type: String,
      default: "line-smooth",
    },
  },
  template: '<BaseEchart :template="template" />',
});

withLineSmooth.storyName = "line-smooth(值使用props传参)";

const Template = (args, { argTypes }) => ({
  components: { BaseEchart },
  props: Object.keys(argTypes),
  template: '<BaseEchart v-bind="$props" />',
});
export const withBarYCategory = Template.bind({});
withBarYCategory.args = { template: "bar-y-category" };

withBarYCategory.storyName = "bar-y-category(值使用props传参($props简洁语法))";

export const withLineStack = () => ({
  render() {
    return <BaseEchart template="line-stack" />;
  },
});
export const withMixLineBar = () => ({
  render() {
    return <BaseEchart template="mix-line-bar" />;
  },
});
export const withPieDoughnut = () => ({
  render() {
    return <BaseEchart template="pie-doughnut" />;
  },
});
export const withCandlestickSimple = () => ({
  render() {
    return <BaseEchart template="candlestick-simple" options={{}} />;
  },
});
