<template>
  <div>
    <Grandson />
    <p>-----子节点------</p>
  </div>
</template>

<script>
import Grandson from "./Grandson.vue";
export default {
  componentName: "Children",
  components: {
    Grandson,
  },
  mounted() {
    this.$on("click", (payload) => {
      alert(payload);
    });
  },
};
</script>
