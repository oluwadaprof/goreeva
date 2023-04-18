import classes from '../styles/Summary.module.css'
import successIcon from '../assets/images/success.png'

export default function Summary({score, totalScore}) {
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />{score} out of {totalScore}
        </p>
      </div>

      <div className={classes.badge}>
        <img src={successIcon} alt="Success" />
      </div>
    </div>
  );
}
