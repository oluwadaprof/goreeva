import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Form from "../components/Form";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/create-quiz");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to Login!");
    }
  }

  return (
    <Form
      className={` form`}
      style={{ height: "330px" }}
      onSubmit={ handleSubmit }
    >
      <TextInput
        type="email"
        placeholder="Enter Email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter Password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <Link href="login.html">Sign Up</Link> instead.
      </div>
    </Form>
  );
}
