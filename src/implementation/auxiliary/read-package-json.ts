import { terminal } from "terminal-kit";

import { ExecutesWithRuntimeContext, PackageJson } from "../../types";
import { getPackageJsonPath } from "./get-package-json-path";

interface Args extends ExecutesWithRuntimeContext {
  packageName: string;
}

export const readPackageJson = async ({
  context,
  packageName,
}: Args): Promise<PackageJson | undefined> => {
  const path = getPackageJsonPath({ context, packageName });
  if (!(await Bun.file(path).exists())) {
    terminal.red(`${packageName}: package.json not found at ${path}\n`);
    return undefined;
  }
  const result = await Bun.file(path).json();
  return result;
};
