import { Disposable, Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState, workspace, WorkspaceConfiguration } from "vscode";
import extractCommands from "./parser";

export default class TaskTreeDataProvider implements TreeDataProvider<TreeItem>, Disposable {
  private _onDidChangeTreeData: EventEmitter<TreeItem | undefined> = new EventEmitter<TreeItem | undefined>();
  readonly onDidChangeTreeData: Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

  private configChangeDisposable: Disposable;

  constructor() {
    // Listen for configuration changes and refresh the tree when they occur
    this.configChangeDisposable = workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration("makefilesRunner.sortAlphabetically") ||
        e.affectsConfiguration("makefilesRunner.displayDescriptionCommentsInPanel")
      ) {
        this.refresh();
      }
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(item: TreeItem): TreeItem {
    return item;
  }

  async getChildren(): Promise<TreeItem[]> {
    const children: TreeItem[] = [];
    const config = this.getConfiguration();

    if (workspace.workspaceFolders) {
      const filePath = `${workspace.workspaceFolders[0].uri.fsPath}/Makefile`;
      let commands = await extractCommands(filePath);

      if (config.sortAlphabetically) {
        commands = commands.sort((a, b) => a.command.localeCompare(b.command));
      }

      if (commands.length !== 0) {
        for (const cmd of commands) {
          children.push(new MakefileCommand(cmd.command, cmd.comment, config.displayDescriptionCommentsInPanel));
        }
      }
    }

    return children;
  }

  async makefileExists(): Promise<boolean> {
    if (workspace.workspaceFolders) {
      const filePath = `${workspace.workspaceFolders[0].uri.fsPath}/Makefile`;
      return await workspace.fs.stat(workspace.workspaceFolders[0].uri.with({ path: filePath })).then(
        () => true,
        () => false
      );
    }
    return false;
  }

  dispose(): void {
    // Clean up the configuration change listener
    this.configChangeDisposable.dispose();
  }

  private getConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("makefilesRunner");
  }
}

type CommandName = string;
type CommandComment = string;

class MakefileCommand extends TreeItem {
  constructor(commandName: CommandName, comment: CommandComment, displayDescription: boolean) {
    super(commandName, TreeItemCollapsibleState.None);

    this.description = displayDescription ? (comment || "") : ""; // Show comment as the description in the VSCode tree.
    this.tooltip = comment || `Run "${commandName}"`; // Tooltip provides additional details.

    this.command = {
      command: "extension.runMakeCommand",
      title: "Run Makefile Command",
      arguments: [commandName] // Pass only the command name to the execute command.
    };
  }
}
