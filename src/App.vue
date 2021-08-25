<template>
  <div>
    <EditTable ref="editTable" :config="config" />
  </div>
</template>

<script>
import EditTable from "@/components/template/EditTable";
// import Thenable from "@/components/atoms/Thenable";
import config from "./config";
// const runner = (val) =>
//   new Promise((resolve) => {
//     console.log("开始请求拉");
//     setTimeout(() => {
//       console.log("请求结束");
//       resolve({
//         data: {
//           data: val,
//         },
//       });
//     }, 3000);
//   });
// const DemoThenable = {
//   name: "DemoThenable",
//   data() {
//     return {
//       target: {},
//     };
//   },
//   render() {
//     return (
//       <div>
//         <Thenable
//           {...{
//             props: {
//               runner: [runner, { str: "success" }, (data) => data],
//             },
//             scopedSlots: {
//               default: ({ result: { loading, data } }) => (
//                 <div>
//                   {loading ? <div>加载中</div> : <div>{data.data.str}</div>}
//                 </div>
//               ),
//             },
//           }}
//         />
//       </div>
//     );
//   },
// };
export default {
  provide() {
    return {
      page: this,
    };
  },
  components: {
    EditTable,
  },
  data() {
    return {
      config,
    };
  },
  computed: {
    type() {
      return this.$store.getters.selectedTab;
    },
  },
  // mounted() {
  //   console.log("1", this.$refs.editTable.refresh());
  // },
};
</script>
