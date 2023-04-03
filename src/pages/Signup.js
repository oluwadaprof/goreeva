import SignupForm from "../components/SignupForm";
import Illustration from "../components/Illustration";

export default function Signup() {
  return (
    <>
      <h1>Create an Account</h1>
      <div className="column">
        <Illustration />
        <SignupForm />
      </div>
    </>
  );
}
