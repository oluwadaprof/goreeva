import Answers from '../components/Answers'
import ProgressBar from '../components/ProgressBar'



export default function Quizz() {
  return (
    <>
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers/>
      <ProgressBar/>
      {/* <MiniPlayer/> */}
    </>
  );
}
