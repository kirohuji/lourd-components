import { Dialog, Button } from "element-ui";
import { action } from "@storybook/addon-actions";
// let vueDocs = require("vue-docgen-api");
// let componentInfo = {};
// vueDocs.parse("element-ui/packages").then((ci) => {
//   componentInfo = ci;
//   console.log(componentInfo);
// });

export default {
  component: Dialog,
  title: "Element UI/Dialog",
  argTypes: {
    visible: {
      description: "是否显示 Dialog，支持 .sync 修饰符",
      control: { type: "boolean" },
      type: { required: true },
    },
    title: {
      description: "Dialog 的标题，也可通过具名 slot （见下表）传入",
    },
    width: {
      description: "Dialog 的宽度",
    },
    top: {
      description: "Dialog CSS 中的 margin-top 值",
    },
    modal: {
      description: "是否需要遮罩层",
      control: { type: "boolean" },
    },
    "modal-append-to-body": {
      description:
        "遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上",
      control: { type: "boolean" },
    },
    "append-to-body": {
      description:
        "Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true",
      control: { type: "boolean" },
    },
    "lock-scroll": {
      description: "是否在 Dialog 出现时将 body 滚动锁定",
      control: { type: "boolean" },
    },
    "custom-class": {
      description: "Dialog 的自定义类名",
      control: { type: "text" },
    },
    "close-on-click-modal": {
      description: "是否可以通过点击 modal 关闭 Dialog",
      control: { type: "boolean" },
    },
    "close-on-press-escape": {
      description: "是否可以通过按下 ESC 关闭 Dialog",
      control: { type: "boolean" },
    },
    "show-close": {
      description: "是否显示关闭按钮",
      control: { type: "boolean" },
    },
    "before-close": {
      description: "关闭前的回调，会暂停 Dialog 的关闭",
      table: {
        type: {
          summary: "function",
          detail: "function(done)，done 用于关闭 Dialog",
        },
        defaultValue: (done) => {
          done();
        },
      },
    },
    center: {
      description: "是否对头部和底部采用居中布局",
      control: { type: "boolean" },
    },
    "destroy-on-close": {
      control: { type: "boolean" },
      description: "关闭时销毁 Dialog 中的元素",
    },
  },
};
const events = ["open", "opened", "close", "closed", "update:visible"];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    innerVisible: false,
  }),
  watch: {
    visible(val) {
      this.innerVisible = val;
    },
  },
  render() {
    let handler = {};
    events.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <Dialog
        {...{
          props: {
            ...this.$props,
            visible: this.innerVisible,
          },
          on: {
            ...handler,
            "update:visible": (val) => {
              action("update:visible")(val);
              this.innerVisible = !this.innerVisible;
            },
          },
        }}
      />
    );
  },
});
export const withBasic = Template.bind({});
withBasic.args = {
  visible: false,
  title: "Hello World",
  width: "50%",
  fullscreen: false,
  top: "15vh",
  modal: true,
  "show-close": true,
  "before-close": (done) => {
    done();
  },
};

export const withExampleOne = () => ({
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        // eslint-disable-next-line no-unused-vars
        .then((_) => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {});
    },
  },
  render() {
    let handler = {};
    events.forEach((item) => (handler[item] = (...args) => action(item)(args)));
    return (
      <div>
        <Button type="text" onClick={() => (this.dialogVisible = true)}>
          点击打开 Dialog
        </Button>
        <Dialog
          visible={this.dialogVisible}
          width="30%"
          before-close={this.handleClose}
          {...{
            on: {
              ...handler,
              "update:visible": () => (this.dialogVisible = false),
            },
            scopeSlots: {
              footer: () => (
                <span class="dialog-footer">
                  <Button onClick={() => (this.dialogVisible = false)}>
                    确定
                  </Button>
                </span>
              ),
            },
          }}
        >
          <span>这是一段信息</span>
        </Dialog>
      </div>
    );
  },
});
withExampleOne.storyName = "基本用法";
// withExampleOne.args = {
//   visible: false,
//   title: "Hello World",
//   width: "50%",
//   fullscreen: false,
//   top: "15vh",
//   modal: true,
//   "show-close": true,
//   "before-close": (done) => {
//     done();
//   },
// };
