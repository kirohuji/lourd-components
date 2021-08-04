export default {
  data() {
    return {
      multipleSelectionAll: [],
      multipleSelection: [],
    };
  },
  watch: {
    selectData: {
      handler(val) {
        if (val) {
          this.multipleSelectionAll = val;
        }
      },
    },
    data: {
      handler() {
        this.setSelectRow();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    changePageCoreRecordData() {
      const idKey = this.idKey;
      const that = this;
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      const selectIds = [];
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          // debugger;
          that.multipleSelectionAll.push(row);
        }
      });
      const noSelectIds = [];
      this.data.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
      this.setSelectRow();
      return that.multipleSelectionAll;
    },
    getAllSelectionData() {
      this.changePageCoreRecordData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      const idKey = this.idKey;
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      this.$nextTick(() => {
        this.$refs.table.clearSelection();
        for (var i = 0; i < this.data.length; i++) {
          if (selectAllIds.indexOf(this.data[i][idKey]) >= 0) {
            this.$refs.table.toggleRowSelection(this.data[i], true);
          }
        }
      });
    },
    handleSizeChange() {
      this.changePageCoreRecordData();
    },
    handleCurrentChange() {
      this.changePageCoreRecordData();
    },
  },
};
