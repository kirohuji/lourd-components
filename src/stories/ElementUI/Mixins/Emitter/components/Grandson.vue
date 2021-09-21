<template>
  <button @click="handleClick">呼叫祖父节点</button>
</template>

<script>
import emitter from "element-ui/src/mixins/emitter";
export default {
  mixins: [emitter],
  componentName: "Grandson",
  methods: {
    handleClick() {
      this.dispatch("Parent", "click", "祖父节点收到");
    },
  },
  mounted() {
    this.$on("click", (payload) => {
      alert(payload);
    });
  },
};
</script>
