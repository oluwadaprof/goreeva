import React, { useState, useEffect,  useContext } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "../firebase";
const QuizContext = React.createContext();

export function useQuizContext() {
  return useContext(QuizContext);
}

export const QuizProvider = ({ children }) => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizPoints, setQuizPoints] = useState(0);
  const [quizTimeLimit, setQuizTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [correctOptions, setCorrectOptions] = useState(Array(questions.length).fill(-1));

  const navigate = useNavigate();

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
    newQuestions.push({ text: "", options: ["", "", "", ""] , correctOption: -1});
    setQuestions(newQuestions);
    setCorrectOptions([...correctOptions, -1]);
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
  const handleCorrectOptionChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = parseInt(event.target.value); // Convert the string value to an integer
    setQuestions(newQuestions);
  };

  async function handleSubmitQuiz(event) {
    event.preventDefault();
    const db = getFirestore();

    try {
      const docRef = await addDoc(collection(db, "quiz"), {
        name: quizName,
        description: quizDescription,
        points: quizPoints,
        timeLimit: quizTimeLimit,
        questions: questions.map((question) => ({
          text: question.text,
          options: question.options,
          correctOption: question.correctOption // <-- Add the correctOption field to each question
        }))
      }).then(() => {
        setQuizName("");
        setQuizDescription("");
        setQuizPoints(0);
        setQuizTimeLimit(0);
        setQuestions([]);
        navigate('/answer-quiz')
        alert("Quiz created successfully!")
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
        handleCorrectOptionChange,
        handleAddOption,
        handleDeleteOption,
        handleSubmitQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};


