// import BaseDialog from "../../molecules/BaseDialog";
import DataForm from "../DataForm";
import { Dialog } from "element-ui";
import "./style.scss";
export default {
  name: "DataFormDialog",
  componentName: "DataFormDialog",
  components: {
    // BaseDialog,
    DataForm,
  },
  inheritAttrs: false,
  props: {
    ...Dialog.props,
    form: {
      type: Object,
      default: () => {
        return {
          forms: [],
          data: {},
          layout: {
            use: "inline",
            gutter: 20,
            direction: "column",
          },
        };
      },
    },
    mode: String,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.form.forms = this.form.forms.map((item) => {
          return {
            ...item,
            disabled: item[this.mode],
          };
        });
      }
    },
  },
  methods: {
    cancel() {
      this.$refs.dataForm.refs().resetFields();
      this.$emit("update:visible", false);
    },
    submit() {
      this.$emit("submit", {
        ref: this.$refs.dataForm.refs(),
        validate: this.$refs.dataForm.refs().validate,
        data: this.$refs.dataForm.currentData(),
        mode: this.mode,
      });
    },
  },
  render() {
    console.log(Dialog);
    return (
      <Dialog
        ref="dialog"
        {...{
          props: this.$props,
          on: {
            closed: (val) => this.$emit("update:visible", val),
            "update:visible": (val) => this.$emit("update:visible", val),
          },
        }}
      >
        <DataForm
          ref="dataForm"
          {...{
            props: this.form,
            attrs: this.form,
          }}
        />
        <div ref="footer">
          {this.$scopedSlots.footer ? (
            this.$scopedSlots.footer(
              this.cancel.bind(this),
              this.submit.bind(this)
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {this.$scopedSlots.cancel ? (
                this.$scopedSlots.cancel()
              ) : (
                <ElButton onClick={() => this.cancel()}>取消</ElButton>
              )}
              {this.$scopedSlots.submit ? (
                this.$scopedSlots.submit()
              ) : (
                <ElButton type="primary" onClick={() => this.submit()}>
                  确定
                </ElButton>
              )}
            </div>
          )}
        </div>
      </Dialog>
    );
  },
};
