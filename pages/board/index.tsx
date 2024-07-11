import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Board, Category, Question } from "../api/board";
import { atom, useAtom } from "jotai";

export const touchedQuestionsAtom = atom([] as number[]);

export default function Boardpage() {
  const searchParams = useSearchParams();
  const boardID = searchParams?.get("id");
  const [board, setBoard] = useState<Board>();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/board");
      const data = await response.json();
      console.log(data);
      setBoard(data.board);
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {question ? (
        <div style={{ visibility: question ? "visible" : "hidden" }}>
          <div>{question?.question}</div>
          <br />
          <div style={{ cursor: "pointer" }} onClick={() => setQuestion(null)}>
            Go back
          </div>
        </div>
      ) : (
        <div className="grid-container">
          {board?.categories.map((cat: Category) => (
            <div className="category-column">
              <h2>{cat.name}</h2>
              {cat.questions.map((question, indx) => (
                <QuestionRectangle
                  key={indx}
                  question={question}
                  setQuestion={setQuestion}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface QuestionParams {
  question: Question;
  setQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

function QuestionRectangle(params: QuestionParams) {
  const { question, setQuestion } = params;

  const [touchedQuestions, setTouchedQuestions] = useAtom(touchedQuestionsAtom);
  const touched = touchedQuestions.includes(question.id);

  const handleClick = () => {
    setTouchedQuestions((prev) => [...prev, question.id]);
    setQuestion(question);
  };

  return (
    <div
      className="question"
      onClick={() => {
        handleClick();
      }}
      style={{ background: touched ? "rgba(250, 128, 113, 0.4)" : undefined }}
    >
      <p>{question.points}</p>
    </div>
  );
}
