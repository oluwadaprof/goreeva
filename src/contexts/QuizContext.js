import React, { useState, useEffect, createContext } from "react";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
// import firebaseApp from "../firebase";
import "../firebase";
const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizPoints, setQuizPoints] = useState(0);
  const [quizTimeLimit, setQuizTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const quizRef = ref(db, "quiz");
    onValue(quizRef, (snapshot) => {
      const quizData = snapshot.val();
      setQuizName(quizData.name);
      setQuizDescription(quizData.description);
      setQuizPoints(quizData.points);
      setQuizTimeLimit(quizData.timeLimit);
      setQuestions(quizData.questions);
    });
    return () => off(quizRef, "value");
  }, []);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };

  const handleQuizPointsChange = (event) => {
    setQuizPoints(event.target.value);
  };

  const handleQuizTimeLimitChange = (event) => {
    setQuizTimeLimit(event.target.value);
  };

  const handleQuestionChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({ text: "", options: ["", "", "", ""] });
    setQuestions(newQuestions);
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

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    const quizData = {
      name: quizName,
      description: quizDescription,
      points: quizPoints,
      timeLimit: quizTimeLimit,
      questions: questions,
    };
    const db = getDatabase();
    set(ref(db, "quiz"), quizData)
      .then(() => {
        setQuizName("");
        setQuizDescription("");
        setQuizPoints(0);
        setQuizTimeLimit(0);
        setQuestions([]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <QuizContext.Provider
      value={{
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
        handleAddOption,
        handleDeleteOption,
        handleSubmitQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};


export const withQuizContext = (WrappedComponent) => {
  return (props) => (
    <QuizContext.Consumer>
      {(quizContext) => <WrappedComponent {...quizContext} {...props} />}
    </QuizContext.Consumer>
  );
};
       


