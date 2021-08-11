import { Dialog } from "element-ui";
import emitter from "element-ui/src/mixins/emitter";
export default {
  componentName: "baseDialog",
  name: 'BaseDialog',
  mixins: [emitter],
  data: () => ({
    visible: false,
    loading: false,
    loadingInstance: undefined,
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
      this.loading = true;
    },
    close() {
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
          header: (props) => this.$scopedSlots?.header(props),
          footer: (props) => this.$scopedSlots?.footer(props),
        }}
      >
        <div
          class="dialog-content"
          style={{
            minHeight: "50px",
          }}
          v-loading={this.loading}
        >
          {this.$scopedSlots.default && this.$scopedSlots.default()}
        </div>
      </Dialog>
    );
  },
};
