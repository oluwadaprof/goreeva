import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "../styles/Answers.module.css";
import { useQuizContext } from "../contexts/QuizContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom';

// import ProgressBar from "../components/ProgressBar";

const AnswerTheQuestion = () => {

  const navigate = useNavigate()

  const [close, setClose] = useState(false)

  const { quizList } =useQuizContext()

   //fetch the current id of the quiz
   const { answerId } = useParams();
   //check if the id exist in the quizlist
   const quiz = quizList?.find((quiz) => quiz.id === answerId.substring(1));
   console.log(answerId.substring(1));
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
    console.log(`Selected option: ${optionIndex}`);
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


  const handleSubmitQuizResult = () => {
    let totalScore = 0;
  
    // Calculate the score for each question
    quiz.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      const correctOptionIndex = question.correctOption;
  
      if (selectedOptionIndex !== undefined && selectedOptionIndex === correctOptionIndex) {
        totalScore += 1;
      }
    });
  
    // Display the score if all questions are answered
    if (selectedOptions.length === quiz.questions.length) {
      setScore(totalScore);
    }
  };

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

 const handleClose =()=>{
  setClose(false)
  navigate(`/result/${score}-${quiz.questions.length}`)
 }
 const handleOpen =()=>{
  setClose(true)
 }

  return (
    <div>
      <h2>{quiz.name}</h2>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <h4>{currentQuestion.text}</h4>
      <ul className={classes.answers}>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              className={`${classes.answer} ${
                selectedOption === index ? `${classes.selected_option}` : null
              }`}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== undefined}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <div className={classes.answer_groupBtn}>
        {currentQuestionIndex > 0 && (
          <Button
            className={classes.answer_btn}
            onClick={handlePreviousQuestion}
          >
            Previous Question
          </Button>
        )}
        {currentQuestionIndex < quiz.questions.length - 1 && (
          <Button className={classes.answer_btn} onClick={handleNextQuestion}>
            Next Question
          </Button>
        )}
      </div>

      <Link className={classes.submit}>
        {currentQuestionIndex === quiz.questions.length - 1 && (
          <Button
            className={`${classes.answer_btn} ${classes.submit}`}
            onClick={()=>{handleSubmitQuizResult(); handleOpen()}}
          >
            Submit Quiz
          </Button>
        )}
      </Link>

      {/* <ProgressBar/> */}
      {/* <p> Score: {score}/ {quiz.questions.length}</p> */}

     {
      close &&  <Modal score={score} quizlength={quiz.questions.length} onClose={handleClose} />
     }
    </div>
  );
};

export default AnswerTheQuestion;
