import { commands, ExtensionContext, window, workspace } from "vscode";
import { runMakeCommand } from "./command";
import getConfig, { CONFIGURATION_NAME } from "./configuration";
import TaskTreeDataProvider from "./provider";

export const activate = (context: ExtensionContext) => {
  const config = getConfig();
  const provider = new TaskTreeDataProvider(config);

  context.subscriptions.push(
    commands.registerCommand(
      "extension.runMakeCommand",
      runMakeCommand(config)
    ),
    window.registerTreeDataProvider("makefiles-runner", provider),
    workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(CONFIGURATION_NAME)) {
        commands.executeCommand("workbench.action.reloadWindow");
      }
    })
  );
};

export const deactivate = () => {};
