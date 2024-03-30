import { terminal } from "terminal-kit";
import {
  CompileAndMakeTarballStep,
  ExecutesWithPackageJson,
  ExecutesWithProject,
  ExecutesWithRuntimeContext,
} from "../../../types";
import { terminalYesNo, writePackageJson } from "../../auxiliary";

interface Args
  extends ExecutesWithRuntimeContext,
    ExecutesWithProject,
    ExecutesWithPackageJson {
  step: CompileAndMakeTarballStep;
}

const makeTarballScriptName = "make-tarball";
const makeTarballScriptCommand = "npm run build && npm run pack-locally";
const packLocallyScriptName = "pack-locally";
const packLocallyScriptCommand = ({
  project,
}: Pick<Args, "project" | "step">) =>
  `npm pack --pack-destination ${project.paths.tarballPath}`;

export const makeSureScriptsAreCorrect = async ({
  context,
  packageJson,
  project,
  step,
}: Args): Promise<boolean> => {
  let updated = false;
  if (!packageJson.scripts[step.payload.tarballScript]) {
    if (
      await terminalYesNo(
        `${step.payload.package}: no "${step.payload.tarballScript}" script found in package.json. Should add "${makeTarballScriptName}"?`
      )
    ) {
      packageJson.scripts[makeTarballScriptName] = makeTarballScriptCommand;
      terminal(
        `${step.payload.package}: added, make sure the "${makeTarballScriptName}" script executes compilation/transpilation to generate package and then executes the "${packLocallyScriptName}" script\n`
      );
      updated = true;
    }
  }

  if (!packageJson.scripts[packLocallyScriptName]) {
    if (
      await terminalYesNo(
        `${step.payload.package}: add "${packLocallyScriptName}" script to package.json?`
      )
    ) {
      packageJson.scripts[packLocallyScriptName] = packLocallyScriptCommand({
        step,
        project,
      });
      terminal(
        `${step.payload.package}: make sure the "${step.payload.tarballScript}" script uses the "${packLocallyScriptName}" script\n`
      );
      updated = true;
    }
  }

  if (updated) {
    await writePackageJson({
      packageJson,
      context,
      packageName: step.payload.package,
    });
    terminal(
      `${step.payload.package}: stopping the steps execution because package.json was modified\n`
    );
    return false;
  }
  return true;
};
