import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  diffculty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  difficulty: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async (quizCategory:string, quizDifficulty:string) => {
  const data = await (
    await fetch(`https://opentdb.com/api.php?amount=10&category=${quizCategory}&type=multiple&difficulty=${quizDifficulty}`)
  ).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
