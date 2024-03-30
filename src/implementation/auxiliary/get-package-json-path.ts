import { ExecutesWithRuntimeContext } from "../../types";
const path = require("path");

interface Args extends ExecutesWithRuntimeContext {
  packageName: string;
}

export const getPackageJsonPath = ({ context, packageName }: Args) => {
  const result = [context.packages[packageName].fullPath, "package.json"].join(
    path.sep
  );
  return result;
};
