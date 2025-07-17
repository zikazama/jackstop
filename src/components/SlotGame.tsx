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
    const amount = parseInt(topupAmount.replace(/\D/g, ''));
    if (amount > 0 && amount <= 1000000) {
      setBalance(prev => prev + amount);
      setTopupAmount('');
      setShowTopup(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount.replace(/\D/g, ''));
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <button
            onClick={onBackToLanding}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <div className="text-center order-first md:order-none">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Simulasi Slot Edukatif</h1>
            <p className="text-red-300 text-xs md:text-sm">Lihat bagaimana sistem dirancang agar Anda kalah</p>
          </div>
          
          <div className="text-center md:text-right w-full md:w-auto">
            <div className="text-white">
              <div className="text-sm text-gray-300">Saldo</div>
              <div className="text-xl md:text-2xl font-bold">{formatCurrency(balance)}</div>
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
        <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 mb-6 border border-red-800">
          <div className="flex flex-col space-y-4">
            {/* Bet Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-white text-sm md:text-base">Taruhan:</span>
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  onClick={() => adjustBet(-5000)}
                  disabled={currentBet <= 1000}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 md:p-3 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold text-base md:text-lg w-24 md:w-32 text-center">
                  {formatCurrency(currentBet)}
                </span>
                <button
                  onClick={() => adjustBet(5000)}
                  disabled={currentBet >= 100000}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 md:p-3 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowTopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base"
              >
                Top Up
              </button>
              <button
                onClick={() => setShowWithdraw(true)}
                disabled={balance < 50000}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base"
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
        <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 mb-6 border border-red-800">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Statistik Bermain</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="text-center p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-white">{gameHistory.length}</div>
              <div className="text-gray-300 text-xs md:text-sm">Total Spin</div>
            </div>
            <div className="text-center p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-red-400">{formatCurrency(totalBet)}</div>
              <div className="text-gray-300 text-xs md:text-sm">Total Taruhan</div>
            </div>
            <div className="text-center p-2 md:p-3">
              <div className="text-lg md:text-2xl font-bold text-green-400">{formatCurrency(totalWin)}</div>
              <div className="text-gray-300 text-xs md:text-sm">Total Menang</div>
            </div>
            <div className="text-center p-2 md:p-3">
              <div className={`text-lg md:text-2xl font-bold ${netResult >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(netResult)}
              </div>
              <div className="text-gray-300 text-xs md:text-sm">Keuntungan Bersih</div>
            </div>
          </div>
          
          {netResult < 0 && (
            <div className="mt-4 p-3 md:p-4 bg-red-900 rounded-lg border border-red-600">
              <p className="text-white text-center font-bold text-sm md:text-base">
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
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 max-w-md w-full mx-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Top Up Saldo</h3>
              <p className="text-red-300 text-xs md:text-sm mb-3 md:mb-4">
                Dalam judi sungguhan, ini adalah bagaimana orang kehilangan uang lebih banyak
              </p>
              <input
                type="text"
                value={topupAmount ? Number(topupAmount.replace(/\D/g, '')) === 0 ? '' : Number(topupAmount.replace(/\D/g, '')).toLocaleString('id-ID') : ''}
                onChange={(e) => {
                  // Hapus karakter non-digit sebelum parsing
                  const raw = e.target.value.replace(/\D/g, '');
                  setTopupAmount(raw);
                }}
                placeholder="Masukkan jumlah (max 1.000.000)"
                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 text-sm md:text-base"
                inputMode="numeric"
                autoComplete="off"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleTopup}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
                >
                  Top Up
                </button>
                <button
                  onClick={() => setShowTopup(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
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
            <div className="bg-gray-800 rounded-lg p-4 md:p-6 max-w-md w-full mx-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Withdraw Saldo</h3>
              <p className="text-red-300 text-xs md:text-sm mb-3 md:mb-4">
                Dalam judi sungguhan, withdraw sering dipersulit atau dikenakan biaya tinggi
              </p>
              <input
                type="text"
                value={withdrawAmount ? Number(withdrawAmount.replace(/\D/g, '')) === 0 ? '' : Number(withdrawAmount.replace(/\D/g, '')).toLocaleString('id-ID') : ''}
                onChange={(e) => {
                  // Hapus karakter non-digit sebelum parsing
                  const raw = e.target.value.replace(/\D/g, '');
                  setWithdrawAmount(raw);
                }}
                placeholder={`Masukkan jumlah (max ${formatCurrency(balance)})`}
                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 text-sm md:text-base"
                inputMode="numeric"
                autoComplete="off"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
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