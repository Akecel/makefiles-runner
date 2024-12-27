import { workspace, window, Terminal } from "vscode";
import { createNewTerminal, ensureTerminalExists, selectTerminal } from "./terminal";
import { ConfigService } from './configService';

export const runMakeCommand = () => async (argument: string) => {
  if (workspace.workspaceFolders) {
    sendTextsToTerminal(argument, [
      `cd ${workspace.workspaceFolders[0].uri.fsPath}/`,
      `make ${argument}`
    ]);
  }
};

const sendTextsToTerminal = async (argument: string, texts: string[]) => {
  var terminal = await determineTerminalToUse(argument);
  if (!terminal)
  {
    return;
  }
  texts.forEach(text => sendTextToTerminal(terminal!, text));
};

const sendTextToTerminal = async (terminal: Terminal, text: string) => {
  terminal?.sendText(text);
};

const determineTerminalToUse = async(argument: string): Promise<Terminal | undefined> => {
  const config = ConfigService.getInstance();
  let terminal: Terminal | undefined;

  if (config.reuseMatchingTerminal && window.terminals.length > 0) {
    // Find a terminal with a matching name and show it if found.
    terminal = window.terminals.find(t => t.name === argument);
    terminal?.show();
  } 
  
  if (!terminal) {
    if (config.alwaysCreateNewTerminal) {
      terminal = await createNewTerminal(argument);
    } 
    else if (ensureTerminalExists()) {
      terminal = await selectTerminal(argument) as Terminal;
    }
  }

  return terminal;
}

