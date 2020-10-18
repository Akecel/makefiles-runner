import { workspace } from "vscode";

export type Config = {
  makefilePath: string;
  makefileName: string;
  filePathEnv: string;
};

export const CONFIGURATION_NAME = 'makefileCommandRunner';

const getConfig = (): Config => {
  const config = workspace.getConfiguration(CONFIGURATION_NAME);

  return {
    makefilePath: config.makefilePath,
    makefileName: config.makefileName,
    filePathEnv: config.filePathEnv
  };
};

export default getConfig;
