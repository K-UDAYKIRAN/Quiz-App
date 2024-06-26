import React from 'react';
import styles from '../styles/Quiz.module.css';
import { QuestionType } from '../types/types.ts';

interface QuestionProps {
  question: QuestionType;
  handleAnswerOptionClick: (selectedOption: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, handleAnswerOptionClick }) => {
  return (
    <div className={styles.questionSection}>
      <div className={styles.questionText}>{question.question}</div>
      <div className={styles.answerSection}>
        {question.options.map((option) => (
          <button 
            key={option} 
            onClick={() => handleAnswerOptionClick(option)}
            className={styles.optionButton}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
