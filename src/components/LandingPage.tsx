import React from 'react';
import { AlertTriangle, TrendingDown, Clock, Users, DollarSign, Calculator, Brain, Heart, HelpCircle, Trophy, Info, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStartGame: () => void;
  onNavigate: (page: string) => void;
  userProgress: {
    articlesRead: number;
    quizzesTaken: number;
    calculatorUsed: boolean;
    simulatorCompleted: boolean;
  };
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartGame, onNavigate, userProgress }) => {
  const dangers = [
    {
      icon: <TrendingDown className="w-8 h-8 text-red-400" />,
      title: "Kerugian Finansial",
      description: "99% pemain judi online mengalami kerugian besar. Sistem dirancang agar bandar selalu menang."
    },
    {
      icon: <Clock className="w-8 h-8 text-red-400" />,
      title: "Kecanduan",
      description: "Judi online mudah membuat kecanduan karena aksesnya yang mudah dan reward system yang manipulatif."
    },
    {
      icon: <Users className="w-8 h-8 text-red-400" />,
      title: "Masalah Keluarga",
      description: "Kecanduan judi dapat merusak hubungan keluarga dan menyebabkan perceraian serta masalah sosial."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-400" />,
      title: "Hutang Berlipat",
      description: "Banyak penjudi yang terjerat hutang karena terus mencoba 'mengembalikan' uang yang hilang."
    }
  ];

  const statistics = [
    { number: "85%", label: "Pemain mengalami kerugian" },
    { number: "3x", label: "Lebih mudah kecanduan" },
    { number: "70%", label: "Menyebabkan masalah keluarga" },
    { number: "2.5%", label: "House edge minimum" }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
      title: "Artikel Edukatif",
      description: "Baca artikel informatif tentang bahaya judi online",
      action: () => onNavigate('articles'),
      disabled: false
    },
    {
      icon: <Calculator className="w-8 h-8 text-blue-400" />,
      title: "Kalkulator Kerugian",
      description: "Hitung berapa uang yang akan hilang jika terus berjudi",
      action: () => onNavigate('calculator'),
      disabled: false
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Quiz Interaktif",
      description: "Tes pengetahuan Anda tentang bahaya judi online",
      action: () => onNavigate('quiz'),
      disabled: false
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-orange-400" />,
      title: "Simulator Kecanduan",
      description: "Lihat bagaimana kecanduan judi berkembang",
      action: () => onNavigate('addiction'),
      disabled: false
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-green-400" />,
      title: "Direktori Bantuan",
      description: "Temukan bantuan profesional dan support group",
      action: undefined,
      disabled: true
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: "Tools Pemulihan",
      description: "Alat bantu untuk pulih dari kecanduan judi",
      action: () => onNavigate('recovery'),
      disabled: false
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
      title: "Panduan Finansial",
      description: "Cara mengelola keuangan setelah rugi judi",
      action: () => onNavigate('financial'),
      disabled: false
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">


        {/* Progress Bar */}
        <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6 border border-green-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold">Progress Edukasi</span>
            <button
              onClick={() => onNavigate('gamification')}
              className="flex items-center space-x-2 text-green-400 hover:text-green-300"
            >
              <Trophy className="w-5 h-5" />
              <span>Lihat Dashboard</span>
            </button>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (userProgress.articlesRead + userProgress.quizzesTaken) * 10)}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>Artikel: {userProgress.articlesRead}</span>
            <span>Quiz: {userProgress.quizzesTaken}</span>
            <span>Tools: {(userProgress.calculatorUsed ? 1 : 0) + (userProgress.simulatorCompleted ? 1 : 0)}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            JackStop
          </h1>
          <p className="text-xl md:text-2xl text-red-200 max-w-2xl mx-auto">
            Platform edukatif yang menunjukkan mengapa judi online berbahaya dan selalu merugikan
          </p>
        </div>

        {/* Main dan Buktikan Button - Below JackStop */}
        <div className="text-center mb-8">
          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 px-12 rounded-xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-red-400 animate-pulse"
          >
            🎰 Main dan Buktikan
          </button>
          <p className="text-red-200 mt-3 text-lg">
            Coba simulasi untuk melihat mengapa judi selalu merugikan
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-600 border-2 border-red-400 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">PERINGATAN KERAS</h2>
          </div>
          <p className="text-white text-center text-lg">
            Judi online adalah aktivitas ilegal di Indonesia dan sangat berbahaya. 
            Simulasi di bawah ini dibuat untuk tujuan edukatif agar Anda memahami 
            mengapa judi selalu merugikan.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-black bg-opacity-50 rounded-lg p-6 text-center border border-red-800">
              <div className="text-3xl font-bold text-red-400 mb-2">{stat.number}</div>
              <div className="text-white text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Dangers Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {dangers.map((danger, index) => (
            <div key={index} className="bg-black bg-opacity-50 rounded-lg p-6 border border-red-800 hover:border-red-600 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-red-900 rounded-lg">
                  {danger.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{danger.title}</h3>
                  <p className="text-red-200">{danger.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Content */}
        <div className="bg-black bg-opacity-50 rounded-lg p-8 mb-8 border border-red-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Mengapa Judi Online Selalu Merugikan?
          </h2>
          <div className="space-y-4 text-red-200">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <p><strong className="text-white">House Edge:</strong> Setiap permainan memiliki keuntungan built-in untuk bandar (biasanya 2-15%)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <p><strong className="text-white">Algoritma Manipulatif:</strong> Sistem dirancang untuk memberi kemenangan kecil di awal, lalu kerugian besar</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <p><strong className="text-white">Psikologi Reward:</strong> Kemenangan sesekali membuat otak melepaskan dopamin, menciptakan kecanduan</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <p><strong className="text-white">Akses 24/7:</strong> Tersedia kapan saja, membuat sulit untuk berhenti</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={feature.disabled ? undefined : feature.action}
              className={`bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700 transition-all text-left ${feature.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-600 hover:scale-105'}`}
              disabled={feature.disabled}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-gray-800 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                  {feature.disabled && (
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">Coming Soon</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo Button */}
        <div className="text-center mb-8">
          <div className="bg-yellow-600 rounded-lg p-6 mb-6 border-2 border-yellow-400">
            <h3 className="text-2xl font-bold text-black mb-2">Simulasi Edukatif</h3>
            <p className="text-black">
              Coba simulasi di bawah ini untuk melihat bagaimana sistem judi dirancang agar Anda selalu kalah.
              <br />
              <strong>Ingat: Ini hanya untuk edukasi, bukan untuk bermain sungguhan!</strong>
            </p>
          </div>
          
          <button
            onClick={onStartGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg border-2 border-red-400"
          >
            Lihat Simulasi Bahaya Judi
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-red-800">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center space-x-2 mx-auto mb-4 text-blue-400 hover:text-blue-300"
          >
            <Info className="w-5 h-5" />
            <span>Tentang JackStop</span>
          </button>
          <p className="text-red-200 mb-2">
            Jika Anda atau orang terdekat mengalami masalah judi, segera cari bantuan profesional
          </p>
          <p className="text-red-400 text-sm">
            JackStop dibuat untuk tujuan edukatif dan pencegahan
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;