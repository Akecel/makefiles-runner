import { workspace } from "vscode";

type Content = string[];
type CommandObject = { command: string; comment: string };
type Commands = CommandObject[];

const extractCommands = (filePath: string): Promise<Commands> =>
  getFileContent(filePath).then(buildCommands);

export default extractCommands;

const getFileContent = async (filePath: string): Promise<Content> => {
  let document;

  try {
    document = await workspace.openTextDocument(filePath);
  } catch (e) {
    throw new Error(
      "Makefile cannot be read. Check that your makefile is at the root of your project."
    );
  }

  const content = document.getText().split("\n");

  return content;
};

const buildCommands = (content: Content): Commands => {
  const commands: Commands = [];
  const commandRegex = /^([a-zA-Z0-9_\-]+):(?:\s*##\s*(.*))?$/;

  for (let i = 0; i < content.length; i++) {
    const line = content[i].trim();

    const match = line.match(commandRegex);
    if (match) {
      const commandName = match[1];
      const comment = match[2] || ""; // Capture the comment if present, otherwise empty string.

      commands.push({
        command: commandName,
        comment: comment,
      });
    }
  }
  return commands;
};
