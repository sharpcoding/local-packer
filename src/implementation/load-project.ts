const fs = require("fs");
const path = require("path");
import { terminal } from "terminal-kit";
import { Project } from "../types";

const selectProject = async (
  projectName?: string
): Promise<string | undefined> => {
  if (projectName) {
    return projectName;
  }
  const files: string[] = fs.readdirSync("./projects");
  const choice = await terminal.singleLineMenu([
    ...files.map((el) => path.parse(el).name),
    "quit",
  ]).promise;
  return choice.selectedIndex < files.length
    ? choice.selectedText
    : undefined;
};

export const loadProject = async (
  projectName?: string
): Promise<Project | undefined> => {
  const name = await selectProject(projectName);
  if (name) {
    const project: Project = await Bun.file(
      `./projects/${name}.json`
    ).json();
    return project;
  }
  return undefined;
};
