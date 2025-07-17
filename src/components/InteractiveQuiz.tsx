import React, { useState } from 'react';
import { ArrowLeft, Brain, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { playClickSound, playSuccessSound, playWarningSound } from '../utils/soundEffects';

interface InteractiveQuizProps {
  onBack: () => void;
  updateProgress: (action: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onBack, updateProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Apa itu House Edge dalam judi online?",
      options: [
        "Keuntungan pemain terhadap kasino",
        "Keuntungan matematika kasino terhadap pemain",
        "Bonus yang diberikan kasino",
        "Strategi untuk menang"
      ],
      correct: 1,
      explanation: "House Edge adalah keuntungan matematika yang selalu dimiliki kasino. Ini memastikan kasino selalu untung dalam jangka panjang."
    },
    {
      id: 2,
      question: "Berapa persen pemain judi online yang mengalami kerugian?",
      options: ["50%", "70%", "85%", "99%"],
      correct: 3,
      explanation: "Statistik menunjukkan 99% pemain judi online mengalami kerugian karena sistem dirancang untuk menguntungkan bandar."
    },
    {
      id: 3,
      question: "Apa yang dimaksud dengan 'Chasing Losses'?",
      options: [
        "Strategi menang yang efektif",
        "Mencoba mengembalikan uang yang hilang dengan taruhan lebih besar",
        "Teknik bermain yang aman",
        "Bonus dari kasino"
      ],
      correct: 1,
      explanation: "Chasing Losses adalah perilaku berbahaya dimana pemain mencoba mengembalikan kerugian dengan taruhan lebih besar, yang justru memperbesar kerugian."
    },
    {
      id: 4,
      question: "Mengapa judi online lebih berbahaya dari judi konvensional?",
      options: [
        "Lebih mudah menang",
        "Akses 24/7 dan tanpa pengawasan sosial",
        "Lebih aman",
        "Bonus lebih besar"
      ],
      correct: 1,
      explanation: "Judi online lebih berbahaya karena tersedia 24/7, mudah diakses, tanpa pengawasan sosial, dan menggunakan psikologi reward yang manipulatif."
    },
    {
      id: 5,
      question: "Apa dampak jangka panjang dari kecanduan judi?",
      options: [
        "Kekayaan bertambah",
        "Kehancuran finansial, masalah keluarga, dan gangguan mental",
        "Skill matematika meningkat",
        "Networking bertambah"
      ],
      correct: 1,
      explanation: "Kecanduan judi menyebabkan kehancuran finansial, kerusakan hubungan keluarga, depresi, anxiety, dan berbagai masalah kesehatan mental."
    },
    {
      id: 6,
      question: "Apakah ada strategi yang bisa mengalahkan house edge?",
      options: [
        "Ya, dengan sistem martingale",
        "Ya, dengan analisis pola",
        "Tidak, house edge tidak bisa dikalahkan",
        "Ya, dengan modal besar"
      ],
      correct: 2,
      explanation: "Tidak ada strategi yang bisa mengalahkan house edge. Semua sistem taruhan pada akhirnya akan kalah karena matematika selalu menguntungkan kasino."
    },
    {
      id: 7,
      question: "Apa yang harus dilakukan jika mengalami masalah judi?",
      options: [
        "Bermain lebih sering untuk mengembalikan modal",
        "Mencari bantuan profesional dan support group",
        "Pinjam uang untuk modal lebih besar",
        "Ganti jenis permainan"
      ],
      correct: 1,
      explanation: "Jika mengalami masalah judi, segera cari bantuan profesional seperti psikolog, konselor, atau bergabung dengan support group."
    },
    {
      id: 8,
      question: "Mengapa judi online ilegal di Indonesia?",
      options: [
        "Karena pemerintah ingin monopoli",
        "Untuk melindungi masyarakat dari kerugian finansial dan sosial",
        "Karena teknologi belum siap",
        "Karena pajak terlalu kecil"
      ],
      correct: 1,
      explanation: "Judi online ilegal di Indonesia untuk melindungi masyarakat dari dampak negatif seperti kerugian finansial, kerusakan keluarga, dan masalah sosial."
    }
  ];

  // Hapus useEffect yang salah ini
  // useEffect(() => {
  //   updateProgress('quiz_taken');
  // }, [updateProgress]);

  const handleAnswerSelect = (answerIndex: number) => {
    playClickSound();
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
      playSuccessSound();
    } else {
      playWarningSound();
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        updateProgress('quiz_taken');
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! Anda sangat memahami bahaya judi online", color: "text-green-400" };
    if (percentage >= 60) return { message: "Good! Pengetahuan Anda cukup baik", color: "text-yellow-400" };
    return { message: "Perlu belajar lebih banyak tentang bahaya judi online", color: "text-red-400" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black bg-opacity-50 rounded-lg p-8 border border-gray-700 text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Selesai!</h2>
            <div className="text-6xl font-bold text-white mb-4">
              {score}/{questions.length}
            </div>
            <p className={`text-xl mb-6 ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-bold mb-2">Ringkasan Jawaban</h3>
              <div className="grid grid-cols-4 gap-2">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-center ${
                      answer === questions[index].correct
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={resetQuiz}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Ulangi Quiz</span>
              </button>
              
              <button
                onClick={onBack}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali ke Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Interaktif</h1>
            <p className="text-purple-300">Tes pengetahuan Anda tentang bahaya judi online</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
            <span className="text-purple-400">
              Skor: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
          <div className="flex items-start space-x-4 mb-6">
            <Brain className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <h2 className="text-xl font-bold text-white">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-600 border-green-400 text-white'
                        : 'bg-red-600 border-red-400 text-white'
                      : 'bg-purple-600 border-purple-400 text-white'
                    : showResult && index === questions[currentQuestion].correct
                    ? 'bg-green-600 border-green-400 text-white'
                    : 'bg-gray-800 border-gray-600 text-white hover:border-purple-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && (
                    <div className="ml-auto">
                      {index === questions[currentQuestion].correct ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="w-6 h-6 text-red-400" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-600 mb-6">
              <h3 className="text-blue-400 font-bold mb-2">Penjelasan:</h3>
              <p className="text-white">{questions[currentQuestion].explanation}</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className={`px-8 py-3 rounded-lg font-bold transition-colors ${
                selectedAnswer === null || showResult
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Selesai' : 'Lanjut'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;