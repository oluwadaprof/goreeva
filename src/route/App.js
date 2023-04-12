import "../styles/App.css";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Quizz from "../pages/Quizz";
import Result from "../pages/Result";
import Error from "../pages/Error";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { QuizProvider } from "../contexts/QuizContext";
import CreateQuiz from "../pages/CreateQuiz";
import AnswerQuiz from "../pages/AnswerQuiz";
import QuizList from "../pages/QuizList";

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* PUBLIC ROUTE */}
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            {/* PRIVATE ROUTE */}
            <Route element={<PrivateRoute />}>
              <Route path="/quiz" element={<Quizz />} />
              <Route path="/quiz-list" element={<QuizList/>} />
              <Route path="/result" element={<Result />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/answer-quiz/:id" element={<AnswerQuiz />}>
              {/* <Route path="/:id" element={<AnswerQuiz />} /> */}
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
