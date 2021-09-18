import "@/plugins/element";
import "@/plugins/echarts";
import "@/plugins/thenable";
import "@/plugins/baseEnter";
// import { addParameters } from "@storybook/vue";

export const parameters = {
  controls: { expanded: true },
  backgrounds: {
    values: [
      { name: "red", value: "#f00" },
      { name: "green", value: "#0f0" },
    ],
  },
};
