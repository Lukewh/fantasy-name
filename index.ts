import { Plugin, Notice, Editor } from "obsidian";

const insertName = (editor: Editor, name: string) => {
  const cursor = editor.getCursor();
  editor.replaceRange(name, cursor);
  editor.setCursor(cursor.line, cursor.ch + name.length);
};

export default class GMEmulator extends Plugin {
  async onload() {
    console.log("loading plugin");
    this.addCommand({
      id: "fantasy-name-insert",
      name: "Insert fantasy name",
      editorCallback: async (editor: Editor) => {
        const resp = await fetch("https://fantasyname.lukewh.com?family=t");
        const name = await resp.text();
        new Notice(`Answer: ${name}`);
        insertName(editor, name);
      },
    });

    this.addCommand({
      id: "fantasy-name-insert-female",
      name: "Insert fantasy name (Female)",
      editorCallback: async (editor: Editor) => {
        const resp = await fetch(
          "https://fantasyname.lukewh.com?gender=f&family=t"
        );
        const name = await resp.text();
        new Notice(`Answer: ${name}`);
        insertName(editor, name);
      },
    });

    this.addCommand({
      id: "fantasy-name-insert-male",
      name: "Insert fantasy name (Male)",
      editorCallback: async (editor: Editor) => {
        const resp = await fetch(
          "https://fantasyname.lukewh.com?gender=m&family=t"
        );
        const name = await resp.text();
        new Notice(`Answer: ${name}`);
        insertName(editor, name);
      },
    });
  }

  onunload() {
    console.log("unloading plugin");
  }
}
