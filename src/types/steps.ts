export type RefreshVersionsAndDependenciesStep = {
  name: "create-new-package-versions";
  payload: {
    packages: string[];
  };
};

export type UpdateDependenciesStep = {
  name: "create-new-package-versions";
};

export type NpmInstallStep = {
  name: "npm-install";
  payload: {
    command?: string;
    package: string;
  };
};

export type CompileAndMakeTarballStep = {
  name: "compile-make-tarball";
  payload: {
    /**
     * The tarball script name to make the tgz file 
     */
    tarballScript: string;
    /**
     * The actual package name.
     */
    package: string;
  };
};


export type Step =
  | NpmInstallStep
  | RefreshVersionsAndDependenciesStep
  | CompileAndMakeTarballStep;