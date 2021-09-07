import { Tabs, TabPane, Step, Steps } from "element-ui";
import "./index.scss";
const Layout = {
  render() {
    return (
      <div class="stepTabs">
        <div class="stepTabs-header">
          {this.$scopedSlots.header && this.$scopedSlots.header()}
        </div>
        <div class="stepTabs-body">
          {this.$scopedSlots.default && this.$scopedSlots.default()}
        </div>
        <div class="stepTabs-footer">
          {this.$scopedSlots.footer && this.$scopedSlots.footer()}
        </div>
      </div>
    );
  },
};
const StepTabs = {
  name: "StepTabs",
  componentName: "StepTabs",
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    space: Number,
  },
  data: () => ({
    active: 1,
  }),
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    next() {
      if (this.active++ > this.steps.length - 1) this.active = 1;
    },
    prev() {
      if (this.active-- < this.steps.length - 1) this.active = 1;
    },
  },
  computed: {
    activeName() {
      return String(this.active);
    },
  },
  render() {
    return (
      <Layout
        {...{
          scopedSlots: {
            footer: this.$scopedSlots.footer,
            header: () => (
              <Steps
                {...{
                  props: {
                    space: this.space,
                    active: this.active,
                    "finish-status": "success",
                    ...this.$props,
                  },
                }}
              >
                {this.steps.map((item) => (
                  <Step {...{ props: item }} />
                ))}
              </Steps>
            ),
          },
        }}
      >
        <Tabs
          {...{
            props: this.$props,
          }}
          class="tab-step"
          value={this.activeName}
          onTabClick={(tab, event) => this.handleClick(tab, event)}
        >
          {this.steps.map((item, index) => (
            <TabPane
              {...{
                props: {
                  name: String(index + 1),
                  label: item.title,
                },
              }}
            >
              {this.$scopedSlots[item.label]
                ? this.$scopedSlots[item.label]
                : item.label}
            </TabPane>
          ))}
        </Tabs>
      </Layout>
    );
  },
};
StepTabs.install = function (Vue) {
  Vue.component(StepTabs.name, StepTabs);
};
export default StepTabs;
