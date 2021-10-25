import React from "react";

const Questionaire = ({ showAnswers, handleAnswer,handleNextQuestion, data: {question, correct_answer, answers },
}) => {

    return (
    <div className="m-4 flex flex-col">
        <div className="bg-white text-black p-8 rounded-lg shadow-md mt-8">
            <h2
            className="text-2xl text-center"
            dangerouslySetInnerHTML={{ __html: question }}//fix problema en el texto
            />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
            {answers.map((answer,idx) =>{
                const bgColor = showAnswers
                ? answer === correct_answer 
                    ? 'bg-green-300' 
                    :'bg-red-300'
                :'bg-white';
                return (
                <button 
                    key={idx}
                    className={`${bgColor} p-4 text-black font-semibold rounded shadow`}
                    onClick ={() => handleAnswer(answer)}dangerouslySetInnerHTML={{ __html: answer }}
                    />//fix problema en el texto
            );
            })}
            
        </div>
        {showAnswers && (
            <button 
            onClick={handleNextQuestion}
            className={`ml-auto bg-purple-500 p-4 text-white font-semibold rounded shadow mt-6 mr-5`}>Next Question</button>
        )}
        
    </div>
)};


export default Questionaire;
