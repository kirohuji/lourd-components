import Button from "@/components/Button.vue";
export default {
  component: Button,
  title: "Element UI/组件/Basic/Button 按钮",
  decorators: [
    () => ({ template: '<div style="margin: 3em;"><story/></div>' }),
  ],
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  render() {
    return (
      <div>
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
