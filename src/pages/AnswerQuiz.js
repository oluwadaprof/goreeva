import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore,  } from "firebase/firestore";
import classes from "../styles/Answers.module.css";
import { collection, getDocs } from "firebase/firestore";


const AnswerTheQuestion = () => {
  // const [quiz, setQuiz] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

    // const { id  } = useParams();

  // useEffect(() => {
  //   const db = getFirestore();
  //   async function fetchQuiz() {
  //     const querySnapshot = await getDocs(collection(db, "quiz"));
  //     querySnapshot.forEach((doc) => {
  //       setQuiz(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //       console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //     });
  //   }
  //   fetchQuiz();
  // }, []);

    const handleOptionSelect = (optionIndex) => {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[currentQuestionIndex] = optionIndex;
      setSelectedOptions(newSelectedOptions);
    };

    // const handleNextQuestion = () => {
    //   if (currentQuestionIndex < quiz.questions.length - 1) {
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //   }
    // };

    const handlePreviousQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

  // if (!quiz) {
  //   return <div>Loading...</div>;
  // }

  // const currentQuestion = quiz.questions[currentQuestionIndex];
  // const selectedOption = selectedOptions[currentQuestionIndex];

   return 
    // <div>
    //   hello quiz
    //   <h2>{quiz.name}</h2>
    //   <h3>Question {currentQuestionIndex + 1}</h3>
    //   <h4>{currentQuestion.text}</h4>
    //   <ul className={classes.answers}>
    //     {currentQuestion.options.map((option, index) => (
    //       <li key={index}>
    //         <button
    //           onClick={() => handleOptionSelect(index)}
    //           disabled={selectedOption !== undefined}
    //         >
    //           {option}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   <div>
    //     {currentQuestionIndex > 0 && (
    //       <button onClick={handlePreviousQuestion}>Previous Question</button>
    //     )}
    //     {currentQuestionIndex < quiz.questions.length - 1 && (
    //       <button onClick={handleNextQuestion}>Next Question</button>
    //     )}
    //   </div>
    //  </div>
  // );
};

export default AnswerTheQuestion;
