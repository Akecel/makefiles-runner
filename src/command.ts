import { workspace } from "vscode";
import { Argument } from "./provider";
import { ensureTerminalExists, selectTerminal } from "./terminal";

export const runMakeCommand = () => async (argument: Argument) => {
  if(workspace.workspaceFolders) {
    sendTextsToTerminal([
      `cd ${workspace.workspaceFolders[0].uri.fsPath}/`,
      `make ${argument}`
    ]);
  }
};

const sendTextToTerminal = async (text: string) => {
  if (ensureTerminalExists()) {
    const terminal = await selectTerminal();

    if (terminal) {
      terminal.sendText(text);
    }
  }
};

const sendTextsToTerminal = async (texts: string[]) => {
  for (let i = 0; i < texts.length; i++) {
    sendTextToTerminal(texts[i]);
  }
};
