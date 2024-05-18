import { Step } from "./steps";

export interface Project {
  /**
   * The name of the project.
   */
  name: string;
  paths: {
    /**
     * Paths are relative to the `root` folder
     */
    packages: string[] | Record<string, string>;
    
    /**
     * Root package path.
     */
    root: string;
    /**
     * Path to place the tgz (tarball) files.
     * Please use `~` to represent the home directory.
     * Make sure directory exists.
     */
    tarballPath: string;
  };
  steps: Step[];
}

export interface ExecutesWithProject {
  project: Project;
}
