<template>
  <div>
    <StepTabs ref="stepTabs" :steps="steps">
      <template v-slot:information>
        <DataForm
          :forms="informationConfig"
          :layout="{
            use: 'inline',
            gutter: '20',
            direction: 'column',
          }"
        />
        <div>
          <ElButton style="margin-top: 12px" @click="giveUp">放弃新增</ElButton>
          <ElButton type="primary" @click="() => $refs.stepTabs.next()">
            保存，并进入下一步
          </ElButton>
        </div>
      </template>
      <template v-slot:requests>
        <QuestionEditor ref="editor" />
        <ElButton style="margin-top: 12px" @click="() => $refs.stepTabs.prev()"
          >上一步</ElButton
        >
        <ElButton type="primary" @click="() => $refs.stepTabs.next()">
          保存，并进入下一步
        </ElButton>
      </template>
      <template v-slot:options>
        <div>
          <p>糖尿病患者随访调查表</p>
          <p>
            请您根据实际情况填写，您的信息我们会保证做到保密不泄露，这些信息会用于医生为你提供治疗方案
          </p>
          <QuestionPreview :value="$refs.editor.preview" />
        </div>
        <ElButton style="margin-top: 12px" @click="() => $refs.stepTabs.prev()"
          >上一步</ElButton
        >
        <ElButton style="margin-top: 12px">保存</ElButton>
        <ElButton type="primary" @click="() => $refs.stepTabs.next()">
          发布
        </ElButton>
      </template>
    </StepTabs>
  </div>
</template>

<script>
import DataForm from "../../organisms/DataForm";
import StepTabs from "../../organisms/StepTabs";
import { informationConfig } from "./config";
import QuestionEditor from "../../organisms/QuestionEditor";
import QuestionPreview from "../../organisms/QuestionPreview";
import "./index.scss";
export default {
  components: {
    StepTabs,
    DataForm,
    QuestionEditor,
    QuestionPreview,
  },
  data() {
    return {
      informationConfig: informationConfig,
      steps: [
        { title: "问卷说明", label: "information" },
        { title: "设置问题", label: "requests" },
        { title: "配置选项", label: "options" },
      ],
    };
  },
  methods: {
    giveUp() {
      this.$confirm("是否确定放弃新增问卷?", "放弃新建", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style></style>
