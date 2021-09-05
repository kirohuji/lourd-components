export const informationConfig = [
  {
    prop: "c_id",
    label: "问卷分类",
    use: "radio-group",
    children: {
      use: "radio",
      options: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
    },
  },
  {
    prop: "name",
    label: "问卷名",
    use: "input",
    maxlength: 20,
    size: "small",
    "show-word-limit": true,
  },
  {
    prop: "remark",
    label: "问卷说明",
    use: "input",
    type: "textarea",
    maxlength: 20,
    size: "small",
    "show-word-limit": true,
  },
  {
    prop: "tag_arr",
    label: "问卷标签",
    use: "input",
    size: "small",
  },
];
