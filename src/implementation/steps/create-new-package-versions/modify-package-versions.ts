const path = require("path");

import { terminal } from "terminal-kit";
import {
  RefreshVersionsAndDependenciesStep,
  ExecutesWithRuntimeContext,
  RuntimeContext,
  ExecutesWithPackageJson,
} from "../../../types";
import { readPackageJson, writePackageJson } from "../../auxiliary";

interface Args extends ExecutesWithRuntimeContext {
  step: RefreshVersionsAndDependenciesStep;
}

const getVersions = ({
  context,
  packageJson,
}: Pick<Args, "context"> & ExecutesWithPackageJson): {
  originalVersion: string;
  newVersion: string;
} => {
  const split = packageJson.version.split(".");
  return {
    newVersion: `${split[0]}.${split[1]}.${context.versionSuffix}`,
    originalVersion: packageJson.version,
  };
};

export const modifyPackageVersions = async ({
  step,
  context,
}: Args): Promise<RuntimeContext> => {
  for (const packageName of step.payload.packages) {
    const packageJson = await readPackageJson({ context, packageName });
    if (!packageJson) {
      context.stopExecution = true;
      return context;
    }
    const { newVersion, originalVersion } = getVersions({
      context,
      packageJson,
    });
    context.packages[packageName].newVersion = newVersion;
    await writePackageJson({
      context,
      packageName,
      packageJson: {
        ...packageJson,
        version: newVersion,
      },
    });
    terminal
      .green(packageName)(` changed version `)
      .green(originalVersion)(` -> `)
      .green(`${newVersion}\n`);
  }
  return context;
};
