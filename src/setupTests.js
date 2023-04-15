// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


 // const handleSubmitQuiz = () => {
  //   const currentQuestion = quiz.questions[currentQuestionIndex];
  //   const selectedOptionsForCurrentQuestion = selectedOptions[currentQuestionIndex];
  //   const correctOptionForCurrentQuestion = currentQuestion.correctOption;
  
  //   let numCorrectOptions = 0;
  //   if (Array.isArray(correctOptionForCurrentQuestion)) {
  //     numCorrectOptions = correctOptionForCurrentQuestion.filter(optionIndex =>
  //       selectedOptionsForCurrentQuestion.includes(optionIndex)
  //     ).length;
  //   } else if (selectedOptionsForCurrentQuestion.includes(correctOptionForCurrentQuestion)) {
  //     numCorrectOptions = 1;
  //   }
  
  //   setScore(score + numCorrectOptions);
  
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  
  //   console.log(score);
  // };
  // const handleSubmitQuiz = () => {
  //   const currentQuestion = quiz.questions[currentQuestionIndex];
  //   const selectedOptionsForCurrentQuestion = selectedOptions[currentQuestionIndex];
  //   const correctOptionsForCurrentQuestion = currentQuestion.correctOption;
  
  //   let numCorrectOptions = 0;
  //   if (correctOptionsForCurrentQuestion instanceof Array && correctOptionsForCurrentQuestion.length > 0) {
  //     numCorrectOptions = correctOptionsForCurrentQuestion.filter(optionIndex =>
  //       selectedOptionsForCurrentQuestion.includes(optionIndex)
  //     ).length;
  //   } else if (selectedOptionsForCurrentQuestion === correctOptionsForCurrentQuestion) {
  //     numCorrectOptions = 1;
  //   }
    
  //   setScore(score + numCorrectOptions);
  
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   } 
  // };

  // const handleSubmitQuiz = () => {
  //   const currentQuestion = quiz.questions[currentQuestionIndex];
  //   const selectedOptionsForCurrentQuestion = selectedOptions[currentQuestionIndex];
  //   const correctOptionsForCurrentQuestion = currentQuestion.correctOption;
  
  //   const numCorrectOptions = correctOptionsForCurrentQuestion.filter(optionIndex =>
  //     selectedOptionsForCurrentQuestion.includes(optionIndex)
  //   ).length;
  
  //   setScore(score + numCorrectOptions);
  
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }

