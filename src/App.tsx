import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SlotGame from './components/SlotGame';
import LossCalculator from './components/LossCalculator';
import InteractiveQuiz from './components/InteractiveQuiz';
import AddictionSimulator from './components/AddictionSimulator';
import HelpDirectory from './components/HelpDirectory';
import RecoveryTools from './components/RecoveryTools';
import FinancialGuide from './components/FinancialGuide';
import GamificationDashboard from './components/GamificationDashboard';
import AboutPage from './components/AboutPage';
import ArticlesPage from './components/ArticlesPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'game' | 'calculator' | 'quiz' | 'addiction' | 'help' | 'recovery' | 'financial' | 'gamification' | 'about' | 'articles'>('landing');

  interface UserProgress {
    articlesRead: number;
    quizzesTaken: number;
    calculatorUsed: boolean;
    simulatorCompleted: boolean;
    readArticles: string[];
  }

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      articlesRead: 0,
      quizzesTaken: 0,
      calculatorUsed: false,
      simulatorCompleted: false,
      readArticles: []
    };
  });

  const updateProgress = (action: string, value?: number) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      
      switch (action) {
        case 'article_read':
          // Batasi maksimal 100 artikel untuk mencegah nilai yang tidak masuk akal
          newProgress.articlesRead = Math.min(newProgress.articlesRead + 1, 100);
          break;
        case 'articlesRead':
          // Untuk popup progress - bisa menambah atau mengurangi
          newProgress.articlesRead = Math.max(0, Math.min(value || 0, 100));
          break;
        case 'quiz_taken':
          // Batasi maksimal 50 quiz untuk mencegah nilai yang tidak masuk akal
          newProgress.quizzesTaken = Math.min(newProgress.quizzesTaken + 1, 50);
          break;
        case 'quizzesTaken':
          // Untuk popup progress - bisa menambah atau mengurangi
          newProgress.quizzesTaken = Math.max(0, Math.min(value || 0, 50));
          break;
        case 'calculator_used':
          newProgress.calculatorUsed = true;
          break;
        case 'calculatorUsed':
          // Untuk popup progress
          newProgress.calculatorUsed = value ? true : false;
          break;
        case 'simulator_completed':
          newProgress.simulatorCompleted = true;
          break;
        case 'simulatorCompleted':
          // Untuk popup progress
          newProgress.simulatorCompleted = value ? true : false;
          break;
      }
      
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {currentPage === 'landing' ? (
        <LandingPage 
          onStartGame={() => setCurrentPage('game')} 
          onNavigate={(page: string) => setCurrentPage(page as 'landing' | 'game' | 'calculator' | 'quiz' | 'addiction' | 'help' | 'recovery' | 'financial' | 'gamification' | 'about' | 'articles')}
          userProgress={userProgress}
        />
      ) : (
        <>
          {currentPage === 'game' && (
            <SlotGame onBackToLanding={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'calculator' && (
            <LossCalculator 
              onBack={() => setCurrentPage('landing')} 
              updateProgress={updateProgress}
            />
          )}
          {currentPage === 'quiz' && (
            <InteractiveQuiz 
              onBack={() => setCurrentPage('landing')} 
              updateProgress={updateProgress}
            />
          )}
          {currentPage === 'addiction' && (
            <AddictionSimulator 
              onBack={() => setCurrentPage('landing')} 
              updateProgress={updateProgress}
            />
          )}
          {currentPage === 'help' && (
            <HelpDirectory onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'recovery' && (
            <RecoveryTools onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'financial' && (
            <FinancialGuide onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'gamification' && (
            <GamificationDashboard 
              onBack={() => setCurrentPage('landing')} 
              userProgress={userProgress}
            />
          )}
          {currentPage === 'about' && (
            <AboutPage onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'articles' && (
            <ArticlesPage 
              onBack={() => setCurrentPage('landing')} 
              onArticleRead={(articleId: string) => {
                if (!userProgress.readArticles?.includes(articleId)) {
                  updateProgress('article_read');
                  setUserProgress(prev => {
                    const newProgress = {
                      ...prev,
                      readArticles: [...(prev.readArticles || []), articleId]
                    };
                    localStorage.setItem('userProgress', JSON.stringify(newProgress));
                    return newProgress;
                  });
                }
              }}
              readArticles={userProgress.readArticles || []}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;