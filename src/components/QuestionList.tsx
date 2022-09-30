import { Answer } from "../App";
import { QuestionState } from "../API";
import { fontWeight } from "@mui/system";

type Props = {
  userAnswers: Answer[];
  questions: QuestionState[];
};

const QuestionList = ({ userAnswers, questions }: Props) => {
  console.log(userAnswers);

  return (
    <div className="question-list">
      {questions.map((item, index) => (
        <div className="question" key={index}>
          <p>
            <span>Question:</span> {index + 1}/10
          </p>
          <p dangerouslySetInnerHTML={{ __html: item.question }}></p>
          {item.answers.map((answer) => (
            <p
              key={answer}
              dangerouslySetInnerHTML={{ __html: answer }}
              style={{
                color:
                  answer === userAnswers[index].correctAnswer
                    ? "green"
                    : answer === userAnswers[index].answer &&
                      !userAnswers[index].isCorrect
                    ? "red"
                    : "black",
                fontWeight:
                  answer === userAnswers[index].answer ||
                  answer === userAnswers[index].correctAnswer
                    ? 700
                    : 400,
              }}
            ></p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
