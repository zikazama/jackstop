import React, { useState } from 'react';
import { ArrowLeft, Calculator, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';
import { playClickSound, playWarningSound } from '../utils/soundEffects';

interface LossCalculatorProps {
  onBack: () => void;
  updateProgress: (action: string) => void;
}

const LossCalculator: React.FC<LossCalculatorProps> = ({ onBack, updateProgress }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(1000000);
  const [dailyTime, setDailyTime] = useState(2);
  const [averageBet, setAverageBet] = useState(50000);
  const [houseEdge, setHouseEdge] = useState(15);
  const [results, setResults] = useState<{
    daily: { wagered: number; loss: number };
    monthly: { wagered: number; loss: number };
    yearly: { wagered: number; loss: number };
    opportunities: { stock: number; deposit: number };
  } | null>(null);

  const calculateLosses = () => {
    playClickSound();
    
    // Update progress hanya ketika user benar-benar menggunakan calculator
    updateProgress('calculator_used');
    
    const betsPerHour = 60; // Asumsi 1 bet per menit
    const dailyBets = betsPerHour * dailyTime;
    const monthlyBets = dailyBets * 30;
    const yearlyBets = dailyBets * 365;

    const dailyWagered = dailyBets * averageBet;
    const monthlyWagered = monthlyBets * averageBet;
    const yearlyWagered = yearlyBets * averageBet;

    const dailyLoss = dailyWagered * (houseEdge / 100);
    const monthlyLoss = monthlyWagered * (houseEdge / 100);
    const yearlyLoss = yearlyWagered * (houseEdge / 100);

    // Alternative investments
    const stockReturn = 0.12; // 12% annual return
    const depositReturn = 0.06; // 6% annual return
    
    const stockOpportunity = monthlyLoss * 12 * Math.pow(1 + stockReturn, 10);
    const depositOpportunity = monthlyLoss * 12 * Math.pow(1 + depositReturn, 10);

    setResults({
      daily: { wagered: dailyWagered, loss: dailyLoss },
      monthly: { wagered: monthlyWagered, loss: monthlyLoss },
      yearly: { wagered: yearlyWagered, loss: yearlyLoss },
      opportunities: { stock: stockOpportunity, deposit: depositOpportunity }
    });

    if (monthlyLoss > monthlyBudget * 0.1) {
      playWarningSound();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-white mb-2">Kalkulator Kerugian Judi</h1>
            <p className="text-red-300">Hitung berapa uang yang akan hilang jika terus berjudi</p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-600 rounded-lg p-4 mb-6 border-2 border-red-400">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-white font-bold text-lg">Peringatan</h3>
              <p className="text-white">Hasil perhitungan ini berdasarkan matematika dan statistik nyata dari industri judi</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2" />
              Parameter Perhitungan
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">
                  Budget Bulanan (IDR)
                </label>
                <input
                  type="text"
                  value={formatCurrency(monthlyBudget)}
                  onChange={(e) => {
                    // Hapus karakter non-digit sebelum parsing
                    const raw = e.target.value.replace(/[^\d]/g, '');
                    setMonthlyBudget(Number(raw));
                  }}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  Waktu Bermain per Hari (jam)
                </label>
                <input
                  type="number"
                  value={dailyTime}
                  onChange={(e) => setDailyTime(Number(e.target.value))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  min="0.5"
                  max="24"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  Rata-rata Taruhan per Spin (IDR)
                </label>
                <input
                  type="text"
                  value={formatCurrency(averageBet)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d]/g, '');
                    setAverageBet(Number(raw));
                  }}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  House Edge (%)
                </label>
                <select
                  value={houseEdge}
                  onChange={(e) => setHouseEdge(Number(e.target.value))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                >
                  <option value={5}>Slot Online (5%)</option>
                  <option value={15}>Slot Tradisional (15%)</option>
                  <option value={25}>Game Arcade (25%)</option>
                  <option value={35}>Game Crash (35%)</option>
                </select>
              </div>

              <button
                onClick={calculateLosses}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Hitung Kerugian
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingDown className="w-6 h-6 mr-2" />
              Hasil Perhitungan
            </h2>

            {results ? (
              <div className="space-y-6">
                {/* Loss Summary */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg border border-red-600">
                    <h3 className="text-red-400 font-bold mb-2">Kerugian Harian</h3>
                    <p className="text-2xl font-bold text-white">{formatCurrency(results.daily.loss)}</p>
                    <p className="text-sm text-gray-300">Dari taruhan {formatCurrency(results.daily.wagered)}</p>
                  </div>

                  <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg border border-red-600">
                    <h3 className="text-red-400 font-bold mb-2">Kerugian Bulanan</h3>
                    <p className="text-2xl font-bold text-white">{formatCurrency(results.monthly.loss)}</p>
                    <p className="text-sm text-gray-300">Dari taruhan {formatCurrency(results.monthly.wagered)}</p>
                  </div>

                  <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg border border-red-600">
                    <h3 className="text-red-400 font-bold mb-2">Kerugian Tahunan</h3>
                    <p className="text-2xl font-bold text-white">{formatCurrency(results.yearly.loss)}</p>
                    <p className="text-sm text-gray-300">Dari taruhan {formatCurrency(results.yearly.wagered)}</p>
                  </div>
                </div>

                {/* Opportunity Cost */}
                <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg border border-yellow-600">
                  <h3 className="text-yellow-400 font-bold mb-3">Biaya Kesempatan (10 Tahun)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">Jika diinvestasi saham:</span>
                      <span className="text-green-400 font-bold">{formatCurrency(results.opportunities.stock)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Jika ditabung deposito:</span>
                      <span className="text-green-400 font-bold">{formatCurrency(results.opportunities.deposit)}</span>
                    </div>
                  </div>
                </div>

                {/* Warning Messages */}
                {results.monthly.loss > monthlyBudget * 0.1 && (
                  <div className="bg-red-600 p-4 rounded-lg border-2 border-red-400">
                    <h3 className="text-white font-bold mb-2">⚠️ BAHAYA EKSTREM</h3>
                    <p className="text-white">
                      Kerugian bulanan Anda melebihi 10% dari budget! 
                      Ini adalah tanda kecanduan judi yang serius.
                    </p>
                  </div>
                )}

                <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-600">
                  <h3 className="text-blue-400 font-bold mb-2">💡 Fakta Penting</h3>
                  <ul className="text-white text-sm space-y-1">
                    <li>• House edge adalah keuntungan matematika kasino</li>
                    <li>• Semakin lama bermain, semakin pasti rugi</li>
                    <li>• Tidak ada strategi yang bisa mengalahkan house edge</li>
                    <li>• Uang yang hilang bisa digunakan untuk investasi produktif</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Masukkan parameter dan klik "Hitung Kerugian" untuk melihat hasil</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossCalculator;