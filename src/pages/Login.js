import Form from "../components/Form";
import Illustration from "../components/Illustration";
import classes from "../styles/Login.module.css";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration />
        <Form className={`${classes.login} form`}>
          <TextInput
            type="email"
            placeholder="Enter Email"
            icon="alternate_email"
          />
          <TextInput type="password" placeholder="Enter Password" icon="lock" />
          <Button><span>Submit Now</span></Button>
          <div className="info">
            Don't have an account? <a href="login.html">Sign Up</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
