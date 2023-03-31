import classes from "../styles/Videos.module.css";
import Video from "../components/Video";
import { Link } from "react-router-dom";

export default function Videos() {
  return (
    <div className={classes.videos}>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
      <Link to="quizz">
        <Video />
      </Link>
    </div>
  );
}
