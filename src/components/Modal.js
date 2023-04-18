import React from "react";
import classes from "../styles/Modal.module.css";

const Modal = ({ score, onClose, quizlength }) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h2>Your Score</h2>
        <p>{score}/{quizlength}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
