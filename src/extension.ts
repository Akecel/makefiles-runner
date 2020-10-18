import { commands, ExtensionContext, window, workspace } from "vscode";
import { runMakeCommand } from "./command";
import TaskTreeDataProvider from "./provider";

export const activate = (context: ExtensionContext) => {
  const provider = new TaskTreeDataProvider();

  context.subscriptions.push(
    commands.registerCommand(
      "extension.runMakeCommand",
      runMakeCommand()
    ),
    window.registerTreeDataProvider("makefiles-runner", provider),
  );
};

export const deactivate = () => {};
