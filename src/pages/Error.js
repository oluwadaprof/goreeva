import errorImage from '../assets/images/error.jpg'
import Button from '../components/Button'
import classes from '../styles/Error.module.css'
import { Link } from 'react-router-dom'
export default function Error(){
    return(
        <div className={classes.error}>
            <img src={errorImage} alt="Error_Image" className={classes.error_img}/>
            <Button><Link to="/" className={classes.link}  >Go to homepage</Link></Button>
        
        </div>
    )
}