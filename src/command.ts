import { workspace } from "vscode";
import { Config } from "./configuration";
import { Argument } from "./provider";
import { ensureTerminalExists, selectTerminal } from "./terminal";

export const getFilePath = (path: string, workspaceRootPath: string) =>
  path.split(workspaceRootPath + "/")[1];

export const runMakeCommand = (config: Config) => async (
  argument: Argument
) => {
  sendTextsToTerminal([
    `cd ${workspace.rootPath}/${config.makefilePath}`,
    `make ${argument}`
  ]);
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
