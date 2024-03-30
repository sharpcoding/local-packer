export type PackageRuntimeContext = {
  fullPath: string;
  newVersion: string;
}

export type RuntimeContext = {
  packages: Record<string, PackageRuntimeContext>;
  stopExecution: boolean;
  versionSuffix: string;
};

export type ExecutesWithRuntimeContext = {
  context: RuntimeContext;
}