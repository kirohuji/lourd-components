export default {
  grid: {
    left: 30,
    right: 10,
    bottom: 30,
    top: 30,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
};
