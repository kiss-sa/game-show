import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";

export interface QuestionLine {
  board: string;
  category: string;
  question: string;
  points: string;
  audio?: string;
  image?: string;
}

export function parseCSV(csvFilePath: string): Promise<QuestionLine[]> {
  return new Promise((resolve, reject) => {
    const results: QuestionLine[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on(
        "data",
        (data: {
          Board: any;
          Category: any;
          Question: any;
          Points: any;
          Audio: any;
          Image: any;
        }) => {
          const question: QuestionLine = {
            board: data.Board,
            category: data.Category,
            question: data.Question,
            points: data.Points,
            audio: data.Audio,
            image: data.Image,
          };
          results.push(question);
        }
      )
      .on("end", () => resolve(results));
  });
}
