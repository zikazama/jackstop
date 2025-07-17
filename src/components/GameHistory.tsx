import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface GameRecord {
  id: number;
  bet: number;
  result: number[];
  win: number;
  timestamp: Date;
}

interface GameHistoryProps {
  history: GameRecord[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '⭐'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const winCount = history.filter(record => record.win > 0).length;
  const loseCount = history.length - winCount;
  const winRate = history.length > 0 ? (winCount / history.length * 100).toFixed(1) : 0;

  return (
    <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 border border-red-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
        <h3 className="text-xl md:text-2xl font-bold text-white">Riwayat Permainan</h3>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center space-x-1 md:space-x-2">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            <span className="text-green-400">Menang: {winCount}</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
            <span className="text-red-400">Kalah: {loseCount}</span>
          </div>
          <div className="text-white">
            Win Rate: {winRate}%
          </div>
        </div>
      </div>

      {/* Educational Message */}
      <div className="bg-red-900 rounded-lg p-3 md:p-4 mb-3 md:mb-4 border border-red-600">
        <p className="text-white text-center font-bold text-sm md:text-base">
          📊 Perhatikan: Meskipun sesekali menang, total kekalahan selalu lebih besar. 
          Itulah mengapa judi disebut "pajak untuk orang yang tidak bisa matematika"
        </p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-6 md:py-8">
          <p className="text-gray-400 text-sm md:text-base">Belum ada riwayat permainan</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((record, index) => (
            <div
              key={record.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 md:p-3 rounded-lg border space-y-2 sm:space-y-0 ${
                record.win > 0 
                  ? 'bg-green-900 bg-opacity-30 border-green-800' 
                  : 'bg-red-900 bg-opacity-30 border-red-800'
              }`}
            >
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-xs md:text-sm text-gray-300">
                  #{history.length - index}
                </div>
                <div className="flex space-x-1">
                  {record.result.map((symbol, i) => (
                    <span key={i} className="text-sm md:text-lg">
                      {symbols[symbol]}
                    </span>
                  ))}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  {formatTime(record.timestamp)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-right">
                  <div className="text-xs md:text-sm text-gray-300">
                    Taruhan: {formatCurrency(record.bet)}
                  </div>
                  <div className={`text-xs md:text-sm font-bold ${
                    record.win > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {record.win > 0 
                      ? `+${formatCurrency(record.win)}` 
                      : `${formatCurrency(record.win - record.bet)}`
                    }
                  </div>
                </div>
                
                {record.win > 0 ? (
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loss Analysis */}
      {history.length >= 10 && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-900 bg-opacity-30 rounded-lg border border-yellow-600">
          <h4 className="text-yellow-400 font-bold mb-2 text-sm md:text-base">Analisis Kerugian</h4>
          <div className="text-xs md:text-sm text-yellow-200 space-y-1">
            <p>• Dari {history.length} permainan, Anda kalah {loseCount} kali ({((loseCount/history.length)*100).toFixed(1)}%)</p>
            <p>• Ini membuktikan bahwa house edge bekerja - kasino selalu menang dalam jangka panjang</p>
            <p>• Semakin lama bermain, semakin besar kemungkinan rugi total</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHistory;