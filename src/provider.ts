import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, workspace } from "vscode";
import extractCommands from "./parser";

export default class TaskTreeDataProvider implements TreeDataProvider<TreeItem> {

  getTreeItem(item: TreeItem): TreeItem {
    return item;
  }

  async getChildren(): Promise<TreeItem[]> {
    const children: TreeItem[] = [];

    if (workspace.rootPath) {
      const filePath = `${workspace.rootPath}/Makefile`;
      const commands = await extractCommands(filePath);

      if (commands.length !== 0) {
        for (let i = 0; i < commands.length; i++) {
          children.push(new MakefileCommand(commands[i]));
        }
      }
    }

    return children;
  }
}

type Label = string;
export type Argument = Label;

class MakefileCommand extends TreeItem {
  constructor(label: Label) {
    super(label, TreeItemCollapsibleState.None);

    this.command = {
      command: "extension.runMakeCommand",
      title: "Run Makefile Command",
      arguments: [label]
    };
  }
}
