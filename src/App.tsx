import React from 'react';
import Quiz from './components/Quiz.tsx';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>Quiz App</h1>
      <Quiz />
    </div>
  );
};

export default App;
