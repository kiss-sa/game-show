import type { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import { parseCSV, QuestionLine } from "./read_file";

export interface Question {
  id: number;
  question: string;
  points: number;
  image?: string;
  audio?: string;
}

export interface Category {
  name: string;
  pos: number;
  questions: Question[];
}

export interface Board {
  id: number;
  categories: Category[];
}

function transformBoard(lines: QuestionLine[]): Board[] {
  const boardMap: Map<number, Map<string, Category>> = new Map();

  lines.forEach((line, indx) => {
    const boardID: number = parseInt(line.board);
    if (!boardMap.has(boardID)) {
      boardMap.set(boardID, new Map());
    }

    const categoryMap = boardMap.get(boardID);
    if (!categoryMap?.has(line.category)) {
      categoryMap?.set(line.category, {
        name: line.category,
        pos: 1,
        questions: [],
      });
    }

    const category = categoryMap?.get(line.category);
    category?.questions.push({
      id: indx,
      question: line.question,
      points: parseInt(line.points),
      image: line.image !== "" ? line.image : undefined,
      audio: line.audio !== "" ? line.audio : undefined,
    });
  });

  return Array.from(boardMap.entries()).map(([boardId, categoriesMap]) => ({
    id: boardId,
    categories: Array.from(categoriesMap.values()),
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const csvFilePath = path.resolve("./assets/test.csv");
  const { query } = req;

  const queryID = query["id"];
  if (!queryID) {
    res.status(400);
  }

  if (!queryID || Array.isArray(queryID)) {
    res.status(400);
  }
  const boardID = parseInt(queryID as string);

  return new Promise<void>((resolve, reject) => {
    parseCSV(csvFilePath)
      .then((questions) => {
        const result = transformBoard(questions);
        const board = result.filter((b) => b.id === boardID)[0];
        res.status(200).json({ board });
        resolve();
      })
      .catch((error) => {
        console.error("Error parsing CSV to objects:", error);
        res.status(500);
        resolve();
      });
  });
}
