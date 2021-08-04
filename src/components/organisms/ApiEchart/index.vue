<template>
  <div style="height: 500px">
    <div style="height: 100%; width: 100%; position: relative">
      <slot name="top" />
      <div
        style="
          height: calc(100% - 0.333333rem);
          width: 100%;
          position: relative;
        "
        v-loading="isLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <BaseEchart
          :template="template"
          :options="options"
          v-if="hasData && !isLoading"
          :isUpdate="isUpdate"
          @update="() => (isUpdate = false)"
        />
        <HWNoContent
          :img-url="require('@/assets/nodata.png')"
          bottom-words="暂无数据"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseEchart from "@/components/molecules/BaseEchart";
import HWNoContent from "@/atoms/components/NoContentShow";
export default {
  props: ["options", "template", "isLoading"],
  components: {
    BaseEchart,
    HWNoContent,
  },
  computed: {
    hasData() {
      return Object.keys(this.options).length > 0 || this.template;
    },
  },
  watch: {
    template() {
      this.isUpdate = true;
    },
    isLoading: {
      handler(val) {
        this.isUpdate = false;
        if (!val) {
          this.isUpdate = true;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isUpdate: false,
    };
  },
};
</script>
