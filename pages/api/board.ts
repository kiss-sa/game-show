import type { NextApiRequest, NextApiResponse } from 'next' 

export interface Question {
  id: number ; 
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
            id: 1,
            question: "Who was the first president of the United States?",
            points: 100,
            image: "https://www.whitehouse.gov/wp-content/uploads/2021/01/01_george_washington.jpg"
          },
          {
            id: 2, 
            question: "In what year did the Titanic sink?",
            points: 200, 
            audio: "test.mp3"
          },
          {
            id: 3, 
            question: "Which empire was known as the 'Eastern Roman Empire'?",
            points: 300,
            image: "https://example.com/image2.jpg"
          },
          {
            id: 4, 
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
            id: 5, 
            question: "What is the chemical symbol for water?",
            points: 100
          },
          {
            id: 6,
            question: "How many planets are in our solar system?",
            points: 200
          },
          {
            id: 7, 
            question: "What gas do plants absorb from the atmosphere?",
            points: 300,
            image: "https://example.com/image3.jpg"
          },
          {
            id: 8, 
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
            id: 9, 
            question: "Who wrote 'To Kill a Mockingbird'?",
            points: 100
          },
          {
            id: 10, 
            question: "Which novel starts with 'Call me Ishmael'?",
            points: 200
          },
          {
            id: 11, 
            question: "Who is the author of '1984'?",
            points: 300,
            image: "https://example.com/image4.jpg"
          },
          {
            id: 12, 
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
            id: 13, 
            question: "What is the capital of France?",
            points: 100
          },
          {
            id: 14, 
            question: "Which country has the most natural lakes?",
            points: 200
          },
          {
            id: 15, 
            question: "What is the smallest country in the world?",
            points: 300,
            image: "https://example.com/image5.jpg"
          },
          {
            id: 16, 
            question: "What is the longest river in the world?",
            points: 400
          }
        ]
      }
    ]
  };

  res.status(200).json({ board });
}