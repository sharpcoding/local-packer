import { terminal } from "terminal-kit";

export const terminalYesNo = async (question: string): Promise<boolean> => {
  terminal(`${question} (yes/no)?: `);
  const response = await terminal.yesOrNo().promise;
  terminal("\n");
  return !!response;
};
