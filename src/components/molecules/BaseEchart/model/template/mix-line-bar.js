export default {
  xAxis: [
    {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  grid: {
    left: 30,
    right: 10,
    bottom: 30,
    top: 30,
  },
  yAxis: [
    {
      type: "value",
      name: "水量",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "温度",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "降水量",
      type: "bar",
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "平均温度",
      type: "line",
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};
