import MonacoEditor from "../../MonacoEditor";
export default {
  data() {
    return {
      language: "markdown",
      height: "300px",
      width: "100%",
      options: {
        value: `1、【单选题】当前生存情况
      活动能力完全正常，与患病前活动能力无差异
      能自由走动和从事轻体力劳动
      能自由自动及生活自理，但工作丧失工作能力
      卧床不起，生活不能自理
      死亡`, // 初始值
        foldingStrategy: "indentation", // 代码可分小段折叠
        automaticLayout: true, // 自适应布局
        overviewRulerBorder: false, // 不要滚动条的边框
        autoClosingBrackets: true,
        tabSize: 2, // tab 缩进长度
        minimap: {
          enabled: false, // 不要小地图
        },
      },
      preview: "",
    };
  },
  methods: {
    getRef() {
      return this.$refs.editor;
    },
    onEditorMounted(editor, monaco) {
      window.editor = editor;
      window.monaco = monaco;
      window.monaco.languages.registerCompletionItemProvider("markdown", {
        provideCompletionItems() {
          return {
            suggestions: [
              {
                label: "单选题", // 显示的提示内容
                kind: window.monaco.languages.CompletionItemKind.Function, // 用来显示提示内容后的不同的图标
                insertTextRules:
                  window.monaco.languages.CompletionItemInsertTextRule
                    .InsertAsSnippet,
                insertText: "单选题", // 选择后粘贴到编辑器中的文字
                detail: "单选题", // 提示内容后的说明
              },
            ],
          };
        },
        triggerCharacters: ["$"], // 触发提示的字符，可以写多个
      });
    },
  },
  render() {
    return (
      <MonacoEditor
        ref="editor"
        {...{
          props: {
            ...this,
            editorMounted: this.onEditorMounted,
          },
        }}
      />
    );
  },
};
