import React, { useState } from "react";
import { withQuizContext } from "../contexts/QuizContext";
import classes from "../styles/Createquiz.module.css";

const CreateQuiz = (props) => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [points, setPoints] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: [] }]);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  const handleQuestionTextChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: [] }]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createQuiz({
      name: quizName,
      description: quizDescription,
      timeLimit: timeLimit,
      points: points,
      questions: questions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.quiz_container}>
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
                value={timeLimit}
                onChange={handleTimeLimitChange}
              />
            </label>
          </div>
          <div className={classes.quiz_header}>
            <label>
              <span> Points:</span>
              <input
                type="number"
                value={points}
                onChange={handlePointsChange}
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
                      handleQuestionTextChange(event, questionIndex)
                    }
                  />
                </label>
              </div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label className={classes.option} >
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

             <div className={classes.group_btn} >
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

export default withQuizContext(CreateQuiz);
