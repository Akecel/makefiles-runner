import * as vs from "vscode";

export const ensureTerminalExists = (cmdName: string = 'Makefile Runner'): boolean => {
  if (vs.window.terminals.length === 0) {
    createNewTerminal(cmdName);
  }
  return true;
};

export const createNewTerminal = (cmdName: string): any => {
  let terminal = vs.window.createTerminal(cmdName);
  terminal.show();
  return terminal;
};

export const selectTerminal = async (cmdName: string): Promise<vs.Terminal | undefined> => {
  const terminals = vs.window.terminals;

  if (terminals.length === 1) {
    return terminals[0];
  }

  const items = [
    ...terminals.map((terminal, index) => ({
      label: `${index + 1}: ${terminal.name}`,
      terminal: terminal,
    })),
    {
      label: `${terminals.length + 1}: New Terminal`,
      terminal: undefined, // Placeholder for creating a new terminal
    },
  ];

  const item = await vs.window.showQuickPick(items);

  if (item) {
    if (item.terminal) {
      return item.terminal;
    } else {
      // Create and return a new terminal
      const newTerminal = createNewTerminal(cmdName);
      newTerminal.show();
      return newTerminal;
    }
  }

  return undefined;
};
