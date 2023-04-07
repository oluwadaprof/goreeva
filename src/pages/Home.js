import QuizICon from '../assets/images/5210980.jpg'
import classes from '../styles/Home.module.css'
import Button from '../components/Button'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={classes.home}>
      <img src={QuizICon} alt="Quiz Icon" className={classes.icon}/>
      <h2>It's Quiz Time</h2>
      <p>Lets get started...</p>
      <Button className={classes.quiz_btn} >
       <Link to='/create-quiz'> Create Quiz</Link>
      </Button>
    </div>
  );
}
