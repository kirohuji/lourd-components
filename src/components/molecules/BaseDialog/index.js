import { Dialog } from "element-ui";
import emitter from "element-ui/src/mixins/emitter";
export default {
  componentName: "baseDialog",
  name: "BaseDialog",
  mixins: [emitter],
  data: () => ({
    visible: false,
  }),
  inheritAttrs: false,
  mounted() {
    this.$on("close", () => {
      this.visible = false;
    });
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.$emit("closed");
      this.visible = false;
    },
    handleClose(done) {
      this.visible = false;
      done();
    },
  },
  render() {
    return (
      <Dialog
        ref="dialog"
        // style="width: 530px"
        {...{
          props: this.$attrs,
          on: {
            "before-close": (done) => this.handleClose(done),
            close: () => this.close(),
            ...this.$listeners,
          },
        }}
        visible={this.visible}
        scopedSlots={{
          title: (props) => this.$scopedSlots?.title(props),
          footer: (props) => this.$scopedSlots?.footer(props),
        }}
      >
        <div
          class="dialog-content"
          style={{
            minHeight: "50px",
          }}
        >
          {this.$scopedSlots.default && this.$scopedSlots.default()}
        </div>
      </Dialog>
    );
  },
};
