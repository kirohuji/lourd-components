import { TabPane, Tabs } from "element-ui";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editableTabsValue: "1",
      tabIndex: this.data.length,
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.data.push({
          label: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.data;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.data = tabs.filter((tab) => tab.name !== targetName);
      }
    },
  },
  render() {
    return (
      <Tabs
        vModel={this.editableTabsValue}
        type="card"
        editable
        onEdit={(targetName, action) => this.handleTabsEdit(targetName, action)}
      >
        {this.data.map((item, index) => (
          <TabPane
            key={index}
            {...{
              props: item,
            }}
          />
        ))}
      </Tabs>
    );
  },
};
