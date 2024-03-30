import { terminal } from "terminal-kit";

import { sokobanProject } from "./example/sokoban";
import { initializeRuntimeContext } from "./src/implementation";
import {
  compileAndMakeTarball,
  npmInstall,
  refreshVersionsAndDependencies,
} from "./src/implementation/steps";
import { ExecutesWithProject } from "./src/types";

const main = async ({ project }: ExecutesWithProject) => {
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
      case "refresh-versions-and-dependencies": {
        context = await refreshVersionsAndDependencies({
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
    terminal.green(`✅🙌 all ${project.steps.length} steps executed successfully\n`);
  }
  terminal.processExit(0);
};

main({ project: sokobanProject });
