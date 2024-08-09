import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { getFiles } from "./util";

type FileResponse = {
  Filme: string[];
  Games: string[];
  Tierbeschreibungen: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const publicDirPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "minigame_1"
  );

  const files = getFiles(publicDirPath);

  const fileResp: FileResponse = {
    Filme: [],
    Games: [],
    Tierbeschreibungen: [],
  };

  fileResp.Filme = files["Filme"];
  fileResp.Games = files["Games"];

  for (const file of files.Tierbeschreibungen) {
    try {
      const filePath = path.join(process.cwd(), "public", "assets", file);
      const data = await fs.readFile(filePath, "utf-8");
      fileResp.Tierbeschreibungen.push(data);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }
  res.status(200).json(fileResp);
}
