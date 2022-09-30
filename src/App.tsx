import QuestionCard from "./components/QuestionCard";
import { fetchQuestions } from "./API";
import { useState } from "react";
import { QuestionState } from "./API";
import "./styles/main.scss";
import NextQuestionButton from "./components/NextQuestionButton";
import QuestionList from "./components/QuestionList";
import QuizSelectOptions from "./components/QuizSelectOptions";

const TOTAL_QUESTIONS_NUMBER = 10;

export type Answer = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

function App() {
  const [quizCategory, setQuizCategory] = useState("default");
  const [quizDifficulty, setQuizDifficulty] = useState("default");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [playAgain, setPlayAgain] = useState(true);

  const startQuiz = async () => {
    if (quizCategory === "default" || quizDifficulty === "default") {
      alert("Please select category and difficulty.");
    } else {
      setPlayAgain(false);
      setLoading(true);
      setShowAnswers(false);
      setGameOver(false);
      const newQuestionArray = await fetchQuestions(
        quizCategory,
        quizDifficulty
      );
      setQuestions(newQuestionArray);
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const isCorrect = questions[questionNumber].correct_answer === answer;
      if (isCorrect) setScore((prevState) => prevState + 1);
      const answerObject: Answer = {
        question: questions[questionNumber].question,
        answer,
        isCorrect,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prevState) => [...prevState, answerObject]);
    }
  };


  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    console.log(nextQuestion)
    setQuestionNumber(nextQuestion);
  };

  return (
    <div className="app">
      <h1>React Quiz</h1>
      <div className="play-again-container">
        {!loading && userAnswers.length === TOTAL_QUESTIONS_NUMBER && !playAgain && (
          <button 
            onClick={() => {
              setPlayAgain((prevState) => !prevState);
            }}
            className="play-again pseudo-hover"
          >
            Play again
          </button>
        )}
        {!loading && userAnswers.length === TOTAL_QUESTIONS_NUMBER && !playAgain && (
          <button
            onClick={() => {
              setShowAnswers((prevState) => !prevState);
            }}
            className="show pseudo-hover"
          >
            {showAnswers ? "Hide answers" : "Show answers"}
          </button>
        )}
      </div>
      {!loading && playAgain ? (
        <div className="quiz-select-options">
          <QuizSelectOptions
            quizCategory={quizCategory}
            setQuizCategory={setQuizCategory}
            quizDifficulty={quizDifficulty}
            setQuizDifficulty={setQuizDifficulty}
          />
          <button className="start pseudo-hover" onClick={startQuiz}>
            Start
          </button>
        </div>
      ) : null}
      {loading ? <p className="loading">Loading questions</p> : ""}
      {!loading && !gameOver && !playAgain && <p className="score">Score: {score}</p>}

      {!loading && !showAnswers  && !gameOver && !playAgain && (
        <>
          <div className="play-area-container">
            <QuestionCard
              category={questions[questionNumber].category}
              difficulty={questions[questionNumber].difficulty}
              question={questions[questionNumber].question}
              answers={questions[questionNumber].answers}
              questionNumber={questionNumber + 1}
              userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
              callback={checkAnswer}
              totalQuestions={TOTAL_QUESTIONS_NUMBER}
            />
            <NextQuestionButton
              nextQuestion={nextQuestion}
              disabled={
                !gameOver &&
                !loading &&
                userAnswers.length === questionNumber + 1 &&
                questionNumber !== TOTAL_QUESTIONS_NUMBER - 1
                  ? false
                  : true
              }
            />
          </div>
        </>
      )}

      {!loading && !playAgain && showAnswers ? (
        <QuestionList userAnswers={userAnswers} questions={questions} />
      ) : null}
    </div>
  );
}

export default App;
