import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Board, Category } from "../api/board";

export default function Boardpage() {
  const searchParams = useSearchParams();
  const boardID = searchParams?.get("id");
  const [board, setBoard] = useState<Board>();

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
      <div className="grid-container">
        {board?.categories.map((cat: Category) => (
          <div className="category-column">
            <h2>{cat.name}</h2>
            {cat.questions.map((question, indx) => (
              <div key={indx} className="question">
                <p>{question.points}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
