import { Plugin, Notice, Editor, requestUrl } from "obsidian";

const insertName = (editor: Editor, name: string) => {
  const cursor = editor.getCursor();
  editor.replaceRange(name, cursor);
  editor.setCursor(cursor.line, cursor.ch + name.length);
};

const API_URL = "https://fantasyname.lukewh.com?family=t";

export default class GMEmulator extends Plugin {
  async onload() {
    console.log("loading plugin");
    this.addCommand({
      id: "fantasy-name-insert",
      name: "Insert fantasy name",
      editorCallback: async (editor: Editor) => {
        const resp = await requestUrl(API_URL);
        const name = resp.text;
        new Notice(`Name: ${name}`);
        insertName(editor, name);
      },
    });

    this.addCommand({
      id: "fantasy-name-insert-female",
      name: "Insert fantasy name (Female)",
      editorCallback: async (editor: Editor) => {
        const resp = await requestUrl(`${API_URL}&gender=f`);
        const name = resp.text;
        new Notice(`Name: ${name}`);
        insertName(editor, name);
      },
    });

    this.addCommand({
      id: "fantasy-name-insert-male",
      name: "Insert fantasy name (Male)",
      editorCallback: async (editor: Editor) => {
        const resp = await requestUrl(`${API_URL}&gender=m`);
        const name = resp.text;
        new Notice(`Name: ${name}`);
        insertName(editor, name);
      },
    });
  }

  onunload() {
    console.log("unloading plugin");
  }
}
