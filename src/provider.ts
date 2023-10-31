import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, workspace } from "vscode";
import extractCommands from "./parser";

export default class TaskTreeDataProvider implements TreeDataProvider<TreeItem> {

  getTreeItem(item: TreeItem): TreeItem {
    return item;
  }

  async getChildren(): Promise<TreeItem[]> {
    const children: TreeItem[] = [];

    if(workspace.workspaceFolders) {
      var filePath = `${workspace.workspaceFolders[0].uri.fsPath}/Makefile`;
      var commands = await extractCommands(filePath);

      if (commands.length !== 0) {
        for (let y = 0; y < commands.length; y++) {
          children.push(new MakefileCommand(commands[y]));
        }
      }
    }

    return children;

  }
}

type Label = string;
export type Argument = Label;
export type FolderName = string;

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
