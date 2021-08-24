<template>
  <el-input v-bind="$attrs" v-on="$listeners">
    <el-button
      slot="append"
      type="primary"
      @click="() => dispatch('DataSearchForm', 'search')"
      >搜索</el-button
    >
  </el-input>
</template>

<script>
import emitter from "element-ui/src/mixins/emitter";
export default {
  mixins: [emitter],
};
</script>

<style scoped lang="scss">
// @import '~@/styles/variables.scss';
::v-deep .el-input-group__append {
  background: #46a6ff;
  border-color: #46a6ff;
  color: #ffffff;
}
// .search-button {
//   color: $menuActiveText
// }
</style>
