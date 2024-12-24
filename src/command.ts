import { workspace, Terminal } from "vscode";
import { createNewTerminal, ensureTerminalExists, selectTerminal } from "./terminal";
import { configService } from './configService';

export const runMakeCommand = () => async (argument: string) => {
  if (workspace.workspaceFolders) {
    sendTextsToTerminal(argument, [
      `cd ${workspace.workspaceFolders[0].uri.fsPath}/`,
      `make ${argument}`
    ]);
  }
};

const sendTextsToTerminal = async (argument: string, texts: string[]) => {
  const config = configService.getInstance();
  let terminal: Terminal | undefined;

  if (config.alwaysCreateNewTerminal) {
    terminal = await createNewTerminal(argument);
  } else if (ensureTerminalExists()) {
    terminal = await selectTerminal(argument) as Terminal;
    if (!terminal) return; // Selection was canceled
  } else {
    return; // No terminal exists and new one is not configured to be created
  }

  texts.forEach(text => sendTextToTerminal(terminal!, text));
};

const sendTextToTerminal = async (terminal: Terminal, text: string) => {
    if (terminal) {
      terminal.sendText(text);
    }
};
