import React from 'react';
import { ArrowLeft, Trophy, Star, BookOpen, Brain, Calculator, AlertTriangle } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface GamificationDashboardProps {
  onBack: () => void;
  userProgress: {
    articlesRead: number;
    quizzesTaken: number;
    calculatorUsed: boolean;
    simulatorCompleted: boolean;
    readArticles: string[];
  };
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({
  onBack,
  userProgress
}) => {

  const achievements = [
    {
      title: 'Artikel Dibaca',
      current: Math.min(userProgress.articlesRead, 100),
      target: 5,
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      color: 'bg-blue-600'
    },
    {
      title: 'Quiz Diselesaikan',
      current: Math.min(userProgress.quizzesTaken, 50),
      target: 3,
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      color: 'bg-purple-600'
    },
    {
      title: 'Tools Digunakan',
      current: Math.min((userProgress.calculatorUsed ? 1 : 0) + (userProgress.simulatorCompleted ? 1 : 0), 10),
      target: 2,
      icon: <Calculator className="w-6 h-6 text-green-400" />,
      color: 'bg-green-600'
    },
    {
      title: 'Simulator Selesai',
      current: userProgress.simulatorCompleted ? 1 : 0,
      target: 1,
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
      color: 'bg-orange-600'
    }
  ];

  const totalProgress = () => {
    const maxPoints = 100;
    let currentPoints = 0;
    
    const validArticlesRead = Math.min(userProgress.articlesRead, 100);
    const validQuizzesTaken = Math.min(userProgress.quizzesTaken, 50);
    
    currentPoints += Math.min(validArticlesRead * 10, 50);
    currentPoints += Math.min(validQuizzesTaken * 15, 45);
    currentPoints += userProgress.calculatorUsed ? 20 : 0;
    currentPoints += userProgress.simulatorCompleted ? 25 : 0;
    
    return Math.min(currentPoints, maxPoints);
  };

  const getLevel = (points: number) => {
    if (points >= 90) return { level: 5, title: 'Master', color: 'text-purple-400' };
    if (points >= 70) return { level: 4, title: 'Expert', color: 'text-blue-400' };
    if (points >= 50) return { level: 3, title: 'Intermediate', color: 'text-green-400' };
    if (points >= 30) return { level: 2, title: 'Beginner', color: 'text-yellow-400' };
    return { level: 1, title: 'Newbie', color: 'text-gray-400' };
  };



  const currentLevel = getLevel(totalProgress());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            playClickSound();
            onBack();
          }}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      {/* Progress Overview */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-bold">Level {currentLevel.level}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Progress */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{totalProgress()}%</div>
            <div className="text-gray-400">Total Progress</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${totalProgress()}%` }}
              ></div>
            </div>
          </div>
          
          {/* Level */}
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${currentLevel.color}`}>{currentLevel.title}</div>
            <div className="text-gray-400">Level Saat Ini</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < currentLevel.level ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                />
              ))}
            </div>
          </div>
          
          {/* Points */}
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{totalProgress()}</div>
            <div className="text-gray-400">Total Points</div>
            <div className="text-sm text-gray-500 mt-2">dari 100 points</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {achievement.icon}
                <div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {achievement.current}/{achievement.target} selesai
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">{achievement.current}/{achievement.target}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`${achievement.color} h-2 rounded-full transition-all`}
                style={{ width: `${Math.min((achievement.current / achievement.target) * 100, 100)}%` }}
              ></div>
            </div>
            
            {achievement.current >= achievement.target && (
              <div className="mt-3 flex items-center gap-2 text-green-400">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Achievement Unlocked!</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default GamificationDashboard;