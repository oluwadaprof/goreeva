import React, { useState } from "react";
import { withQuizContext } from "../contexts/QuizContext";
import classes from '../styles/Createquiz.module.css'

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
      <div className={classes.quiz_header}>
        <label>
          Quiz Name:
          <input type="text" value={quizName} onChange={handleQuizNameChange} />
        </label>
      </div>
      <div>
        <label>
          Quiz Description:
          <textarea
            value={quizDescription}
            onChange={handleQuizDescriptionChange}
          />
        </label>
      </div>
      <div>
        <label>
          Time Limit (in minutes):
          <input
            type="number"
            value={timeLimit}
            onChange={handleTimeLimitChange}
          />
        </label>
      </div>
      <div>
        <label>
          Points:
          <input type="number" value={points} onChange={handlePointsChange} />
        </label>
      </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>Question {questionIndex + 1}</h3>
          <div>
            <label>
              Question Text:
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
              <label>
                Option {optionIndex + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(event, questionIndex, optionIndex)
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => handleDeleteOption(questionIndex, optionIndex)}
              >
                Delete Option
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddOption(questionIndex)}>
            Add Option
          </button>
          <button
            type="button"
            onClick={() => handleDeleteQuestion(questionIndex)}
          >
            Delete Question
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default withQuizContext(CreateQuiz);
