export default {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: {
      lineStyle: {
        color: "rgba(194, 194, 194, 1)",
      },
    },
    axisLabel: {
      color: "black",
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  grid: {
    left: 30,
    right: 10,
    bottom: 30,
    top: 30,
  },
  series: [
    {
      data: [820, 932, 801, 934, 1290, 1330, 920],
      type: "line",
      smooth: true,
    },
    {
      data: [120, 332, 201, 134, 190, 230, 120],
      type: "line",
      smooth: true,
    },
  ],
};
