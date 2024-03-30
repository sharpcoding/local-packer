import { Step } from "./steps";

export interface Project {
  /**
   * The name of the project.
   */
  name: string;
  paths: {
    /**
     * Relative package paths to the `root`.
     */
    packages: string[] | Record<string, string>;
    /**
     * Root package path.
     */
    root: string;
    /**
     * Path to place the tgz (tarball) files.
     */
    tarballPath: string;
  };
  steps: Step[];
}

export interface ExecutesWithProject {
  project: Project;
}
