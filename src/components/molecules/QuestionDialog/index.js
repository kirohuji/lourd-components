import { Button } from "element-ui";
import BaseDialog from "../BaseDialog";
import QuestionTabs from "../../template/Questionnaire/components/QuestionTabs";
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    getRefs() {
      return this.$refs.dialog;
    },
    open() {
      this.getRefs().open();
    },
  },
  render() {
    return (
      <BaseDialog
        ref="dialog"
        custom-class="data-dialog"
        scopedSlots={{
          title: () => (
            <div style="position: relative;">
              <div class="title">配置事件</div>
            </div>
          ),
        }}
      >
        <QuestionTabs />
        <div style="display: flex;justify-content: center; ">
          <Button size="small" onClick={() => this.$refs.dialog.close()}>
            取消
          </Button>
          <Button type="primary" size="small">
            保存
          </Button>
        </div>
      </BaseDialog>
    );
  },
};
