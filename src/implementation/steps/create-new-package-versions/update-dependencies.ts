const path = require("path");

import { terminal } from "terminal-kit";
import {
  ExecutesWithRuntimeContext,
  RuntimeContext,
  ExecutesWithProject,
} from "../../../types";
import { getPackageJsonPath, readPackageJson } from "../../auxiliary";

interface Args extends ExecutesWithProject, ExecutesWithRuntimeContext {}

export const updateDependencies = async ({
  context,
  project,
}: Args): Promise<RuntimeContext> => {
  for (const packageName of Object.keys(context.packages)) {
    let modified = 0;
    const packageJsonPath = getPackageJsonPath({
      context,
      packageName,
    });
    const packageJson = await readPackageJson({ context, packageName });
    if (!packageJson) {
      context.stopExecution = true;
      return context;
    }
    const newDependencies: Record<string, string> = {};
    for (const dependency of Object.keys(packageJson.dependencies)) {
      if (context.packages[dependency]?.newVersion) {
        newDependencies[dependency] = [
          ["file:", project.paths.tarballPath].join(""),
          [
            dependency,
            "-",
            context.packages[dependency].newVersion,
            ".tgz",
          ].join(""),
        ].join(path.sep);
        modified++;
      }
    }
    if (modified > 0) {
      await Bun.write(
        packageJsonPath,
        JSON.stringify(
          {
            ...packageJson,
            dependencies: {
              ...packageJson.dependencies,
              ...newDependencies,
            },
          },
          null,
          2
        )
      );
      terminal.green(packageName)(`: modified ${modified} entries in package.json\n`);
    } else {
      terminal.green(packageName)(`: package.json not modified\n`);
    }
  }
  return context;
};
