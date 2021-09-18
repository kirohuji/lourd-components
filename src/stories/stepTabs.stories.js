import StepTabs from "../components/organisms/StepTabs/index.vue";
export default {
  id: "StepTabs",
  storyById: "StepTabs",
  title: "Design System/Organisms/StepTabs",
  components: StepTabs,
};
const data = [
  { title: "问卷说明", label: "information" },
  { title: "设置问题", label: "requests" },
  { title: "配置选项", label: "options" },
];
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div>
        <StepTabs
          ref="stepTabs"
          steps={data}
          {...{
            scopedSlots: {
              information: () => (
                <div>
                  information{" "}
                  <el-button style="margin-top: 12px;">放弃新增</el-button>
                  <el-button
                    style="margin-top: 12px;"
                    type="primary"
                    onClick={() => this.$refs.stepTabs.next()}
                  >
                    保存，并进入下一步
                  </el-button>
                </div>
              ),
              requests: () => (
                <div>
                  requests{" "}
                  <el-button
                    style="margin-top: 12px;"
                    onClick={() => this.$refs.stepTabs.prev()}
                  >
                    上一步
                  </el-button>
                  <el-button
                    style="margin-top: 12px;"
                    type="primary"
                    onClick={() => this.$refs.stepTabs.next()}
                  >
                    保存，并进入下一步
                  </el-button>
                </div>
              ),
              options: () => (
                <div>
                  options{" "}
                  <el-button
                    style="margin-top: 12px;"
                    onClick={() => this.$refs.stepTabs.prev()}
                  >
                    上一步
                  </el-button>
                  <el-button style="margin-top: 12px;">保存</el-button>
                  <el-button
                    style="margin-top: 12px;"
                    type="primary"
                    onClick={() => this.$refs.stepTabs.next()}
                  >
                    发布
                  </el-button>
                </div>
              ),
            },
          }}
        ></StepTabs>
      </div>
    );
  },
});
export const withBasic = Template.bind({});
withBasic.storyById = "withBasic";
