import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, TrendingDown, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { playClickSound, playWarningSound } from '../utils/soundEffects';

interface AddictionSimulatorProps {
  onBack: () => void;
  updateProgress: (action: string) => void;
}

interface SimulationState {
  day: number;
  balance: number;
  initialBalance: number;
  dailyLoss: number;
  timeSpent: number;
  stressLevel: number;
  familyRelation: number;
  workPerformance: number;
  mentalHealth: number;
  events: string[];
}

const AddictionSimulator: React.FC<AddictionSimulatorProps> = ({ onBack, updateProgress }) => {
  const [simulation, setSimulation] = useState<SimulationState>({
    day: 1,
    balance: 10000000, // 10 juta
    initialBalance: 10000000,
    dailyLoss: 100000, // 100rb per hari awal
    timeSpent: 1, // jam per hari
    stressLevel: 0,
    familyRelation: 100,
    workPerformance: 100,
    mentalHealth: 100,
    events: []
  });

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per day

  const simulateDay = () => {
    setSimulation(prev => {
      const newState = { ...prev };
      
      // Increase addiction over time
      const addictionFactor = Math.min(2, 1 + (prev.day * 0.02));
      
      // Calculate daily loss (increases with addiction)
      const todayLoss = prev.dailyLoss * addictionFactor;
      newState.balance = Math.max(0, prev.balance - todayLoss);
      newState.dailyLoss = todayLoss;
      
      // Time spent gambling increases
      newState.timeSpent = Math.round(Math.min(16, prev.timeSpent * 1.05) * 10) / 10;
      
      // Deteriorating conditions
      newState.stressLevel = Math.round(Math.min(100, prev.stressLevel + 2));
      newState.familyRelation = Math.round(Math.max(0, prev.familyRelation - 1.5));
      newState.workPerformance = Math.round(Math.max(0, prev.workPerformance - 1));
      newState.mentalHealth = Math.round(Math.max(0, prev.mentalHealth - 1.2));
      
      // Events based on conditions
      const events = [...prev.events];
      
      if (prev.day === 7 && events.length === 0) {
        events.push("Mulai berbohong kepada keluarga tentang uang yang hilang");
      }
      
      if (prev.day === 14) {
        events.push("Performa kerja menurun, sering terlambat karena begadang judi");
      }
      
      if (prev.day === 21) {
        events.push("Mulai meminjam uang dari teman untuk modal judi");
      }
      
      if (prev.day === 30) {
        events.push("Pertengkaran dengan pasangan tentang masalah keuangan");
      }
      
      if (prev.day === 45) {
        events.push("Menggunakan kartu kredit untuk judi online");
      }
      
      if (prev.day === 60) {
        events.push("Kehilangan pekerjaan karena performa buruk");
      }
      
      if (prev.balance <= prev.initialBalance * 0.1 && !events.includes("Kehilangan 90% tabungan")) {
        events.push("Kehilangan 90% tabungan");
      }
      
      if (newState.familyRelation <= 20 && !events.includes("Keluarga mulai menjauh")) {
        events.push("Keluarga mulai menjauh");
      }
      
      newState.events = events;
      newState.day = prev.day + 1;
      
      return newState;
    });
  };

  const startSimulation = () => {
    playClickSound();
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setSimulation({
      day: 1,
      balance: 10000000,
      initialBalance: 10000000,
      dailyLoss: 100000,
      timeSpent: 1,
      stressLevel: 0,
      familyRelation: 100,
      workPerformance: 100,
      mentalHealth: 100,
      events: []
    });
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning && simulation.day <= 365) {
      interval = setInterval(() => {
        simulateDay();
        if (simulation.balance <= 0 || simulation.day >= 365) {
          setIsRunning(false);
          playWarningSound();
          updateProgress('simulator_completed');
        }
      }, speed);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, speed, simulation.day, simulation.balance, updateProgress]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStressBg = (value: number) => {
    if (value >= 70) return 'bg-red-600';
    if (value >= 40) return 'bg-yellow-600';
    return 'bg-green-600';
  };
  const getPositiveBg = (value: number) => {
    if (value >= 70) return 'bg-green-600';
    if (value >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 text-center sm:text-left space-y-2 sm:space-y-0">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg transition-colors mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm md:text-base">Kembali</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Simulator Kecanduan Judi</h1>
            <p className="text-orange-300 text-sm md:text-base">Lihat bagaimana kecanduan judi berkembang dari hari ke hari</p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-600 rounded-lg p-3 md:p-4 mb-4 md:mb-6 border-2 border-red-400">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white mb-2 sm:mb-0" />
            <div>
              <h3 className="text-white font-bold text-base md:text-lg">Simulasi Berdasarkan Data Nyata</h3>
              <p className="text-white text-xs md:text-base">Simulator ini menunjukkan pola kecanduan judi yang dialami jutaan orang di dunia</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={isRunning ? stopSimulation : startSimulation}
                className={`w-full sm:w-auto px-4 md:px-6 py-2 rounded-lg font-bold transition-colors text-sm md:text-base ${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? 'Stop' : 'Mulai Simulasi'}
              </button>
              <button
                onClick={resetSimulation}
                className="w-full sm:w-auto px-4 md:px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors text-sm md:text-base"
              >
                Reset
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <span className="text-white text-sm md:text-base">Kecepatan:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-700 text-white px-2 md:px-3 py-1 rounded text-sm md:text-base"
              >
                <option value={2000}>Lambat</option>
                <option value={1000}>Normal</option>
                <option value={500}>Cepat</option>
                <option value={100}>Sangat Cepat</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Status Panel */}
          <div className="space-y-4 md:space-y-6">
            {/* Day Counter */}
            <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 border border-gray-700">
              <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-4">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                <h2 className="text-lg md:text-2xl font-bold text-white">Hari ke-{simulation.day}</h2>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                Waktu judi hari ini: <span className="text-red-400 font-bold">{Math.round(simulation.timeSpent)} jam</span>
              </p>
            </div>

            {/* Financial Status */}
            <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 border border-gray-700">
              <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-4">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                <h2 className="text-lg md:text-2xl font-bold text-white">Saldo: {formatCurrency(simulation.balance)}</h2>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                Kerugian hari ini: <span className="text-red-400 font-bold">{formatCurrency(simulation.dailyLoss)}</span>
              </p>
              {/* Saldo Bar Chart */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-2">
                  <span>Saldo Saat Ini</span>
                  <span>{Math.round((simulation.balance / simulation.initialBalance) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 md:h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-3 md:h-4 rounded-full transition-all duration-500 flex items-center justify-center"
                    style={{ 
                      width: `${Math.max(0, Math.min(100, (simulation.balance / simulation.initialBalance) * 100))}%` 
                    }}
                  >
                    {simulation.balance > 0 && (
                      <span className="text-white text-xs font-bold px-2">
                        {formatCurrency(simulation.balance)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Rp 0</span>
                  <span>{formatCurrency(simulation.initialBalance)}</span>
                </div>
              </div>
            </div>

            {/* Health Status */}
            <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 border border-gray-700">
              <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-4">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                <h2 className="text-lg md:text-2xl font-bold text-white">Kesehatan Mental</h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                {/* Stres Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-1">
                    <span>Stres</span>
                    <span>{simulation.stressLevel}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                    <div 
                      className={`h-2 md:h-3 rounded-full transition-all duration-500 ${getStressBg(simulation.stressLevel)}`}
                      style={{ width: `${simulation.stressLevel}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Mental Health Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-1">
                    <span>Mental</span>
                    <span>{simulation.mentalHealth}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                    <div 
                      className={`h-2 md:h-3 rounded-full transition-all duration-500 ${getPositiveBg(simulation.mentalHealth)}`}
                      style={{ width: `${simulation.mentalHealth}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Family Relation Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-1">
                    <span>Keluarga</span>
                    <span>{simulation.familyRelation}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                    <div 
                      className={`h-2 md:h-3 rounded-full transition-all duration-500 ${getPositiveBg(simulation.familyRelation)}`}
                      style={{ width: `${simulation.familyRelation}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Work Performance Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-300 mb-1">
                    <span>Kerja</span>
                    <span>{simulation.workPerformance}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                    <div 
                      className={`h-2 md:h-3 rounded-full transition-all duration-500 ${getPositiveBg(simulation.workPerformance)}`}
                      style={{ width: `${simulation.workPerformance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event List */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 border border-gray-700 flex flex-col">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-4">
              <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              <h2 className="text-lg md:text-2xl font-bold text-white">Peristiwa Penting</h2>
            </div>
            {simulation.events.length === 0 ? (
              <div className="text-gray-400 text-sm md:text-base text-center mt-4">Belum ada peristiwa besar</div>
            ) : (
              <ul className="list-disc pl-5 space-y-1 md:space-y-2 text-sm md:text-base">
                {simulation.events.map((event, idx) => (
                  <li key={idx} className="text-white">{event}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddictionSimulator;