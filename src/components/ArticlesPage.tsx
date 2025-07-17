import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Eye, CheckCircle } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  readTime: number;
  category: string;
  isRead: boolean;
}

interface ArticlesPageProps {
  onBack: () => void;
  onArticleRead: (articleId: string) => void;
  readArticles?: string[];
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ onBack, onArticleRead, readArticles = [] }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles: Article[] = [
    {
      id: '1',
      title: 'Mengenal Bahaya Judi Online',
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Mengenal Bahaya Judi Online</h2>
        <p class="text-gray-300 mb-4 leading-relaxed">Judi online telah menjadi masalah serius di Indonesia. Meskipun ilegal, praktik ini masih marak terjadi dan menimbulkan dampak negatif yang besar bagi masyarakat.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Dampak Finansial</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Kerugian finansial adalah dampak paling langsung dari judi online. Pemain sering kali kehilangan uang dalam jumlah besar, bahkan sampai menghabiskan tabungan dan aset keluarga.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Dampak Psikologis</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Kecanduan judi dapat menyebabkan masalah psikologis seperti stres, depresi, dan kecemasan. Pemain sering kali merasa tertekan karena hutang dan tekanan dari keluarga.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Dampak Sosial</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Judi online dapat merusak hubungan keluarga dan sosial. Pemain yang kecanduan sering kali mengabaikan tanggung jawab keluarga dan pekerjaan.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Pencegahan</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Penting untuk memahami bahwa judi online selalu merugikan dalam jangka panjang. House edge yang ada di setiap permainan memastikan bahwa pemain akan selalu kalah dalam jangka waktu yang cukup lama.</p>
      `,
      readTime: 5,
      category: 'dasar',
      isRead: readArticles.includes('1')
    },
    {
      id: '2',
      title: 'House Edge: Mengapa Selalu Kalah',
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">House Edge: Mengapa Selalu Kalah</h2>
        <p class="text-gray-300 mb-4 leading-relaxed">House edge adalah keunggulan matematis yang dimiliki oleh penyedia judi online. Ini adalah alasan mengapa pemain selalu kalah dalam jangka panjang.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Apa itu House Edge?</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">House edge adalah persentase keuntungan yang dijamin akan diperoleh oleh penyedia judi dari setiap taruhan yang dilakukan pemain. Misalnya, jika house edge adalah 2.5%, maka dari setiap Rp 100.000 yang dipertaruhkan, penyedia judi akan mendapat keuntungan Rp 2.500.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Contoh Perhitungan</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Jika Anda bermain dengan budget Rp 1.000.000 dan house edge 2.5%:</p>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Setelah 100 taruhan: Kerugian rata-rata = Rp 25.000</li>
          <li>Setelah 1000 taruhan: Kerugian rata-rata = Rp 250.000</li>
          <li>Setelah 10000 taruhan: Kerugian rata-rata = Rp 2.500.000</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Mengapa Tidak Bisa Menang?</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">House edge memastikan bahwa semakin lama Anda bermain, semakin besar kerugian yang akan dialami. Tidak ada strategi yang dapat mengalahkan house edge dalam jangka panjang.</p>
      `,
      readTime: 7,
      category: 'matematika',
      isRead: readArticles.includes('2')
    },
    {
      id: '3',
      title: 'Tanda-tanda Kecanduan Judi',
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Tanda-tanda Kecanduan Judi</h2>
        <p class="text-gray-300 mb-4 leading-relaxed">Kecanduan judi adalah masalah serius yang dapat mempengaruhi semua aspek kehidupan. Penting untuk mengenali tanda-tanda kecanduan sejak dini.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Tanda-tanda Awal</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Sering memikirkan judi</li>
          <li>Meningkatkan jumlah taruhan untuk mendapatkan sensasi yang sama</li>
          <li>Merasa gelisah atau mudah marah ketika tidak bisa judi</li>
          <li>Menggunakan judi untuk melarikan diri dari masalah</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Tanda-tanda Lanjutan</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Bohong kepada keluarga tentang aktivitas judi</li>
          <li>Menggunakan uang yang seharusnya untuk kebutuhan lain</li>
          <li>Mengabaikan tanggung jawab keluarga dan pekerjaan</li>
          <li>Mencoba berhenti judi tapi tidak berhasil</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Dampak pada Keluarga</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Kecanduan judi tidak hanya mempengaruhi pemain, tetapi juga keluarga. Anak-anak dapat mengalami trauma dan masalah keuangan keluarga dapat menjadi serius.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Kapan Mencari Bantuan?</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Jika Anda atau orang terdekat menunjukkan tanda-tanda kecanduan judi, segera cari bantuan profesional. Semakin cepat ditangani, semakin besar kemungkinan untuk pulih.</p>
      `,
      readTime: 6,
      category: 'psikologi',
      isRead: readArticles.includes('3')
    },
    {
      id: '4',
      title: 'Strategi Pemulihan dari Kecanduan',
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Strategi Pemulihan dari Kecanduan Judi</h2>
        <p class="text-gray-300 mb-4 leading-relaxed">Pemulihan dari kecanduan judi membutuhkan waktu dan usaha yang serius. Berikut adalah beberapa strategi yang dapat membantu.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Langkah Pertama: Mengakui Masalah</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Langkah paling penting adalah mengakui bahwa ada masalah dengan judi. Tanpa pengakuan ini, proses pemulihan tidak akan berhasil.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Mencari Dukungan</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Bergabung dengan kelompok dukungan</li>
          <li>Konsultasi dengan terapis atau konselor</li>
          <li>Mendapatkan dukungan dari keluarga dan teman</li>
          <li>Menghubungi hotline bantuan kecanduan judi</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Mengelola Keuangan</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Penting untuk mengelola keuangan dengan baik selama proses pemulihan:</p>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Buat anggaran yang ketat</li>
          <li>Hindari akses ke uang tunai yang berlebihan</li>
          <li>Buat rencana pembayaran hutang</li>
          <li>Konsultasi dengan penasihat keuangan</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Mengembangkan Hobi Baru</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Mengganti aktivitas judi dengan hobi yang positif dapat membantu proses pemulihan. Pilih aktivitas yang memberikan kepuasan dan tidak melibatkan uang.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Menjaga Kesehatan Mental</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Kesehatan mental sangat penting selama proses pemulihan. Lakukan aktivitas yang menenangkan seperti meditasi, olahraga, atau menghabiskan waktu dengan keluarga.</p>
      `,
      readTime: 8,
      category: 'pemulihan',
      isRead: readArticles.includes('4')
    },
    {
      id: '5',
      title: 'Peran Teknologi dalam Pencegahan',
      content: `
        <h2 class="text-2xl font-bold text-white mb-4">Peran Teknologi dalam Pencegahan Judi Online</h2>
        <p class="text-gray-300 mb-4 leading-relaxed">Teknologi dapat menjadi pedang bermata dua. Meskipun judi online menggunakan teknologi, teknologi juga dapat digunakan untuk pencegahan dan edukasi.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Platform Edukasi Digital</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Platform seperti JackStop menggunakan teknologi untuk memberikan edukasi yang interaktif dan menarik. Simulasi dan kalkulator dapat membantu orang memahami bahaya judi dengan lebih baik.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Filter dan Pembatasan</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Teknologi dapat digunakan untuk:</p>
        <ul class="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
          <li>Memblokir akses ke situs judi online</li>
          <li>Membatasi waktu penggunaan internet</li>
          <li>Memantau aktivitas online</li>
          <li>Memberikan peringatan ketika ada aktivitas mencurigakan</li>
        </ul>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Komunitas Online</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Platform online dapat menjadi tempat untuk membangun komunitas yang mendukung pemulihan. Forum dan grup dukungan online dapat memberikan dukungan 24/7.</p>
        
        <h3 class="text-xl font-bold text-blue-400 mb-3 mt-6">Masa Depan Teknologi Pencegahan</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">Dengan perkembangan AI dan machine learning, teknologi pencegahan judi akan menjadi lebih canggih. Sistem dapat mendeteksi pola perilaku berisiko dan memberikan intervensi dini.</p>
      `,
      readTime: 6,
      category: 'teknologi',
      isRead: readArticles.includes('5')
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Artikel' },
    { id: 'dasar', name: 'Dasar-dasar' },
    { id: 'matematika', name: 'Matematika Judi' },
    { id: 'psikologi', name: 'Psikologi' },
    { id: 'pemulihan', name: 'Pemulihan' },
    { id: 'teknologi', name: 'Teknologi' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const handleMarkAsRead = (articleId: string) => {
    onArticleRead(articleId);
    if (selectedArticle) {
      setSelectedArticle({ ...selectedArticle, isRead: true });
    }
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleBackToList}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Daftar</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Artikel Edukatif</h1>
              <p className="text-blue-300">Pembelajaran tentang bahaya judi online</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-black bg-opacity-50 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedArticle.title}</h2>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedArticle.readTime} menit baca</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{categories.find(cat => cat.id === selectedArticle.category)?.name}</span>
                  </div>
                </div>
              </div>
              {!selectedArticle.isRead && (
                <button
                  onClick={() => handleMarkAsRead(selectedArticle.id)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Tandai Sudah Dibaca</span>
                </button>
              )}
              {selectedArticle.isRead && (
                <div className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span>Sudah Dibaca</span>
                </div>
              )}
            </div>
            
            <div 
              className="text-white max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Artikel Edukatif</h1>
            <p className="text-blue-300">Pelajari tentang bahaya judi online melalui artikel informatif</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className={`bg-black bg-opacity-50 rounded-lg p-6 border transition-all cursor-pointer hover:scale-105 ${
                article.isRead 
                  ? 'border-green-500 bg-green-900 bg-opacity-20' 
                  : 'border-gray-700 hover:border-blue-500'
              }`}
              onClick={() => handleArticleClick(article)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} menit</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{categories.find(cat => cat.id === article.category)?.name}</span>
                    </div>
                  </div>
                </div>
                {article.isRead && (
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-blue-300">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Baca Artikel</span>
                </div>
                {article.isRead && (
                  <span className="text-green-400 text-sm font-medium">✓ Sudah Dibaca</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Statistik Membaca</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{articles.length}</div>
              <div className="text-gray-300">Total Artikel</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{readArticles.length}</div>
              <div className="text-gray-300">Sudah Dibaca</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round((readArticles.length / articles.length) * 100)}%
              </div>
              <div className="text-gray-300">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage; 