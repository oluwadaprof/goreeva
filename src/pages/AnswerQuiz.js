import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "../styles/Answers.module.css";
import { useQuizContext } from "../contexts/QuizContext";

const AnswerTheQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //to prevent user from reloading the page
  useEffect(() => {
    const confirmExit = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  //fetching the quiz data from the quiz context
  const { quizList } = useQuizContext();

  //fetch the current id of the quiz
  const { id } = useParams();
  //check if the id exist in the quizlist
  const quiz = quizList?.find((quiz) => quiz.id === id.substring(1));
  console.log(id.substring(1));

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];

  return (
    <div>
      <h2>{quiz.name}</h2>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <h4>{currentQuestion.text}</h4>
      <ul className={classes.answers}>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              className={classes.answer}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== undefined}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion}>Previous Question</button>
        )}
        {currentQuestionIndex < quiz.questions.length - 1 && (
          <button onClick={handleNextQuestion}>Next Question</button>
        )}

        {currentQuestion >= quiz.questions.length - 1 && (
          <button>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default AnswerTheQuestion;
