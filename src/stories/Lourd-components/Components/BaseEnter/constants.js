export const common = {
  disabled: false,
  readonly: false,
  clearable: false,
  size: "mini",
  placeholder: "请输入内容",
};
export const commomTypes = {
  size: {
    description: "Element ui 组件自带的属性：组件大小",
    options: ["medium", "small", "mini"],
    control: { type: "radio" },
  },
};
export const cascaderOptions = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        disabled: true,
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          {
            value: "cexiangdaohang",
            label: "侧向导航",
          },
          {
            value: "dingbudaohang",
            label: "顶部导航",
          },
        ],
      },
    ],
  },
];
