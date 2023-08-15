import { Plugin, Notice, Editor, requestUrl } from "obsidian";

const insertName = (editor: Editor, name: string) => {
  const cursor = editor.getCursor();
  editor.replaceRange(name, cursor);
  editor.setCursor(cursor.line, cursor.ch + name.length);
};

const API_URL = "https://fantasyname.lukewh.com?family=t";

enum ANCESTRY {
  HUMAN = "h",
  DWARF = "d",
  ELF = "e",
  ORC = "o",
}

enum GENDER {
  MALE = "m",
  FEMALE = "f",
  ANY = "a",
}

type Event = {
  _time: string;
  path: string;
  headers: Record<string, string>;
  referrer: string;
  gender?: string;
  ancestry?: string;
  family?: boolean;
  name?: string;
};

type Family = boolean;

const editorCallback = async (editor: Editor, {gender, ancestry, family}: {gender?: GENDER, ancestry?: ANCESTRY, family?: Family}) => {
  let url = API_URL;
  const params = [];

  if (gender) {
    params.push(`gender=${gender}`);
  }

  if (ancestry) {
    params.push(`ancestry=${ancestry}`);
  }

  if (params.length) {
    url = `${url}&${params.join("&")}`;
  }

  const resp = await requestUrl(url);
  const name = resp.text;
  new Notice(`Name: ${name}`);
    insertName(editor, name); 
}

export default class FantasyNameGenerator extends Plugin {
  async onload() {
    console.log("loading fantasy-name plugin");

    const commands = [
      {
      id: "fantasy-name-insert-human",
      name: "Insert fantasy name: Human",
      editorCallback: (editor: Editor) => editorCallback(editor, {}),
      },
      {
        id: "fantasy-name-insert-human-female",
        name: "Insert fantasy name: Human - Female",
        editorCallback:  (editor: Editor) => editorCallback(editor, {gender: GENDER.FEMALE})
      },
      {
        id: "fantasy-name-insert-human-male",
        name: "Insert fantasy name: Human - Male",
        editorCallback: (editor: Editor) => editorCallback(editor, {gender: GENDER.MALE})
      },
      {
        id: "fantasy-name-insert-elf",
        name: "Insert fantasy name: Elf",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ELF}),
      },
      {
        id: "fantasy-name-insert-elf-female",
        name: "Insert fantasy name: Elf - Female",
        editorCallback:  (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ELF, gender: GENDER.FEMALE})
      },
      {
        id: "fantasy-name-insert-elf-male",
        name: "Insert fantasy name: Elf - Male",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ELF, gender: GENDER.MALE})
      },
      {
        id: "fantasy-name-insert-dwarf",
        name: "Insert fantasy name: Dwarf",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.DWARF}),
      },
      {
        id: "fantasy-name-insert-dwarf-female",
        name: "Insert fantasy name: Dwarf - Female",
        editorCallback:  (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.DWARF, gender: GENDER.FEMALE})
      },
      {
        id: "fantasy-name-insert-dwarf-male",
        name: "Insert fantasy name: Dwarf - Male",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.DWARF, gender: GENDER.MALE})
      },
      {
        id: "fantasy-name-insert-orc",
        name: "Insert fantasy name: Orc",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ORC}),
      },
      {
        id: "fantasy-name-insert-orc-female",
        name: "Insert fantasy name: Orc - Female",
        editorCallback:  (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ORC, gender: GENDER.FEMALE})
      },
      {
        id: "fantasy-name-insert-orc-male",
        name: "Insert fantasy name: Orc - Male",
        editorCallback: (editor: Editor) => editorCallback(editor, {ancestry: ANCESTRY.ORC, gender: GENDER.MALE})
      }
    ];

    for (const command of commands) {
      this.addCommand(command);
    }
  }

  onunload() {
    console.log("unloading fantasy-name plugin");
  }
}
