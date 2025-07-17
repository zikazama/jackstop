// Algoritma slot yang menunjukkan house edge
export const spinSlots = (): number[] => {
  // Distribusi simbol dengan probabilitas berbeda
  const symbolWeights = [
    { symbol: 0, weight: 20 }, // 🍒 - paling sering
    { symbol: 1, weight: 18 }, // 🍋
    { symbol: 2, weight: 16 }, // 🍊
    { symbol: 3, weight: 14 }, // 🍇
    { symbol: 4, weight: 12 }, // 🔔
    { symbol: 5, weight: 8 },  // 💎
    { symbol: 6, weight: 2 },  // 7️⃣ - jackpot, sangat jarang
    { symbol: 7, weight: 10 }  // ⭐
  ];

  const totalWeight = symbolWeights.reduce((sum, item) => sum + item.weight, 0);
  
  const getRandomSymbol = (): number => {
    const random = Math.random() * totalWeight;
    let currentWeight = 0;
    
    for (const item of symbolWeights) {
      currentWeight += item.weight;
      if (random <= currentWeight) {
        return item.symbol;
      }
    }
    
    return 0; // fallback
  };

  // Generate 3 reel hasil
  const result = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  
  // Manipulasi untuk mengurangi peluang jackpot
  // Jika 2 simbol sama dan salah satunya adalah jackpot, ubah yang ketiga
  const jackpotSymbol = 6; // 7️⃣
  if (result[0] === jackpotSymbol && result[1] === jackpotSymbol) {
    // 95% chance untuk mengubah reel ketiga agar tidak jackpot
    if (Math.random() < 0.95) {
      result[2] = (result[2] === jackpotSymbol) ? 0 : result[2];
    }
  }
  
  return result;
};

export const calculateWin = (result: number[], bet: number): number => {
  // Cek apakah semua simbol sama
  if (result[0] === result[1] && result[1] === result[2]) {
    const symbol = result[0];
    
    // Tabel pembayaran
    const payouts = {
      6: 100, // 7️⃣ - jackpot
      5: 50,  // 💎
      4: 25,  // 🔔
      7: 20,  // ⭐
      3: 15,  // 🍇
      2: 10,  // 🍊
      1: 5,   // 🍋
      0: 3    // 🍒
    };
    
    return bet * (payouts[symbol as keyof typeof payouts] || 0);
  }
  
  // Cek kombinasi khusus (sangat jarang)
  const sortedResult = [...result].sort();
  
  // Tiga simbol berbeda tapi berurutan (bonus kecil)
  if (sortedResult[0] + 1 === sortedResult[1] && sortedResult[1] + 1 === sortedResult[2]) {
    return Math.floor(bet * 0.5); // 50% dari taruhan
  }
  
  // Dua simbol sama (bonus sangat kecil)
  if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
    return Math.floor(bet * 0.1); // 10% dari taruhan
  }
  
  return 0; // Kalah
};

// Fungsi untuk menghitung house edge
export const calculateHouseEdge = (): number => {
  const simulations = 100000;
  let totalBet = 0;
  let totalWin = 0;
  const baseBet = 10000;
  
  for (let i = 0; i < simulations; i++) {
    const result = spinSlots();
    const win = calculateWin(result, baseBet);
    
    totalBet += baseBet;
    totalWin += win;
  }
  
  const houseEdge = ((totalBet - totalWin) / totalBet) * 100;
  return houseEdge;
};