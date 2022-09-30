import { Answer } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNumber: number;
  totalQuestions: number;
  category: string;
  difficulty: string;
};

const QuestionCard = ({
  category,
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  difficulty
}: Props) => {
  return (
    <div className="question-card"> 
    <p className="question-card-top-bar"><span>Category: {category}</span> <span>Difficulty: {difficulty[0].toUpperCase() + difficulty.slice(1)}</span> </p>
      <p className="number">
        <span className="bold">Question:</span> {`${questionNumber}/${totalQuestions}`}
      </p>
      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="button-container">
        {answers.map((answer, index) => (
          <button
            className="pseudo-hover"
            key={index}
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
            style={{
              backgroundColor:
                userAnswer?.correctAnswer === answer
                  ?	"#228B22"
                  : userAnswer?.correctAnswer !== answer &&
                    userAnswer?.answer === answer
                  ? "#E52800"
                  : "#0071c5"
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
