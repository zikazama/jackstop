import React, { useState } from 'react';
import { Home, Plus, Minus } from 'lucide-react';
import SlotMachine from './SlotMachine';
import GameHistory from './GameHistory';

interface SlotGameProps {
  onBackToLanding: () => void;
}

interface GameRecord {
  id: number;
  bet: number;
  result: number[];
  win: number;
  timestamp: Date;
}

const SlotGame: React.FC<SlotGameProps> = ({ onBackToLanding }) => {
  const [balance, setBalance] = useState(100000);
  const [currentBet, setCurrentBet] = useState(10000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
  const [showTopup, setShowTopup] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleSpin = (result: number[], win: number) => {
    const newRecord: GameRecord = {
      id: Date.now(),
      bet: currentBet,
      result,
      win,
      timestamp: new Date()
    };

    setGameHistory(prev => [newRecord, ...prev]);
    setBalance(prev => prev - currentBet + win);
  };

  const handleTopup = () => {
    const amount = parseInt(topupAmount);
    if (amount > 0 && amount <= 1000000) {
      setBalance(prev => prev + amount);
      setTopupAmount('');
      setShowTopup(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
      setShowWithdraw(false);
    }
  };

  const adjustBet = (amount: number) => {
    const newBet = Math.max(1000, Math.min(100000, currentBet + amount));
    setCurrentBet(newBet);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalWin = gameHistory.reduce((sum, record) => sum + record.win, 0);
  const totalBet = gameHistory.reduce((sum, record) => sum + record.bet, 0);
  const netResult = totalWin - totalBet;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBackToLanding}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Simulasi Slot Edukatif</h1>
            <p className="text-red-300 text-sm">Lihat bagaimana sistem dirancang agar Anda kalah</p>
          </div>
          
          <div className="text-right">
            <div className="text-white">
              <div className="text-sm text-gray-300">Saldo</div>
              <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-600 rounded-lg p-4 mb-6 border-2 border-red-400">
          <p className="text-white text-center font-bold">
            ⚠️ SIMULASI EDUKATIF - Perhatikan bagaimana saldo Anda terus menurun meskipun sesekali menang
          </p>
        </div>

        {/* Game Controls */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-red-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Bet Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-white">Taruhan:</span>
              <button
                onClick={() => adjustBet(-5000)}
                disabled={currentBet <= 1000}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold text-lg w-32 text-center">
                {formatCurrency(currentBet)}
              </span>
              <button
                onClick={() => adjustBet(5000)}
                disabled={currentBet >= 100000}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowTopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Top Up
              </button>
              <button
                onClick={() => setShowWithdraw(true)}
                disabled={balance < 50000}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Slot Machine */}
        <SlotMachine
          onSpin={handleSpin}
          currentBet={currentBet}
          balance={balance}
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
        />

        {/* Statistics */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-red-800">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Statistik Bermain</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{gameHistory.length}</div>
              <div className="text-gray-300 text-sm">Total Spin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{formatCurrency(totalBet)}</div>
              <div className="text-gray-300 text-sm">Total Taruhan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{formatCurrency(totalWin)}</div>
              <div className="text-gray-300 text-sm">Total Menang</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${netResult >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(netResult)}
              </div>
              <div className="text-gray-300 text-sm">Keuntungan Bersih</div>
            </div>
          </div>
          
          {netResult < 0 && (
            <div className="mt-4 p-4 bg-red-900 rounded-lg border border-red-600">
              <p className="text-white text-center font-bold">
                📉 Anda sudah rugi {formatCurrency(Math.abs(netResult))} - Inilah mengapa judi selalu merugikan!
              </p>
            </div>
          )}
        </div>

        {/* Game History */}
        <GameHistory history={gameHistory} />

        {/* Topup Modal */}
        {showTopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Top Up Saldo</h3>
              <p className="text-red-300 text-sm mb-4">
                Dalam judi sungguhan, ini adalah bagaimana orang kehilangan uang lebih banyak
              </p>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                placeholder="Masukkan jumlah (max 1.000.000)"
                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleTopup}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Top Up
                </button>
                <button
                  onClick={() => setShowTopup(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Withdraw Saldo</h3>
              <p className="text-red-300 text-sm mb-4">
                Dalam judi sungguhan, withdraw sering dipersulit atau dikenakan biaya tinggi
              </p>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder={`Masukkan jumlah (max ${formatCurrency(balance)})`}
                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotGame;