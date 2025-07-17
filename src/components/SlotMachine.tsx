import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { spinSlots, calculateWin } from '../utils/slotLogic';
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
        
        // Final result
        const result = spinSlots();
        const win = calculateWin(result, currentBet);
        
        setReels(result);
        setLastWin(win);
        setIsSpinning(false);
        
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
    <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-8 mb-6 border border-red-800">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Mesin Slot 3 Digit</h2>
        <p className="text-red-300 text-sm md:text-base">Perhatikan: Peluang menang sengaja dibuat kecil</p>
      </div>

      {/* Slot Machine Display */}
      <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-4 md:mb-6 border-2 border-yellow-600">
        <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
          {reels.map((reel, index) => (
            <div
              key={index}
              className={`w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center text-2xl md:text-4xl border-2 md:border-4 border-yellow-400 ${
                isSpinning ? 'animate-pulse' : ''
              }`}
            >
              {symbols[reel]}
            </div>
          ))}
        </div>

        {/* Payline */}
        <div className="h-1 bg-yellow-400 mb-6"></div>

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

        {/* Spin Button */}
        <div className="text-center">
          <button
            onClick={handleSpin}
            disabled={isSpinning || balance < currentBet}
            className={`
              flex items-center justify-center space-x-2 mx-auto
              px-4 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-xl transition-all
              ${isSpinning || balance < currentBet 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'}
            `}
          >
            <Play className="w-5 h-5 md:w-6 md:h-6" />
            <span>{isSpinning ? 'Berputar...' : `SPIN ${formatCurrency(currentBet)}`}</span>
          </button>
        </div>
      </div>

      {/* Paytable */}
      <div className="bg-gray-900 rounded-lg p-3 md:p-4 border border-gray-700">
        <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 text-center">Tabel Pembayaran</h3>
        <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm">
          <div className="text-center p-1 md:p-2 bg-gray-800 rounded">
            <div className="text-sm md:text-lg mb-1">7️⃣7️⃣7️⃣</div>
            <div className="text-yellow-400">100x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-800 rounded">
            <div className="text-sm md:text-lg mb-1">💎💎💎</div>
            <div className="text-yellow-400">50x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-800 rounded">
            <div className="text-sm md:text-lg mb-1">🔔🔔🔔</div>
            <div className="text-yellow-400">25x</div>
          </div>
          <div className="text-center p-1 md:p-2 bg-gray-800 rounded">
            <div className="text-sm md:text-lg mb-1">🍒🍒🍒</div>
            <div className="text-yellow-400">10x</div>
          </div>
        </div>
        <div className="text-center mt-2 md:mt-3 text-xs text-gray-400">
          Peluang menang jackpot: 0.2% - House edge: 15%
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;