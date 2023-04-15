import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [correctOptions, setCorrectOptions] = useState(
    Array(questions.length).fill(-1)
  );
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

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
    newQuestions.push({
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    });
    setQuestions(newQuestions);
    setCorrectOptions([...correctOptions, 0]);
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

  //handles submit event to store quiz data
  async function handleSubmitQuiz(event) {
    event.preventDefault();
    const db = getFirestore();

    try {
      //sends all quiz data and questions into database
      const docRef = await addDoc(collection(db, "quiz"), {
        name: quizName,
        description: quizDescription,
        points: quizPoints,
        timeLimit: quizTimeLimit,
        //maps questions, correct options, text, and options into databaase
        questions: questions.map((question) => ({
          text: question.text,
          options: question.options,
          correctOption: question.correctOption, // <-- Add the correctOption field to each question
        })),
      }).then(() => {
        setQuizName("");
        setQuizDescription("");
        setQuizPoints(0);
        setQuizTimeLimit(0);
        setQuestions([]);
        toast("Quiz Created Successfully!");
        //navigate to quiz-list page after successful creation of quiz
        navigate("/quiz-list");
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // This function fetches the quiz from the firestore database
  useEffect(() => {
    const db = getFirestore();

    async function fetchQuiz() {
      try {
        setIsLoading(true)
        const querySnapshot = await getDocs(collection(db, "quiz"));
        const quizzes = [];
        //Push the quiz fetched into the quizzes empty array
        querySnapshot.forEach((doc) => {
          quizzes.push({ id: doc.id, ...doc.data() });
        });
        //Store the quiz fetched in the quizlist state
        setQuizList(quizzes);
        setIsLoading(false)

       
      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    }
    //Function call to fetch quiz
    fetchQuiz();
  }, []);




  return (
    <QuizContext.Provider
      value={{
        // score,
        // handleOptionSelect,
        // handleNextQuestion,
        // handlePreviousQuestion,
        // currentQuestion,
        // selectedOption,
        // handleSubmitQuizResult,
        // currentQuestionIndex,
        isLoading,
        setIsLoading,
        quizList,
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
      <ToastContainer />
      {children}
    </QuizContext.Provider>
  );
};
