import * as vscode from "vscode";

export const ensureTerminalExists = (): boolean => {
  if (vscode.window.terminals.length === 0) {
    createNewTerminal();
  }

  return true;
};

export const createNewTerminal = (): any => {
  let terminal = vscode.window.createTerminal(`Makefile Runners`);
  terminal.show();
};

export const selectTerminal = async (): Promise< vscode.Terminal | undefined > => {
  const terminals = vscode.window.terminals;

  if (terminals.length === 1) {
    return terminals[0];
  }

  const items = vscode.window.terminals.map((terminal, index) => ({
    label: `${index + 1}: ${terminal.name}`,
    terminal: terminal
  }));
  const item = await vscode.window.showQuickPick(items);

  return item ? item.terminal : undefined;
};
