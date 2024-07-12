import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Board, Category, Question } from "../api/board";
import { atom, useAtom } from "jotai";
import goBack from "../assets/go_back.png";

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
    <div className="flex items-center justify-center h-screen w-screen">
      {question ? (
        <div className="flex h-4/5 flex-col justify-between w-9/12">
          <div className="flex text-5xl h-full justify-center items-center leading-loose text-center">
            <>{question?.question}</>
          </div>
          {question.image && (
            <div className="flex text-5xl h-full justify-center items-center">
              <img className="max-h-80" src={question.image} />
            </div>
          )}
          {question.audio && (
            <div className="flex text-5xl h-full justify-center items-center">
              <audio controls>
                <source
                  src={require(`../assets/${question.audio}`).default}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div
            className="max-h-20"
            style={{ cursor: "pointer" }}
            onClick={() => setQuestion(null)}
          >
            <img className="max-h-20" src={goBack.src} />
          </div>
        </div>
      ) : (
        <div className="grid-container">
          {board?.categories.map((cat: Category) => (
            <div className="category-column text-4xl">
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
      className="question text-4xl w-60 h-20 flex items-center justify-center"
      onClick={() => {
        handleClick();
      }}
      style={{ background: touched ? "rgba(250, 128, 113, 0.4)" : undefined }}
    >
      <div className="">{question.points}</div>
    </div>
  );
}
