export default {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    right: "15%",
    top: "center",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      center: ["45%", "50%"],
      radius: ["35%", "25%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "14",
          fontWeight: "bold",
          formatter: "{d}%\n{b}",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 1048,
          name: "红色居民",
          itemStyle: {
            color: "rgb(236, 48, 79)",
          },
        },
        {
          value: 735,
          name: "黄色居民",
          itemStyle: {
            color: "rgb(239, 211, 34)",
          },
        },
        {
          value: 580,
          name: "绿色居民",
          itemStyle: {
            color: "rgb(71, 235, 67)",
          },
        },
      ],
    },
  ],
};
