import type { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import { parseCSV, QuestionLine } from "./read_file";
import { sleep } from "./util";

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
      image: line.image,
      audio: line.audio,
    });
  });

  return Array.from(boardMap.entries()).map(([boardId, categoriesMap]) => ({
    id: boardId,
    categories: Array.from(categoriesMap.values()).map((category) => {
      category.questions.sort((a, b) => a.points - b.points);
      return category;
    }),
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const csvFilePath = path.resolve("./assets/data.csv");
  const { query } = req;

  await sleep(20000); 

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
