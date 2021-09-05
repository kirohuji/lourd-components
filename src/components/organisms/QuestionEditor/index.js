import "./index.scss";
import BaseMonacoEditor from "../../molecules/BaseMonacoEditor";
import QuestionPreview from "../QuestionPreview";
export default {
  props: ["config"],
  data() {
    return {
      text: "",
      textList: [],
      preview: "",
    };
  },
  render() {
    return (
      <div class="question-editor">
        <ElAlert
          title="注：1、第一行为题目，如【单选题】【多选题】【判断题】【评分题】【问答题】【填空题】 2、第二行起为选项 3、不同题之间空一行"
          type="warning"
          show-icon
          closable={false}
          style="margin: 8px 12px"
        ></ElAlert>
        <div class="question-layout">
          <div class="question-layout-left">
            <div>文本编辑</div>
            <div>
              <BaseMonacoEditor ref="editor" />
            </div>
          </div>
          <div class="question-layout-right">
            <div>题目预览</div>
            <div class="question-layout-border">
              <QuestionPreview value={this.preview} config={this.config} />
            </div>
          </div>
        </div>
        <ElButton
          size="small"
          type="primary"
          onClick={() => {
            this.preview = this.$refs.editor.getRef()._getValue();
          }}
        >
          预览
        </ElButton>
      </div>
    );
  },
};
