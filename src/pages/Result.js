import Summary from '../components/Summary'
import Analysis from '../components/Analysis'
import { useParams } from 'react-router-dom';

export default function Result() {
  const {id} = useParams()
 
  const separatedStr = id.split('-');
  const score = separatedStr[0]
  const totalScore = separatedStr[1]
  console.log(separatedStr[0]); // Output: "3"
  console.log(separatedStr[1]); 
  return (
   <>
   <Summary score={score} totalScore={totalScore} />
   {/* <Analysis/> */}
   </>
  );
}
