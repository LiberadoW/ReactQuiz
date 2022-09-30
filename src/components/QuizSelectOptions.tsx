type Props = {
  quizCategory: string;
  setQuizCategory: React.Dispatch<React.SetStateAction<string>>;
  quizDifficulty: string;
  setQuizDifficulty: React.Dispatch<React.SetStateAction<string>>;
};

const quizCategoriesList = [
  { id: "", name: "All" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
];

const QuizSelectOptions = ({
  quizCategory,
  setQuizCategory,
  quizDifficulty,
  setQuizDifficulty,
}: Props) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizCategory(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizDifficulty(e.target.value);
  };

  return (
    <>
      <div className="custom-select">
        Category
        <select
          name="category"
          id="quiz-category"
          onChange={handleCategoryChange}
          value={quizCategory}
        >
          <option value="default" disabled>
            Choose category
          </option>
          {quizCategoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="custom-arrow"></span>
      </div>
      <div className="custom-select">
        Difficulty
        <select
          name="difficulty"
          id="quiz-difficulty"
          onChange={handleDifficultyChange}
          value={quizDifficulty}
        >
          <option value="default" disabled>
            Choose difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <span className="custom-arrow"></span>
      </div>
    </>
  );
};

export default QuizSelectOptions;
