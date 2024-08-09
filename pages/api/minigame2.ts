import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getFiles } from "./util";

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
