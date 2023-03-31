import classes from '../styles/Signup.module.css'
import Form from '../components/Form'
import Illustration from '../components/Illustration'


export default function Signup(){
return(
    <>
      <h1>Create an Account</h1>  
      <div className="column">
        <Illustration/>
        <Form className={`${classes.signup} form`}/>
      </div>
    </>
)
}