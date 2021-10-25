import React, { useState, useEffect } from "react";

import { Questionaire} from './components';

//api de trivia
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => { 
        const questions = data.results.map((question) => ({
          ...question,
          answers:[
            question.correct_answer,
            ...question.incorrect_answers
          ].sort(()=>Math.random() - 0.5)//respuestas random
        }))

        setQuestions(questions);
      });//corregir shuffle luego de hacer click en la respuesta
  }, []);

  const handleAnswer = (answer) =>{
    

    if(!showAnswers)//prevenir preguntas dobles
    {if(answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);//ganar puntos
    };}

    setShowAnswers(true); //mostrar respuestas

  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);//para ir a la siguiente pregunta
  }

  return  questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (
    <h1 className="text-3xl text-white font-bold">Your score is {score}</h1>
    ) : (
      <Questionaire data={questions[currentIndex]}
      showAnswers={showAnswers}
      handleNextQuestion={handleNextQuestion}
      handleAnswer={handleAnswer} />
  )}
      </div> 
    ) : (
    <h2 className="text-2x1 text-white font-bold">Loading...</h2>
  ); //pantalla de carga mientras no este cargado el parentesis anterior
}

export default App;
