import Vue from "vue";
import ECharts from "vue-echarts";
import "echarts";
// 引入自定义配置
// import './customed'
const initOptions = {
  devicePixelRatio: 2,
};
const vChart = {
  functional: true,
  render: function (h, context) {
    const { children, data } = context;
    const tooltip = data.attrs.options && data.attrs.options.tooltip;
    const dataZoom = data.attrs.options && data.attrs.options.dataZoom;
    if (tooltip) {
      tooltip.confine = true;
    }
    if (dataZoom && dataZoom.length) {
      if (dataZoom[0]) {
        dataZoom[0].filterMode = "empty";
      }
      if (dataZoom[1]) {
        dataZoom[1].filterMode = "empty";
      }
    }
    return (
      <ECharts {...data} initOptions={initOptions}>
        {{ ...children }}
      </ECharts>
    );
  },
};
Vue.component("v-chart", vChart);
