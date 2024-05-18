import { terminal } from "terminal-kit";

import { initializeRuntimeContext, loadProject } from "./src/implementation";
import {
  compileAndMakeTarball,
  npmInstall,
  createNewPackageVersions,
} from "./src/implementation/steps";
import { ExecutesWithProject } from "./src/types";

const processSteps = async ({ project }: ExecutesWithProject) => {
  let context = initializeRuntimeContext({ project });
  for (const step of project.steps) {
    switch (step.name) {
      case "compile-make-tarball": {
        context = await compileAndMakeTarball({ context, project, step });
        break;
      }
      case "npm-install": {
        context = await npmInstall({ context, project, step });
        break;
      }
      case "create-new-package-versions": {
        context = await createNewPackageVersions({
          context,
          project,
          step,
        });
        break;
      }
    }
    if (context.stopExecution) {
      break;
    }
  }
  if (!context.stopExecution) {
    terminal.green(
      `✅🙌 all ${project.steps.length} steps executed successfully\n`
    );
  }
};

const project = await loadProject();
if (!project) {
  terminal.red("❌ project not loaded\n");
} else {
  await processSteps({ project });
}
terminal().processExit(0);
