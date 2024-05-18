const path = require("path");

import {
  RefreshVersionsAndDependenciesStep,
  ExecutesWithRuntimeContext,
  RuntimeContext,
  ExecutesWithProject,
} from "../../../types";
import { modifyPackageVersions } from "./modify-package-versions";
import { updateDependencies } from "./update-dependencies";

interface Args extends ExecutesWithProject, ExecutesWithRuntimeContext {
  step: RefreshVersionsAndDependenciesStep;
}

export const createNewPackageVersions = async ({
  context: argsContext,
  project,
  step,
}: Args): Promise<RuntimeContext> => {
  let context = await modifyPackageVersions({ step, context: argsContext });
  context = await updateDependencies({ project, context });
  return context;
};
