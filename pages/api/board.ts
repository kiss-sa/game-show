import type { NextApiRequest, NextApiResponse } from 'next' 

export interface Question {
  question: string; 
  points: number; 
  image?: string; 
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

export default function handler( 
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const board = {
    id: 1,
    categories: [
      {
        name: "History",
        pos: 1,
        questions: [
          {
            question: "Who was the first president of the United States?",
            points: 100,
            image: "https://example.com/image1.jpg"
          },
          {
            question: "In what year did the Titanic sink?",
            points: 200
          },
          {
            question: "Which empire was known as the 'Eastern Roman Empire'?",
            points: 300,
            image: "https://example.com/image2.jpg"
          },
          {
            question: "Who discovered penicillin?",
            points: 400
          }
        ]
      },
      {
        name: "Science",
        pos: 2,
        questions: [
          {
            question: "What is the chemical symbol for water?",
            points: 100
          },
          {
            question: "How many planets are in our solar system?",
            points: 200
          },
          {
            question: "What gas do plants absorb from the atmosphere?",
            points: 300,
            image: "https://example.com/image3.jpg"
          },
          {
            question: "What is the speed of light?",
            points: 400
          }
        ]
      },
      {
        name: "Literature",
        pos: 3,
        questions: [
          {
            question: "Who wrote 'To Kill a Mockingbird'?",
            points: 100
          },
          {
            question: "Which novel starts with 'Call me Ishmael'?",
            points: 200
          },
          {
            question: "Who is the author of '1984'?",
            points: 300,
            image: "https://example.com/image4.jpg"
          },
          {
            question: "What is the name of the hobbit played by Elijah Wood in the Lord of the Rings movies?",
            points: 400
          }
        ]
      },
      {
        name: "Geography",
        pos: 4,
        questions: [
          {
            question: "What is the capital of France?",
            points: 100
          },
          {
            question: "Which country has the most natural lakes?",
            points: 200
          },
          {
            question: "What is the smallest country in the world?",
            points: 300,
            image: "https://example.com/image5.jpg"
          },
          {
            question: "What is the longest river in the world?",
            points: 400
          }
        ]
      }
    ]
  };

  res.status(200).json({ board });
}