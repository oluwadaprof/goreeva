import classes from "../styles/QuizList.module.css";
import { Link } from "react-router-dom";
import { useQuizContext } from "../contexts/QuizContext";
import Button from "../components/Button";

export default function QuizList() {
  const { quizList, isLoading, setIsLoading } = useQuizContext();

  if (quizList.length === 0) {
    setIsLoading(false);
    return (
      <div className={classes.quizlist_container}>
        <h3>Quiz Page</h3>
        <p className={classes.description}>
          Pick any quiz of your choice to get started...
        </p>
        QuizList is Empty <br/>
        <span>Create Quiz to get started...</span>
        <Link className={classes.quizbtn} to="/create-quiz">
          <Button>Create Quiz</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.quizlist_container}>
      <h3>Quiz Page</h3>
      <p className={classes.description}>
        Pick any quiz of your choice to get started...
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.wrap_quizbox}>
          {quizList.map((list) => (
            <Link key={list.id} to={`/answer-quiz/:${list.id}`}>
              <div className={classes.quizbox}>
                <h1>{list.name}</h1>
                <p className={classes.span}>{list.description}</p>
                <div className={classes.group_data}>
                  <div className={classes.group_point}>
                    <p>Points: {list.points}</p>
                  </div>
                  <div className={classes.group_time}>
                    <p>Time Limit: {list.timeLimit}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Link className={classes.quizbtn} to="/create-quiz">
        <Button>Create Quiz</Button>
      </Link>
    </div>
  );
}
