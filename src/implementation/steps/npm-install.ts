import { terminal } from "terminal-kit";
import {
  ExecutesWithProject,
  ExecutesWithRuntimeContext,
  NpmInstallStep,
  RuntimeContext,
} from "../../types";

interface Args extends ExecutesWithProject, ExecutesWithRuntimeContext {
  step: NpmInstallStep;
}

export const npmInstall = async ({
  context,
  step,
}: Args): Promise<RuntimeContext> => {
  const command = step.payload.command || "npm i";
  terminal(`${step.payload.package}: executing "${command}"\n`);
  const proc = Bun.spawn(command.split(" "), {
    cwd: context.packages[step.payload.package].fullPath,
  });
  const code = await proc.exited;
  if (code !== 0) {
    terminal.red(`${step.payload.package}: error executing "${command}" node script\n`);
    context.stopExecution = true;
  }
  return context;
};
