import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const getFiles = (
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const publicDirPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "minigame_2"
  );

  const files = getFiles(publicDirPath);

  res.status(200).json(files);
}
