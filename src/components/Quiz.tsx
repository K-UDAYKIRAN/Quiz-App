import React, { useState } from 'react';
import styles from '../styles/Quiz.module.css';
import { QuestionType } from '../types/types.ts';
import Question from './Question.tsx';

const questions: QuestionType[] = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
  { question: 'What is the color of the sky?', options: ['Blue', 'Green', 'Red', 'Yellow'], answer: 'Blue' },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className={styles.quiz}>
      {showScore ? (
        <div className={styles.scoreSection}>You scored {score} out of {questions.length}</div>
      ) : (
        <Question 
          question={questions[currentQuestion]} 
          handleAnswerOptionClick={handleAnswerOptionClick} 
        />
      )}
    </div>
  );
};

export default Quiz;
