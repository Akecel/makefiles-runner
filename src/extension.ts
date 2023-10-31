import { commands, ExtensionContext, StatusBarAlignment, StatusBarItem, window, workspace } from "vscode";
import { runMakeCommand } from "./command";
import TaskTreeDataProvider from "./provider";

let statusBarItem: StatusBarItem | undefined;
const provider = new TaskTreeDataProvider();

export const activate = async (context: ExtensionContext) => {

  context.subscriptions.push(
    commands.registerCommand("extension.runMakeCommand", runMakeCommand),
    window.registerTreeDataProvider("makefiles-runner", provider)
  );

  if (await provider.makefileExists()) {// Create a status bar item (custom title bar)
    statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 0);
    statusBarItem.text = "$(sync) Re-read Makefile";
    statusBarItem.command = "extension.refreshPanel";
    statusBarItem.show();

    context.subscriptions.push(
      commands.registerCommand("extension.refreshPanel", refreshPanel),
    );
    context.subscriptions.push(statusBarItem);
  }
};

export const refreshPanel = () => {
  provider.refresh();
};

export const deactivate = () => {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
};