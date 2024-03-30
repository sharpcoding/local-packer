import { ExecutesWithRuntimeContext } from "../../types";
import { getPackageJsonPath } from "./get-package-json-path";

interface Args extends ExecutesWithRuntimeContext {
  packageName: string;
  packageJson: Record<string, any>;
}

export const writePackageJson = async ({
  context,
  packageJson,
  packageName,
}: Args) => {
  const path = getPackageJsonPath({ context, packageName });
  if (!(await Bun.file(path).exists())) {
    throw new Error(`package.json not found at ${path}`);
  }
  await Bun.write(path, JSON.stringify(packageJson, null, 2));
};
