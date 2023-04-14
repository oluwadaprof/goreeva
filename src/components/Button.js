import classes from '../styles/Button.module.css'

export default function Button({children, className, onClick}) {
  return (
    <button onClick={onClick} className={`${classes.button} ${className}`}>
      {children}
    </button>
  ); 
}
