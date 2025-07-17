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

// Fungsi dengan manipulasi untuk memberikan kemenangan setelah 10 kekalahan
export const spinSlotsWithManipulation = (lossStreak: number): number[] => {
  // Jika sudah kalah 10x berturut-turut, berikan kemenangan
  if (lossStreak >= 10) {
    // 80% chance untuk memberikan kemenangan
    if (Math.random() < 0.8) {
      // Berikan jackpot atau kemenangan besar
      // Pilih kemenangan berdasarkan probabilitas
      const random = Math.random();
      if (random < 0.1) {
        return [6, 6, 6]; // 10% chance jackpot
      } else if (random < 0.3) {
        return [5, 5, 5]; // 20% chance 50x
      } else if (random < 0.6) {
        return [4, 4, 4]; // 30% chance 25x
      } else {
        return [0, 0, 0]; // 40% chance 10x
      }
    }
  }
  
  // Jika tidak, gunakan logika normal
  return spinSlots();
};

export const calculateWin = (result: number[], bet: number): number => {
  // Cek apakah semua simbol sama (3 simbol sama)
  if (result[0] === result[1] && result[1] === result[2]) {
    const symbol = result[0];
    
    // Tabel pembayaran baru
    const payouts = {
      6: 100, // 7️⃣7️⃣7️⃣ - jackpot 100x
      5: 50,  // 💎💎💎 - 50x
      4: 25,  // 🔔🔔🔔 - 25x
      0: 10,  // 🍒🍒🍒 - 10x
      7: 5,   // ⭐⭐⭐ - 5x
      3: 3,   // 🍇🍇🍇 - 3x
      2: 2,   // 🍊🍊🍊 - 2x
      1: 1    // 🍋🍋🍋 - 1x
    };
    
    return bet * (payouts[symbol as keyof typeof payouts] || 0);
  }
  
  // Cek 2 simbol sama (0.5x taruhan)
  if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
    return Math.floor(bet * 0.5); // 0.5x taruhan
  }
  
  return 0; // Kalah
};

// Fungsi untuk menghitung kerugian (selalu sama dengan taruhan jika kalah)
export const calculateLoss = (bet: number): number => {
  return bet;
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