import { Thenable } from "../../plugins/thenable";
export default {
  name: "Thenable",
  props: [
    "vm",
    "runner",
    "variables",
    "callback",
    "immediate",
    "data",
    "target",
    "cache",
  ],
  data() {
    return {
      result: new Thenable(this.$props),
    };
  },
  render() {
    return this.$scopedSlots.default({
      result: this.result?.result,
    });
  },
};
