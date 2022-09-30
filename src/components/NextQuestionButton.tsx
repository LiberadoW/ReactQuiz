type Props = {
  nextQuestion: Function;
  disabled: boolean
};

const NextQuestionButton = ({ nextQuestion, disabled }: Props) => {
  return (
      <button className="next pseudo-hover" onClick={()=>nextQuestion()} disabled={disabled}>
        Next Question
      </button>
  );
};

export default NextQuestionButton;
