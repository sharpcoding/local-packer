export type PackageJson = {
  name: string;
  version: string;
  dependencies: {
    [key: string]: string;
  };
  scripts: {
    [key: string]: string;
  };
}

export interface ExecutesWithPackageJson {
  packageJson: PackageJson;
}

export interface ExecutesWithPackageJsonPath {
  packageJsonPath: string;
}