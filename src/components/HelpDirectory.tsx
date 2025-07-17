import React from 'react';
import { ArrowLeft, Phone, MessageCircle, Users, MapPin, Clock, Heart } from 'lucide-react';

interface HelpDirectoryProps {
  onBack: () => void;
}

const HelpDirectory: React.FC<HelpDirectoryProps> = ({ onBack }) => {
  const emergencyContacts = [
    {
      name: "Hotline Kesehatan Mental",
      phone: "119 ext 8",
      description: "Layanan konsultasi kesehatan mental 24 jam",
      available: "24/7"
    },
    {
      name: "Sejiwa (Yayasan Sehat Jiwa Amini)",
      phone: "119 ext 8",
      description: "Konseling dan dukungan kesehatan mental",
      available: "24/7"
    },
    {
      name: "Into The Light Indonesia",
      phone: "021-78842580",
      description: "Konseling untuk masalah kecanduan dan mental health",
      available: "Senin-Jumat 09:00-17:00"
    }
  ];

  const supportGroups = [
    {
      name: "Gamblers Anonymous Indonesia",
      location: "Jakarta, Surabaya, Bandung",
      description: "Support group untuk penjudi yang ingin pulih",
      contact: "Email: ga.indonesia@gmail.com",
      schedule: "Pertemuan mingguan"
    },
    {
      name: "Komunitas Bebas Judi",
      location: "Online & Offline",
      description: "Komunitas peer support untuk pemulihan dari judi",
      contact: "WhatsApp Group tersedia",
      schedule: "Diskusi harian online"
    }
  ];

  const professionals = [
    {
      name: "Psikolog Klinis",
      specialization: "Kecanduan Behavioral",
      description: "Terapi CBT untuk kecanduan judi",
      locations: ["RS Cipto Mangunkusumo", "RS Persahabatan", "Klinik Swasta"],
      cost: "Rp 300.000 - 800.000 per sesi"
    },
    {
      name: "Psikiater",
      specialization: "Gangguan Kecanduan",
      description: "Diagnosis dan pengobatan medis untuk kecanduan",
      locations: ["RS Jiwa Dr. Soeharto Heerdjan", "RS Omni Alam Sutera"],
      cost: "Rp 400.000 - 1.200.000 per konsultasi"
    },
    {
      name: "Konselor Kecanduan",
      specialization: "Addiction Counseling",
      description: "Konseling khusus untuk berbagai jenis kecanduan",
      locations: ["Yayasan Harapan Permata Hati", "Klinik Rehabilitasi"],
      cost: "Rp 200.000 - 500.000 per sesi"
    }
  ];

  const onlineResources = [
    {
      name: "Aplikasi Mindfulness",
      description: "Headspace, Calm, Insight Timer untuk mengelola stress",
      type: "Mobile App",
      cost: "Gratis - Rp 100.000/bulan"
    },
    {
      name: "Forum Pemulihan Online",
      description: "Reddit r/problemgambling, forum internasional",
      type: "Online Community",
      cost: "Gratis"
    },
    {
      name: "Webinar Edukasi",
      description: "Webinar tentang kecanduan dan pemulihan",
      type: "Educational Content",
      cost: "Gratis - Rp 50.000"
    }
  ];

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
            <h1 className="text-3xl font-bold text-white mb-2">Direktori Bantuan</h1>
            <p className="text-green-300">Temukan bantuan profesional dan support group</p>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 rounded-lg p-4 mb-6 border-2 border-red-400">
          <div className="flex items-center space-x-3">
            <Phone className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-white font-bold text-lg">Darurat? Hubungi Sekarang!</h3>
              <p className="text-white">Hotline Kesehatan Mental: <strong>119 ext 8</strong> (24 jam)</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Emergency Contacts */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-red-400" />
              Kontak Darurat
            </h2>
            <div className="grid md:grid-cols-1 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{contact.name}</h3>
                      <p className="text-gray-300 mb-2">{contact.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-bold">{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400">{contact.available}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Groups */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-400" />
              Support Groups
            </h2>
            <div className="grid md:grid-cols-1 gap-4">
              {supportGroups.map((group, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-white font-bold text-lg mb-2">{group.name}</h3>
                  <p className="text-gray-300 mb-3">{group.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400">{group.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{group.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400">{group.schedule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Help */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-400" />
              Bantuan Profesional
            </h2>
            <div className="space-y-4">
              {professionals.map((prof, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{prof.name}</h3>
                      <p className="text-purple-400">{prof.specialization}</p>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{prof.cost}</span>
                  </div>
                  <p className="text-gray-300 mb-3">{prof.description}</p>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Lokasi Tersedia:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prof.locations.map((location, locIndex) => (
                        <span key={locIndex} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online Resources */}
          <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-green-400" />
              Sumber Daya Online
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {onlineResources.map((resource, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold">{resource.name}</h3>
                    <span className="text-green-400 text-sm">{resource.cost}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{resource.description}</p>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                    {resource.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-6 border border-yellow-600">
            <h2 className="text-yellow-400 font-bold text-xl mb-4">⚠️ Catatan Penting</h2>
            <ul className="text-yellow-200 space-y-2">
              <li>• Jangan ragu untuk mencari bantuan - kecanduan judi adalah masalah medis yang bisa disembuhkan</li>
              <li>• Pemulihan membutuhkan waktu dan dukungan berkelanjutan</li>
              <li>• Libatkan keluarga dan teman dekat dalam proses pemulihan</li>
              <li>• Hindari tempat dan situasi yang memicu keinginan berjudi</li>
              <li>• Fokus pada aktivitas positif dan hobi yang sehat</li>
            </ul>
          </div>

          {/* Crisis Intervention */}
          <div className="bg-red-900 bg-opacity-50 rounded-lg p-6 border border-red-600">
            <h2 className="text-red-400 font-bold text-xl mb-4">🚨 Jika Anda dalam Krisis</h2>
            <div className="text-red-200 space-y-2">
              <p><strong>Segera hubungi:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Hotline Kesehatan Mental: <strong>119 ext 8</strong></li>
                <li>Keluarga atau teman terdekat</li>
                <li>Rumah sakit terdekat jika ada pikiran untuk menyakiti diri</li>
              </ul>
              <p className="mt-4"><strong>Ingat:</strong> Tidak ada masalah yang tidak bisa diselesaikan. Hidup Anda berharga!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDirectory;