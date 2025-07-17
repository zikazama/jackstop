import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, CreditCard, Calculator } from 'lucide-react';

interface FinancialGuideProps {
  onBack: () => void;
}

const FinancialGuide: React.FC<FinancialGuideProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('recovery');

  const recoverySteps = [
    {
      step: 1,
      title: "Audit Keuangan Lengkap",
      description: "Catat semua aset, hutang, dan pengeluaran",
      actions: [
        "Buat daftar semua rekening bank dan saldo",
        "Catat semua hutang (kartu kredit, pinjaman, dll)",
        "Hitung total kerugian akibat judi",
        "Identifikasi sumber pendapatan yang tersisa"
      ]
    },
    {
      step: 2,
      title: "Stabilisasi Darurat",
      description: "Hentikan pendarahan finansial dan amankan kebutuhan dasar",
      actions: [
        "Blokir akses ke semua platform judi online",
        "Tutup atau bekukan kartu kredit yang digunakan untuk judi",
        "Prioritaskan pembayaran kebutuhan pokok (makanan, tempat tinggal)",
        "Hubungi kreditor untuk negosiasi pembayaran"
      ]
    },
    {
      step: 3,
      title: "Rencana Pelunasan Hutang",
      description: "Buat strategi sistematis untuk melunasi hutang",
      actions: [
        "Urutkan hutang berdasarkan prioritas (bunga tinggi dulu)",
        "Negosiasi dengan kreditor untuk cicilan yang terjangkau",
        "Pertimbangkan debt consolidation jika memungkinkan",
        "Hindari pinjaman baru untuk melunasi hutang lama"
      ]
    },
    {
      step: 4,
      title: "Membangun Dana Darurat",
      description: "Siapkan buffer finansial untuk mencegah kembali berjudi",
      actions: [
        "Mulai dengan target Rp 1 juta sebagai dana darurat mini",
        "Sisihkan minimal 10% dari pendapatan untuk dana darurat",
        "Simpan di rekening terpisah yang sulit diakses",
        "Tingkatkan bertahap hingga 6 bulan pengeluaran"
      ]
    }
  ];

  const budgetingTips = [
    {
      category: "50% - Kebutuhan Pokok",
      items: ["Sewa/cicilan rumah", "Makanan", "Transportasi", "Utilitas", "Asuransi"],
      color: "bg-red-600"
    },
    {
      category: "30% - Keinginan",
      items: ["Hiburan", "Makan di luar", "Hobi", "Shopping non-esensial"],
      color: "bg-yellow-600"
    },
    {
      category: "20% - Tabungan & Investasi",
      items: ["Dana darurat", "Investasi", "Pelunasan hutang", "Rencana pensiun"],
      color: "bg-green-600"
    }
  ];

  const investmentOptions = [
    {
      type: "Deposito Bank",
      risk: "Rendah",
      return: "4-6% per tahun",
      description: "Aman, dijamin LPS, cocok untuk pemula",
      minAmount: "Rp 8 juta",
      pros: ["Aman", "Dijamin pemerintah", "Bunga tetap"],
      cons: ["Return rendah", "Tidak liquid"]
    },
    {
      type: "Reksa Dana Pasar Uang",
      risk: "Rendah",
      return: "5-7% per tahun",
      description: "Liquid, cocok untuk dana darurat",
      minAmount: "Rp 100 ribu",
      pros: ["Liquid", "Return lebih tinggi dari tabungan", "Mudah diakses"],
      cons: ["Return tidak dijamin", "Biaya manajemen"]
    },
    {
      type: "Reksa Dana Campuran",
      risk: "Sedang",
      return: "8-12% per tahun",
      description: "Kombinasi saham dan obligasi",
      minAmount: "Rp 100 ribu",
      pros: ["Diversifikasi", "Potensi return lebih tinggi", "Dikelola profesional"],
      cons: ["Risiko fluktuasi", "Biaya manajemen"]
    },
    {
      type: "Saham Blue Chip",
      risk: "Sedang-Tinggi",
      return: "10-15% per tahun",
      description: "Saham perusahaan besar dan stabil",
      minAmount: "Rp 100 ribu",
      pros: ["Potensi return tinggi", "Dividen", "Liquid"],
      cons: ["Volatilitas tinggi", "Perlu pengetahuan"]
    }
  ];

  const debtStrategies = [
    {
      name: "Debt Snowball",
      description: "Bayar hutang terkecil dulu untuk motivasi psikologis",
      steps: [
        "Urutkan hutang dari jumlah terkecil ke terbesar",
        "Bayar minimum untuk semua hutang",
        "Fokus bayar hutang terkecil sampai lunas",
        "Lanjut ke hutang berikutnya"
      ],
      bestFor: "Orang yang butuh motivasi cepat"
    },
    {
      name: "Debt Avalanche",
      description: "Bayar hutang dengan bunga tertinggi dulu untuk efisiensi",
      steps: [
        "Urutkan hutang dari bunga tertinggi ke terendah",
        "Bayar minimum untuk semua hutang",
        "Fokus bayar hutang berbunga tertinggi",
        "Lanjut ke hutang berikutnya"
      ],
      bestFor: "Orang yang fokus pada efisiensi matematis"
    }
  ];

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
            <h1 className="text-3xl font-bold text-white mb-2">Panduan Finansial</h1>
            <p className="text-yellow-300">Cara mengelola keuangan setelah rugi judi dan membangun masa depan yang stabil</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'recovery', label: 'Pemulihan Finansial', icon: <DollarSign className="w-5 h-5" /> },
              { id: 'budgeting', label: 'Budgeting', icon: <Calculator className="w-5 h-5" /> },
              { id: 'investment', label: 'Investasi', icon: <TrendingUp className="w-5 h-5" /> },
              { id: 'debt', label: 'Strategi Hutang', icon: <CreditCard className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'recovery' && (
          <div className="space-y-6">
            <div className="bg-red-600 rounded-lg p-4 mb-6 border-2 border-red-400">
              <h2 className="text-white font-bold text-xl mb-2">🚨 Langkah Darurat</h2>
              <p className="text-white">
                Jika Anda baru saja mengalami kerugian besar akibat judi, ikuti langkah-langkah di bawah ini secara berurutan.
              </p>
            </div>

            <div className="space-y-6">
              {recoverySteps.map((step) => (
                <div key={step.step} className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.actions.map((action, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-white">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budgeting' && (
          <div className="space-y-6">
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Aturan 50/30/20 untuk Budgeting</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {budgetingTips.map((tip, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <div className={`${tip.color} text-white p-3 rounded-lg mb-4 text-center font-bold`}>
                      {tip.category}
                    </div>
                    <ul className="space-y-2">
                      {tip.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Tips Budgeting Setelah Rugi Judi</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400">✅ Yang Harus Dilakukan</h3>
                  <ul className="space-y-2">
                    {[
                      "Catat setiap pengeluaran harian",
                      "Gunakan aplikasi budgeting",
                      "Sisihkan uang sebelum digunakan",
                      "Review budget mingguan",
                      "Cari sumber pendapatan tambahan"
                    ].map((item, index) => (
                      <li key={index} className="text-white flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-red-400">❌ Yang Harus Dihindari</h3>
                  <ul className="space-y-2">
                    {[
                      "Pinjam uang untuk kebutuhan sehari-hari",
                      "Menggunakan kartu kredit untuk cash advance",
                      "Investasi berisiko tinggi",
                      "Mengabaikan hutang yang ada",
                      "Tidak memiliki dana darurat"
                    ].map((item, index) => (
                      <li key={index} className="text-white flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investment' && (
          <div className="space-y-6">
            <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-4 border border-yellow-600">
              <h2 className="text-yellow-400 font-bold text-xl mb-2">⚠️ Peringatan Penting</h2>
              <p className="text-yellow-200">
                Setelah mengalami kerugian judi, hindari investasi berisiko tinggi. 
                Fokus pada stabilitas dan pemulihan finansial terlebih dahulu.
              </p>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Pilihan Investasi yang Aman</h2>
              <div className="space-y-6">
                {investmentOptions.map((option, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{option.type}</h3>
                        <p className="text-gray-300">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          option.risk === 'Rendah' ? 'bg-green-600' :
                          option.risk === 'Sedang' ? 'bg-yellow-600' : 'bg-red-600'
                        } text-white`}>
                          Risiko {option.risk}
                        </div>
                        <div className="text-green-400 font-bold mt-1">{option.return}</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Minimum Investasi</h4>
                        <p className="text-blue-400 font-bold">{option.minAmount}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Kelebihan</h4>
                        <ul className="text-green-400 text-sm space-y-1">
                          {option.pros.map((pro, proIndex) => (
                            <li key={proIndex}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Kekurangan</h4>
                        <ul className="text-red-400 text-sm space-y-1">
                          {option.cons.map((con, conIndex) => (
                            <li key={conIndex}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-900 bg-opacity-50 rounded-lg p-6 border border-blue-600">
              <h2 className="text-blue-400 font-bold text-xl mb-4">💡 Tips Investasi Setelah Rugi Judi</h2>
              <ul className="text-blue-200 space-y-2">
                <li>• Mulai dengan investasi berisiko rendah untuk membangun kepercayaan diri</li>
                <li>• Diversifikasi investasi, jangan taruh semua telur dalam satu keranjang</li>
                <li>• Investasi secara bertahap (dollar cost averaging)</li>
                <li>• Fokus pada investasi jangka panjang, bukan quick profit</li>
                <li>• Pelajari dulu sebelum berinvestasi, jangan ikut-ikutan</li>
                <li>• Gunakan platform investasi yang terdaftar OJK</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'debt' && (
          <div className="space-y-6">
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Strategi Pelunasan Hutang</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {debtStrategies.map((strategy, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-3">{strategy.name}</h3>
                    <p className="text-gray-300 mb-4">{strategy.description}</p>
                    
                    <h4 className="text-white font-semibold mb-2">Langkah-langkah:</h4>
                    <ol className="space-y-2 mb-4">
                      {strategy.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-300 flex items-start space-x-2">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    
                    <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg">
                      <p className="text-blue-200 text-sm">
                        <strong>Cocok untuk:</strong> {strategy.bestFor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Tips Negosiasi dengan Kreditor</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">Persiapan Negosiasi</h3>
                  <ul className="space-y-2">
                    {[
                      "Kumpulkan semua dokumen hutang",
                      "Hitung kemampuan bayar realistis",
                      "Siapkan proposal pembayaran",
                      "Catat semua komunikasi",
                      "Minta konfirmasi tertulis"
                    ].map((item, index) => (
                      <li key={index} className="text-white flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Opsi Negosiasi</h3>
                  <ul className="space-y-2">
                    {[
                      "Perpanjangan jangka waktu pembayaran",
                      "Pengurangan bunga atau denda",
                      "Pembayaran lump sum dengan diskon",
                      "Restrukturisasi hutang",
                      "Payment holiday sementara"
                    ].map((item, index) => (
                      <li key={index} className="text-white flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-900 bg-opacity-50 rounded-lg p-6 border border-red-600">
              <h2 className="text-red-400 font-bold text-xl mb-4">🚫 Hindari Jebakan Hutang</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-bold mb-2">Pinjaman yang Harus Dihindari:</h3>
                  <ul className="text-red-200 space-y-1">
                    <li>• Pinjaman online ilegal (pinjol)</li>
                    <li>• Rentenir atau loan shark</li>
                    <li>• Cash advance kartu kredit</li>
                    <li>• Pinjaman dengan jaminan berlebihan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Red Flags:</h3>
                  <ul className="text-red-200 space-y-1">
                    <li>• Bunga sangat tinggi ({'>'}20% per tahun)</li>
                    <li>• Tidak ada izin OJK</li>
                    <li>• Proses persetujuan terlalu cepat</li>
                    <li>• Meminta akses kontak atau foto pribadi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialGuide;