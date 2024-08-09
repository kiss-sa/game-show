import fs from "fs";
import path from "path";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getFiles = (
  dirPath: string,
  files: { [key: string]: string[] } = {}
): { [key: string]: string[] } => {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = fullPath.split("public/assets")[1];

    if (item.isDirectory()) {
      getFiles(fullPath, files);
    } else {
      const dirName = path.basename(path.dirname(relativePath));
      if (!files[dirName]) {
        files[dirName] = [];
      }
      files[dirName].push(relativePath);
    }
  }

  return files;
};
