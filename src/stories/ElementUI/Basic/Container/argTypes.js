export default {
  "Container Attributes": {
    rows: {
      direction: {
        control: {
          type: "radio",
          options: ["vertical", "horizontal"],
        },
        description: "子元素的排列方向",
        key: "direction",
        name: "direction",
        table: {
          category: "props ",
          defaultValue: {
            summary: "子元素中有 `el-header` 或 el-footer 时为 vertical，否则为 horizontal",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      }
    },
  },
  "Header Attributes": {
    rows: {
      height: {
        control: {
          type: "string",
        },
        description: "顶栏高度",
        key: "height",
        name: "height",
        table: {
          category: "props ",
          defaultValue: {
            summary: "60px",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      }
    },
  },
  "Aside Attributes": {
    rows: {
      height: {
        control: {
          type: "string",
        },
        description: "侧边栏高度",
        key: "height",
        name: "height",
        table: {
          category: "props ",
          defaultValue: {
            summary: "300px",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      }
    },
  },
  "Footer Attributes": {
    rows: {
      height: {
        control: {
          type: "string",
        },
        description: "底栏高度",
        key: "height",
        name: "height",
        table: {
          category: "props ",
          defaultValue: {
            summary: "60px",
          },
          type: {
            summary: "string",
          },
        },
        type: {
          required: false,
        },
      }
    },
  },
  
};
