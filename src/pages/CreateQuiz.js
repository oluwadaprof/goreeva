import React from "react";
import { useQuizContext } from "../contexts/QuizContext";
import classes from "../styles/Createquiz.module.css";

const CreateQuiz = () => {
  const {
    quizName,
    quizDescription,
    quizPoints,
    quizTimeLimit,
    questions,
    handleQuizNameChange,
    handleQuizDescriptionChange,
    handleQuizPointsChange,
    handleQuizTimeLimitChange,
    handleQuestionChange,
    handleAddQuestion,
    handleDeleteQuestion,
    handleOptionChange,
    handleCorrectOptionChange,
    handleAddOption,
    handleDeleteOption,
    handleSubmitQuiz,
  } = useQuizContext();

  return (
    <form onSubmit={handleSubmitQuiz} className={classes.quiz_container}>
      <h1>Create Quiz</h1>
      <section>
        <div className={classes.left_section}>
          <div className={classes.quiz_header}>
            <label>
              <span> Quiz Name</span>
              <input
                type="text"
                value={quizName}
                onChange={handleQuizNameChange}
              />
            </label>
          </div>
          <div className={classes.quiz_header}>
            <label>
              <span>Quiz Description</span>
              <textarea
                cols={4}
                rows="10"
                value={quizDescription}
                onChange={handleQuizDescriptionChange}
              />
            </label>
          </div>
          <div className={classes.quiz_header}>
            <label>
              <span>Time Limit (in minutes):</span>
              <input
                type="number"
                value={quizTimeLimit}
                onChange={handleQuizTimeLimitChange}
              />
            </label>
          </div>
          <div className={classes.quiz_header}>
            <label>
              <span> Points:</span>
              <input
                type="number"
                value={quizPoints}
                onChange={handleQuizPointsChange}
              />
            </label>
          </div>
        </div>
        <div className={classes.right_section}>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className={classes.question_container}>
              <h3>Question {questionIndex + 1}</h3>
              <div>
                <label>
                  <span>Question Text:</span>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(event) =>
                      handleQuestionChange(event, questionIndex)
                    }
                  />
                </label>
              </div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label className={classes.option}>
                    <span> Option {optionIndex + 1}:</span>
                    <input
                      className={classes.question_input}
                      type="text"
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(event, questionIndex, optionIndex)
                      }
                    />
                  </label>

                  <label htmlFor={`question-${questionIndex}-correctOption`}>
                    Is this the correct option?
                  </label>
                  <select
                    id={`question-${questionIndex}-correctOption`}
                    value={question.correctOption}
                    onChange={(event) =>
                      handleCorrectOptionChange(event, questionIndex)
                    }
                  >
                    {question.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteOption(questionIndex, optionIndex)
                    }
                  >
                    Delete Option
                  </button>
                </div>
              ))}

              <div className={classes.group_btn}>
                <button
                  type="button"
                  className={classes.add_option_btn}
                  onClick={() => handleAddOption(questionIndex)}
                >
                  Add Option
                </button>
                <button
                  type="button"
                  className={classes.delete_question_btn}
                  onClick={() => handleDeleteQuestion(questionIndex)}
                >
                  Delete Question
                </button>
              </div>
            </div>
          ))}
          <div className={classes.group_btn}>
            <button
              className={classes.add_question}
              type="button"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
            <button className={classes.create_quiz} type="submit">
              Create Quiz
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CreateQuiz;
