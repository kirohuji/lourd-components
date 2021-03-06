import Vue from "vue";
import "@/plugins/element";
import "@/plugins/echarts";
import ThenableProvider from "@/plugins/thenable";
import BaseEnterProvider from "@/plugins/baseEnter";
import { addParameters } from "@storybook/vue";
import Croppa from 'vue-croppa'

Vue.use(Croppa)       
Vue.use(ThenableProvider);
Vue.use(BaseEnterProvider);
export const parameters = {
  controls: { expanded: true },
  backgrounds: {
    values: [
      { name: "red", value: "#f00" },
      { name: "green", value: "#0f0" },
    ],
  },
  options: {
    storySort: { order: ["概述(Introduction)", "基本布局"] },
  },
};

addParameters({
  docs: {
    inlineStories: true,
  },
});
