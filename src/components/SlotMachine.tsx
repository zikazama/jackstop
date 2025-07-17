import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { spinSlotsWithManipulation, calculateWin } from '../utils/slotLogic';
import { playSpinSound, playWinSound, playLoseSound } from '../utils/soundEffects';

interface SlotMachineProps {
  onSpin: (result: number[], win: number) => void;
  currentBet: number;
  balance: number;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  onSpin,
  currentBet,
  balance,
  isSpinning,
  setIsSpinning
}) => {
  const [reels, setReels] = useState([7, 7, 7]);
  const [lastWin, setLastWin] = useState(0);
  const [lossStreak, setLossStreak] = useState(0);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐'];

  const handleSpin = async () => {
    if (isSpinning || balance < currentBet) return;

    playSpinSound();
    setIsSpinning(true);
    setLastWin(0);

    // Animate reels
    const animationDuration = 2000;
    const animationInterval = 100;
    const animationSteps = animationDuration / animationInterval;
    
    let currentStep = 0;
    const animationTimer = setInterval(() => {
      setReels([
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 8)
      ]);
      
      currentStep++;
      if (currentStep >= animationSteps) {
        clearInterval(animationTimer);
        
        // Final result with manipulation
        const result = spinSlotsWithManipulation(lossStreak);
        const win = calculateWin(result, currentBet);
        
        setReels(result);
        setLastWin(win);
        setIsSpinning(false);
        
        // Update loss streak
        if (win === 0) {
          setLossStreak(prev => prev + 1);
        } else {
          setLossStreak(0); // Reset streak jika menang
        }
        
        // Play appropriate sound
        if (win > 0) {
          playWinSound();
        } else {
          playLoseSound();
        }
        
        onSpin(result, win);
      }
    }, animationInterval);
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
    <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-4 md:mb-6 border-2 border-yellow-600">
      <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
        {reels.map((reel, index) => (
          <div
            key={index}
            className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-2xl md:text-3xl shadow-lg"
          >
            {symbols[reel]}
          </div>
        ))}
      </div>

      {/* Spin Button */}
      <div className="text-center mb-4 md:mb-6">
        <button
          onClick={handleSpin}
          disabled={isSpinning || balance < currentBet}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg border-2 border-yellow-400"
        >
          <div className="flex items-center justify-center space-x-2">
            <Play className="w-5 h-5 md:w-6 md:h-6" />
            <span>SPIN</span>
          </div>
        </button>
      </div>

      {/* Result Display */}
      <div className="text-center mb-4 md:mb-6">
        {lastWin > 0 ? (
          <div className="text-lg md:text-2xl font-bold text-green-400">
            🎉 MENANG {formatCurrency(lastWin)}
          </div>
        ) : (
          <div className="text-base md:text-xl text-red-400">
            {reels.every(r => r === reels[0]) ? 'Hampir menang!' : 'Coba lagi'}
          </div>
        )}
      </div>

      {/* Loss Streak Warning */}
      {lossStreak >= 5 && (
        <div className="text-center mb-4 p-3 bg-red-900 rounded-lg border border-red-600">
          <div className="text-red-400 font-bold mb-1">
            ⚠️ Sudah kalah {lossStreak}x berturut-turut!
          </div>
          <div className="text-red-300 text-sm">
            {lossStreak >= 10 ? 'Sistem mungkin akan "memberikan" kemenangan untuk membuat Anda tetap bermain...' : 'Inilah bagaimana sistem judi bekerja - terus kalah sampai kecanduan!'}
          </div>
        </div>
      )}

      {/* Payout Table */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Tabel Pembayaran</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="text-center p-1 md:p-2 bg-gray-700 rounded">
            <div className="text-sm md:text-lg mb-1">7️⃣7️⃣7️⃣</div>
            <div className="text-yellow-400">100x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-700 rounded">
            <div className="text-sm md:text-lg mb-1">💎💎💎</div>
            <div className="text-yellow-400">50x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-700 rounded">
            <div className="text-sm md:text-lg mb-1">🔔🔔🔔</div>
            <div className="text-yellow-400">25x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-700 rounded">
            <div className="text-sm md:text-lg mb-1">🍒🍒🍒</div>
            <div className="text-yellow-400">10x</div>
          </div>
        </div>
        <div className="text-center mt-2 p-2 bg-gray-700 rounded text-xs">
          <div className="text-green-400 font-bold mb-1">2 Simbol Sama = 0.5x Taruhan</div>
          <div className="text-gray-300">Contoh: 🍒🍒🍋 = Menang setengah taruhan</div>
        </div>
        <div className="text-center mt-2 md:mt-3 text-xs text-gray-400">
          Peluang menang jackpot: 0.2% - House edge: 15%
        </div>
        <div className="text-center mt-2 p-2 bg-red-900 bg-opacity-50 rounded text-xs border border-red-600">
          <div className="text-red-400 font-bold mb-1">⚠️ SISTEM MANIPULASI JUDI ONLINE</div>
          <div className="text-red-300 text-xs">
            Setelah kalah 10x berturut-turut, sistem akan "memberikan" kemenangan untuk membuat pemain tetap semangat bermain
          </div>
        </div>
        <div className="text-center mt-1 text-xs text-red-400">
          ⚠️ Kalah = kehilangan taruhan penuh! Menang = 0.5-100x taruhan!
        </div>
        <div className="text-center mt-1 text-xs text-blue-400">
          💡 Contoh: Taruhan Rp 10.000 → Menang Rp 5.000 (0.5x) atau Rp 100.000 (10x) atau Kalah Rp 10.000
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;