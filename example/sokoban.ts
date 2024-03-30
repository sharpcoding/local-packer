import { Project } from "../src/types";

export const sokobanProject: Project = {
  name: "sokoban",
  paths: {
    packages: [
      "key-value-state-container",
      "key-value-state-container-react",
      "sokoban"
    ],
    root: "/Users/tms/Documents/Development/tsrepos",
    tarballPath: "~/libs",
  },
  steps: [
    {
      name: "refresh-versions-and-dependencies",
      payload: {
        packages: [
          "key-value-state-container",
          "key-value-state-container-react",
        ],
      },
    },
    {
      name: "compile-make-tarball",
      payload: {
        tarballScript: "make-tarball",
        package: "key-value-state-container",
      },
    },
    {
      name: "npm-install",
      payload: {
        package: "key-value-state-container-react",
      },
    },
    {
      name: "compile-make-tarball",
      payload: {
        tarballScript: "make-tarball",
        package: "key-value-state-container-react",
      },
    },
    // {
    //   name: "npm-install",
    //   payload: {
    //     package: "sokoban",
    //   },
    // },
  ],
};
