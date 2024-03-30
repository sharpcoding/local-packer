import { terminal } from "terminal-kit";

import { ExecutesWithRuntimeContext } from "../../types";
import { getPackageJsonPath } from "./get-package-json-path";

interface Args extends ExecutesWithRuntimeContext {
  packageName: string;
}

export const readPackageJson = async ({ context, packageName }: Args) => {
  const path = getPackageJsonPath({ context, packageName });
  if (!(await Bun.file(path).exists())) {
    terminal(`${JSON.stringify({ context, packageName }, null, 2)}\n`);
    terminal.red(`package.json not found at ${path}\n`);
  }
  const result = await Bun.file(path).json();
  return result;
};
