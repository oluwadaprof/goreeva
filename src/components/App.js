import "../styles/App.css";
import Layout from "./Layout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Quizz from "../pages/Quizz";
import Result from "../pages/Result";
import Error from '../pages/Error'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/signup" element={<Signup />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/quizz" element={<Quizz />} />
        <Route  path="/result" element={<Result />} />
        <Route  path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
