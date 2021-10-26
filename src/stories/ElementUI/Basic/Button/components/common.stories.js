import "./common.scss";
export default {
  title: "Element UI/组件/Basic/Button/案例",
  argTypes: {
    size: {
      table: {
        type: { summary: "string" },
      },
      description: "尺寸",
      control: {
        type: "select",
        options: ["medium", "small", "mini"],
        summary: "string",
      },
    },
    type: {
      table: {
        type: { summary: "string" },
      },
      description: "类型",
      control: {
        type: "select",
        options: ["primary", "success", "warning", "danger", "info", "text"],
      },
    },
    plain: {
      description: "是否是朴素按钮",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    round: {
      description: "是否是圆角按钮",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    circle: {
      description: "是否是圆形按钮",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    loading: {
      description: "是否加载中状态",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: "是否禁用状态",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    icon: {
      description: "图标类名",
      control: { type: "string" },
      table: {
        type: { summary: "string" },
      },
    },
    autofocus: {
      description: "是否默认聚焦",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: { type: "boolean" },
    },
    "native-type": {
      description: "原生type属性",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "button" },
      },
      control: {
        type: "select",
        options: ["button", "submit", "reset"],
      },
    },
  },
  decorators: [
    () => ({ template: '<div style="margin: 1em;"><story/></div>' }),
  ],
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>

        <el-row>
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>
            主要按钮
          </el-button>
          <el-button type="success" plain>
            成功按钮
          </el-button>
          <el-button type="info" plain>
            信息按钮
          </el-button>
          <el-button type="warning" plain>
            警告按钮
          </el-button>
          <el-button type="danger" plain>
            危险按钮
          </el-button>
        </el-row>

        <el-row>
          <el-button round>圆角按钮</el-button>
          <el-button type="primary" round>
            主要按钮
          </el-button>
          <el-button type="success" round>
            成功按钮
          </el-button>
          <el-button type="info" round>
            信息按钮
          </el-button>
          <el-button type="warning" round>
            警告按钮
          </el-button>
          <el-button type="danger" round>
            危险按钮
          </el-button>
        </el-row>

        <el-row>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
      </div>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {};
withBasic.storyName = "基础用法";

export const withDisable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-row>
          <el-button disabled>默认按钮</el-button>
          <el-button type="primary" disabled>
            主要按钮
          </el-button>
          <el-button type="success" disabled>
            成功按钮
          </el-button>
          <el-button type="info" disabled>
            信息按钮
          </el-button>
          <el-button type="warning" disabled>
            警告按钮
          </el-button>
          <el-button type="danger" disabled>
            危险按钮
          </el-button>
        </el-row>

        <el-row>
          <el-button plain disabled>
            朴素按钮
          </el-button>
          <el-button type="primary" plain disabled>
            主要按钮
          </el-button>
          <el-button type="success" plain disabled>
            成功按钮
          </el-button>
          <el-button type="info" plain disabled>
            信息按钮
          </el-button>
          <el-button type="warning" plain disabled>
            警告按钮
          </el-button>
          <el-button type="danger" plain disabled>
            危险按钮
          </el-button>
        </el-row>
      </div>
    );
  },
});
withDisable.args = {};
withDisable.storyName = "禁用状态";

export const withText = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-button type="text">文字按钮</el-button>
        <el-button type="text" disabled>
          文字按钮
        </el-button>
      </div>
    );
  },
});
withText.args = {};
withText.storyName = "文字按钮";

export const withIcon = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
        <el-button type="primary" icon="el-icon-search">
          搜索
        </el-button>
        <el-button type="primary">
          上传<i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    );
  },
});
withIcon.args = {};
withIcon.storyName = "图标按钮";
withIcon.description =
  "带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。";

export const withGroup = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left">
            上一页
          </el-button>
          <el-button type="primary">
            下一页<i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>
      </div>
    );
  },
});
withGroup.args = {};
withGroup.storyName = "按钮组";
withGroup.description = "以按钮组的方式出现，常用于多项类似操作。";

export const withLoading = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<el-button type="primary" :loading="true">加载中</el-button>`,
});
withLoading.args = {};
withLoading.storyName = "加载中";
withLoading.description = "点击按钮后进行数据加载操作，在按钮上显示加载状态。";

export const withSize = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div class="element-ui-button-basic">
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button size="medium">中等按钮</el-button>
          <el-button size="small">小型按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
        </el-row>
        <el-row>
          <el-button round>默认按钮</el-button>
          <el-button size="medium" round>
            中等按钮
          </el-button>
          <el-button size="small" round>
            小型按钮
          </el-button>
          <el-button size="mini" round>
            超小按钮
          </el-button>
        </el-row>
      </div>
    );
  },
});
withSize.args = {};
withSize.storyName = "不同尺寸";
withSize.description = "Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。";
