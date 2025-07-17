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
    stressLevel: 20,
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
      newState.timeSpent = Math.min(16, prev.timeSpent * 1.05);
      
      // Deteriorating conditions
      newState.stressLevel = Math.min(100, prev.stressLevel + 2);
      newState.familyRelation = Math.max(0, prev.familyRelation - 1.5);
      newState.workPerformance = Math.max(0, prev.workPerformance - 1);
      newState.mentalHealth = Math.max(0, prev.mentalHealth - 1.2);
      
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
      stressLevel: 20,
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

  const getHealthColor = (value: number) => {
    if (value >= 70) return 'text-green-400';
    if (value >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBg = (value: number) => {
    if (value >= 70) return 'bg-green-600';
    if (value >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-white mb-2">Simulator Kecanduan Judi</h1>
            <p className="text-orange-300">Lihat bagaimana kecanduan judi berkembang dari hari ke hari</p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-600 rounded-lg p-4 mb-6 border-2 border-red-400">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-white font-bold text-lg">Simulasi Berdasarkan Data Nyata</h3>
              <p className="text-white">Simulator ini menunjukkan pola kecanduan judi yang dialami jutaan orang di dunia</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={isRunning ? stopSimulation : startSimulation}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? 'Stop' : 'Mulai Simulasi'}
              </button>
              
              <button
                onClick={resetSimulation}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
              >
                Reset
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white">Kecepatan:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                <option value={2000}>Lambat</option>
                <option value={1000}>Normal</option>
                <option value={500}>Cepat</option>
                <option value={100}>Sangat Cepat</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Status Panel */}
          <div className="space-y-6">
            {/* Day Counter */}
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Hari ke-{simulation.day}</h2>
              </div>
              <p className="text-gray-300">
                Waktu judi hari ini: <span className="text-red-400 font-bold">{simulation.timeSpent.toFixed(1)} jam</span>
              </p>
            </div>

            {/* Financial Status */}
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Status Keuangan</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Saldo Tersisa</span>
                    <span className="text-white font-bold">{formatCurrency(simulation.balance)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        simulation.balance / simulation.initialBalance > 0.5 ? 'bg-green-600' :
                        simulation.balance / simulation.initialBalance > 0.2 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${(simulation.balance / simulation.initialBalance) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Kerugian hari ini: <span className="text-red-400">{formatCurrency(simulation.dailyLoss)}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Total kerugian: <span className="text-red-400">{formatCurrency(simulation.initialBalance - simulation.balance)}</span>
                </div>
              </div>
            </div>

            {/* Health Indicators */}
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Indikator Kesehatan</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Tingkat Stress', value: simulation.stressLevel, reverse: true },
                  { label: 'Hubungan Keluarga', value: simulation.familyRelation, reverse: false },
                  { label: 'Performa Kerja', value: simulation.workPerformance, reverse: false },
                  { label: 'Kesehatan Mental', value: simulation.mentalHealth, reverse: false }
                ].map((indicator, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{indicator.label}</span>
                      <span className={getHealthColor(indicator.reverse ? 100 - indicator.value : indicator.value)}>
                        {indicator.value.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          getHealthBg(indicator.reverse ? 100 - indicator.value : indicator.value)
                        }`}
                        style={{ width: `${indicator.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Events Timeline */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingDown className="w-6 h-6 mr-2" />
              Timeline Kehancuran
            </h2>
            
            {simulation.events.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Mulai simulasi untuk melihat timeline</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {simulation.events.map((event, index) => (
                  <div key={index} className="bg-red-900 bg-opacity-30 p-4 rounded-lg border border-red-800">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-white">{event}</p>
                        <p className="text-red-400 text-sm mt-1">Hari ke-{
                          event.includes("berbohong") ? 7 :
                          event.includes("Performa kerja") ? 14 :
                          event.includes("meminjam") ? 21 :
                          event.includes("Pertengkaran") ? 30 :
                          event.includes("kartu kredit") ? 45 :
                          event.includes("pekerjaan") ? 60 :
                          simulation.day
                        }</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Final Warning */}
            {(simulation.balance <= 0 || simulation.day >= 365) && (
              <div className="mt-6 bg-red-600 p-4 rounded-lg border-2 border-red-400">
                <h3 className="text-white font-bold text-lg mb-2">🚨 SIMULASI BERAKHIR</h3>
                <p className="text-white">
                  {simulation.balance <= 0 
                    ? "Semua uang habis! Ini adalah realitas yang dialami jutaan penjudi."
                    : "Setahun berlalu dengan kehancuran bertahap. Kecanduan judi menghancurkan hidup secara perlahan tapi pasti."
                  }
                </p>
              </div>
            )}

            {/* Educational Notes */}
            <div className="mt-6 bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-600">
              <h3 className="text-blue-400 font-bold mb-2">💡 Fakta Penting</h3>
              <ul className="text-white text-sm space-y-1">
                <li>• Kecanduan judi berkembang secara bertahap</li>
                <li>• Dampaknya tidak hanya finansial, tapi juga sosial dan mental</li>
                <li>• Semakin lama bermain, semakin sulit untuk berhenti</li>
                <li>• Bantuan profesional diperlukan untuk pemulihan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddictionSimulator;