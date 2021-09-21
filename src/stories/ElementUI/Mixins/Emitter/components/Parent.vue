<template>
  <div class="parent">
    <Other>
      <Other><Children /></Other>
    </Other>
    <button @click="handleClick">呼叫孙子节点</button>
  </div>
</template>

<script>
import emitter from "element-ui/src/mixins/emitter";
import Children from "./Children.vue";
const Other = {
  componentName: "Other",
  render() {
    return (
      <div class="other">
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    );
  },
};
export default {
  componentName: "Parent",
  name: "Parent",
  components: {
    Other,
    Children,
  },
  mixins: [emitter],
  mounted() {
    this.$on("click", (payload) => {
      alert(payload);
    });
  },
  methods: {
    handleClick() {
      this.broadcast("Grandson", "click", "孙子节点收到");
    },
  },
};
</script>
