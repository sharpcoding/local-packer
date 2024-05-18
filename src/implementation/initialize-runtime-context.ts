import {
  ExecutesWithProject,
  PackageRuntimeContext,
  RuntimeContext,
} from "../types";

const format = (date: Date) => {
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
    .map((el) => el.toString().padStart(2, "0"))
    .join("");
};

const toLookup = (
  packages: string[] | Record<string, string>
): Record<string, string> => {
  if (Array.isArray(packages)) {
    return packages.reduce((acc, packageName) => {
      return { ...acc, [packageName]: packageName };
    }, {});
  }
  return packages;
};

export const initializeRuntimeContext = ({ project }: ExecutesWithProject) => {
  const packagesLookup = toLookup(project.paths.packages);
  const result: RuntimeContext = {
    packages: Object.keys(packagesLookup).reduce(
      (acc: Record<string, PackageRuntimeContext>, packageName: string) => {
        const fullPath = [project.paths.root, packagesLookup[packageName]].join("/");
        return {
          ...acc,
          [packageName]: {
            fullPath,
            newVersion: "",
          },
        };
      },
      {} as Record<string, PackageRuntimeContext>
    ),
    stopExecution: false,
    versionSuffix: `${format(new Date())}`,
  };
  return result;
};
