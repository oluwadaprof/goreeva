import classes from "../styles/QuizList.module.css";
// import React, { useState, useEffect } from "react";
// import { getFirestore } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useQuizContext } from "../contexts/QuizContext";

export default function QuizList() {

const {quizList} = useQuizContext()
 

  if (!quizList) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.quizlist_container}>
      <h3>Quiz Page</h3>
      <p className={classes.description}>
        Pick any quiz of your choice to get started...
      </p>
      {!quizList ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.wrap_quizbox}>
          {quizList.map((list) => (
            <Link to={`/answer-quiz/:${list.id}`}>
              <div key={list.id} className={classes.quizbox}>
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
    </div>
  );
}
