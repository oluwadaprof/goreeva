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

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/quiz" element={<Quizz />} />
            <Route path="/result" element={<Result />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
