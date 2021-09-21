export default {
  "Row Attributes": {
    rows: {
      gutter: {
        control: {
          type: "number",
        },
        description: "栅格间隔",
        key: "gutter",
        name: "gutter",
        table: {
          category: "props ",
          defaultValue: {
            summary: "0",
          },
          type: {
            summary: "number",
          },
        },
        type: {
          required: false,
        },
      },
      type: {
        control: {
          type: "text",
        },
        description: "布局模式，可选 flex，现代浏览器下有效",
        key: "type",
        name: "type",
        table: {
          category: "props ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      justify: {
        control: {
          type: "radio",
          options: ["start", "end", "center", "space-around", "space-between"],
        },
        description: "flex 布局下的水平排列方式",
        key: "justify",
        name: "justify",
        table: {
          category: "props ",
          defaultValue: {
            summary: "start",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      align: {
        control: {
          type: "radio",
          options: ["top", "middle", "bottom"],
        },
        description: "flex 布局下的垂直排列方式",
        key: "align",
        name: "align",
        table: {
          category: "props ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      tag: {
        control: {
          type: "text",
        },
        description: "自定义元素标签",
        key: "tag",
        name: "tag",
        table: {
          category: "props ",
          defaultValue: {
            summary: "div",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      // c: {
      //   control: {
      //     type: "text",
      //   },
      //   description: "someString description",
      //   key: "someString",
      //   name: "Some String",
      //   table: {
      //     category: "events ",
      //     defaultValue: {
      //       summary: "reallylongstringnospaces",
      //     },
      //     type: {
      //       summary: "string",
      //     },
      //   },
      //   type: {
      //     required: true,
      //   },
      // },
    },
  },
  "Col Attributes": {
    rows: {
      span: {
        control: {
          type: "number",
        },
        description: "栅格占据的列数",
        key: "span",
        name: "span",
        table: {
          category: "props ",
          defaultValue: {
            summary: "24",
          },
          type: {
            summary: "number",
          },
        },
        type: {
          required: false,
        },
      },
      offset: {
        control: {
          type: "text",
        },
        description: "栅格左侧的间隔格数",
        key: "offset",
        name: "offset",
        table: {
          category: "props ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      push: {
        control: {
          type: "text",
        },
        description: "flex 布局下的水平排列方式",
        key: "push",
        name: "push",
        table: {
          category: "props ",
          defaultValue: {
            summary: "start",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      pull: {
        control: {
          type: "text",
        },
        description: "栅格向左移动格数",
        key: "pull",
        name: "pull",
        table: {
          category: "props ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      tag: {
        control: {
          type: "text",
        },
        description: "自定义元素标签",
        key: "tag",
        name: "tag",
        table: {
          category: "props ",
          defaultValue: {
            summary: "div",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      },
      xs: {
        control: {
          type: "text",
        },
        description: "<768px 响应式栅格数或者栅格属性对象	",
        key: "tag",
        name: "tag",
        table: {
          category: "responsive(响应式) ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "number/object (例如： {span: 4, offset: 4})",
          },
        },
        type: {
          required: false,
        },
      },
      sm: {
        control: {
          type: "text",
        },
        description: "≥768px 响应式栅格数或者栅格属性对象	",
        key: "sm",
        name: "sm",
        table: {
          category: "responsive(响应式) ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "number/object (例如： {span: 4, offset: 4})",
          },
        },
        type: {
          required: false,
        },
      },
      md: {
        control: {
          type: "text",
        },
        description: "≥992px 响应式栅格数或者栅格属性对象	",
        key: "md",
        name: "md",
        table: {
          category: "responsive(响应式) ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "number/object (例如： {span: 4, offset: 4})",
          },
        },
        type: {
          required: false,
        },
      },
      lg: {
        control: {
          type: "text",
        },
        description: "≥1200px 响应式栅格数或者栅格属性对象	",
        key: "lg",
        name: "lg",
        table: {
          category: "responsive(响应式) ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "number/object (例如： {span: 4, offset: 4})",
          },
        },
        type: {
          required: false,
        },
      },
      xl: {
        control: {
          type: "text",
        },
        description: "≥1920px 响应式栅格数或者栅格属性对象",
        key: "xl",
        name: "xl",
        table: {
          category: "responsive(响应式) ",
          defaultValue: {
            summary: "---",
          },
          type: {
            summary: "number/object (例如： {span: 4, offset: 4})",
          },
        },
        type: {
          required: false,
        },
      },
      // c: {
      //   control: {
      //     type: "text",
      //   },
      //   description: "someString description",
      //   key: "someString",
      //   name: "Some String",
      //   table: {
      //     category: "events ",
      //     defaultValue: {
      //       summary: "reallylongstringnospaces",
      //     },
      //     type: {
      //       summary: "string",
      //     },
      //   },
      //   type: {
      //     required: true,
      //   },
      // },
    },
  },
};
