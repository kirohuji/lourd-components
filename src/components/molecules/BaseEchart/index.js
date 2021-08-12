import Chart from "./model/chart";
import "./index.css";
import _ from "lodash";
export default {
  name: "BaseEchart",
  props: {
    template: String || Function,
    options: Object,
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      root: undefined,
      loading: true,
    };
  },
  watch: {
    isUpdate(val) {
      if (val) {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // debugger;
      this.$set(
        this,
        "root",
        new Chart({
          template: _.cloneDeep(this.template),
          options: _.cloneDeep(this.options),
        })
      );
    },
    isReturn() {
      // 表格没有charts实例
      if (!this.$refs.analysisCharts) {
        return false;
      }
      // 获取echarts实例
      this.chart = this.$refs.analysisCharts.chart;
      if (!this.chart) {
        return false;
      }
      if (!this.chart.getOption().series.length) {
        return false;
      }
      const type = this.chart.getOption().series[0].type;
      if (type === "bar" || type === "line") {
        return false;
      }
      return true;
    },
    echartClick(params) {
      if (this.isReturn()) {
        this.$emit("events", {
          name: "charts-click",
          payload: params,
        });
      }
    },
    zrClick(params) {
      if (this.isReturn()) {
        const dataArr = this.chart.getOption().series[0].data;
        let index; // 获取当前点击项索引
        const pointInPixel = [params.offsetX, params.offsetY];
        if (this.chart.containPixel("grid", pointInPixel)) {
          const res = this.chart.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY,
          ]);
          index =
            this.root.options.hwDirection === "vertical" ? res[1] : res[0];
        }
        // 点击到图表其他区域(比如tooltip)不操作
        if (typeof index !== "number") {
          return;
        }
        // x轴数据
        const xData =
          this.chart.getOption().xAxis[0].data &&
          this.chart.getOption().xAxis[0].data[index];
        const yData =
          this.chart.getOption().yAxis[0].data &&
          this.chart.getOption().yAxis[0].data[index];

        this.$emit("events", {
          name: "charts-click",
          payload: {
            type: "chart",
            data: dataArr[index],
            opts: this.chart.getOption(),
            xData: xData,
            yData: yData,
          },
        });
      }
    },
  },
  render() {
    return (
      this.root && (
        <v-chart
          onClick={(payload) => this.echartClick(payload)}
          {...{
            on: {
              "zr:click": (payload) => this.zrClick(payload),
            },
          }}
          ref="analysisCharts"
          options={this.root.options}
          theme="customed"
          ref="analysisCharts"
          autoresize
          class="base-charts"
        />
      )
    );
  },
};
