import { terminal } from "terminal-kit";
import {
  CompileAndMakeTarballStep,
  ExecutesWithProject,
  ExecutesWithRuntimeContext,
  RuntimeContext,
} from "../../../types";
import {
  readPackageJson,
  getPackageJsonPath,
  terminalYesNo,
} from "../../auxiliary";
import { makeSureScriptsAreCorrect } from "./make-sure-scripts-are-correct";

interface Args extends ExecutesWithProject, ExecutesWithRuntimeContext {
  step: CompileAndMakeTarballStep;
}

export const compileAndMakeTarball = async ({
  context,
  project,
  step,
}: Args): Promise<RuntimeContext> => {
  const packageJson = await readPackageJson({
    context,
    packageName: step.payload.package,
  });
  if (!packageJson) {
    context.stopExecution = true;
    return context;
  }
  if (
    !(await makeSureScriptsAreCorrect({
      context,
      packageJson,
      project,
      step,
    }))
  ) {
    context.stopExecution = true;
    return context;
  }
  terminal(
    `${step.payload.package}: executing "${step.payload.tarballScript}"\n`
  );
  const proc = Bun.spawn(["npm", "run", step.payload.tarballScript], {
    cwd: context.packages[step.payload.package].fullPath,
  });
  const code = await proc.exited;
  if (code !== 0) {
    terminal.red(
      `${step.payload.package}: error executing "${step.payload.tarballScript}" node script\n`
    );
    context.stopExecution = true;
  }
  return context;
};
