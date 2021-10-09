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
  data() {
    return {
      dataFormKey: 0,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.form.forms = this.form.forms.map((item) => {
          return {
            ...item,
            disabled: !item[this.mode],
          };
        });
        this.dataFormKey++;
      }
    },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    formRef() {
      return this.$refs.dataForm.refs();
    },
    resetFields() {
      this.$refs.dataForm.refs().resetFields();
    },
    validate(cb) {
      return this.$refs.dataForm.refs().validate(cb);
    },
    clearValidate(prop) {
      return this.$refs.dataForm.refs().clearValidate(prop);
    },
    cancel() {
      this.$refs.dataForm.refs().resetFields();
      this.$emit("update:visible", false);
    },
    submit() {
      this.$emit("submit", {
        ref: this.$refs.dataForm.refs(),
        validate: this.$refs.dataForm.refs().validate,
        data: {
          ...this.form.data,
          ...this.$refs.dataForm.currentData(),
        },
        mode: this.mode,
      });
    },
  },
  render() {
    return (
      <Dialog
        ref="dialog"
        {...{
          props: this.$props,
          scopedSlots: {
            title: () => this.$scopedSlots.title && this.$scopedSlots.title(),
          },
          on: {
            closed: (val) => {
              this.cancel();
              this.$emit("update:visible", val);
            },
            "update:visible": (val) => this.$emit("update:visible", val),
          },
        }}
      >
        <DataForm
          ref="dataForm"
          key={this.dataFormKey}
          {...{
            props: this.form,
            attrs: this.form,
          }}
        />
        <div ref="footer">
          {this.$scopedSlots.footer ? (
            this.$scopedSlots.footer(
              this.cancel.bind(this),
              this.submit.bind(this),
              this.$refs.dataForm?.refs()
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
