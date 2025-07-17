import React from 'react';
import { ArrowLeft, User, Code, Heart, Target, Shield, Lightbulb } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Tentang JackStop</h1>
            <p className="text-blue-300">Edukasi Bahaya Judi Online - Melindungi Masyarakat dari Kerugian</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Harapan Saya</h2>
          <p className="text-xl text-white leading-relaxed">
            Melindungi masyarakat Indonesia dari bahaya judi online melalui edukasi yang komprehensif, 
            interaktif, dan berbasis data ilmiah untuk mencegah kerugian finansial dan sosial.
          </p>
        </div>

        {/* About the App */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2" />
            Tentang JackStop
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">🎯 Tujuan</h3>
              <ul className="text-white space-y-2">
                <li>• Mengedukasi masyarakat tentang bahaya judi online</li>
                <li>• Menunjukkan realitas matematika di balik judi</li>
                <li>• Memberikan tools untuk pemulihan</li>
                <li>• Menyediakan direktori bantuan profesional</li>
                <li>• Mencegah kecanduan melalui simulasi realistis</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">✨ Fitur Utama</h3>
              <ul className="text-white space-y-2">
                <li>• Simulasi slot game edukatif</li>
                <li>• Kalkulator kerugian finansial</li>
                <li>• Quiz interaktif</li>
                <li>• Simulator kecanduan</li>
                <li>• Tools pemulihan</li>
                <li>• Panduan finansial</li>
                <li>• Direktori bantuan</li>
                <li>• Sistem gamifikasi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Tentang Developer
          </h2>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600">
                <img 
                  src="/developer-profile.jpg" 
                  alt="Fauzi Fadhlurrohman" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Fauzi Fadhlurrohman</h3>
                <p className="text-blue-400">Software Engineer & Full Stack Developer</p>
                <a 
                  href="https://www.linkedin.com/in/fauzi-fadhlurrohman/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  LinkedIn Profile →
                </a>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-bold mb-2">💼 Keahlian</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Full Stack Development</li>
                  <li>• React, TypeScript, Node.js</li>
                  <li>• Database Design & Management</li>
                  <li>• API Development & Integration</li>
                  <li>• Cloud Computing & DevOps</li>
                  <li>• AI Enthusiast</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-2">🎯 Visi</h4>
                <p className="text-gray-300 text-sm">
                  Berkomitmen untuk menciptakan teknologi yang bermanfaat bagi masyarakat. 
                  JackStop adalah wujud nyata dari visi saya untuk menggunakan keahlian 
                  teknologi dalam mengatasi masalah sosial yang kompleks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-2" />
            Teknologi yang Digunakan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Frontend</h3>
              <ul className="text-white space-y-1">
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Lucide React Icons</li>
                <li>• Web Audio API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Development</h3>
              <ul className="text-white space-y-1">
                <li>• Vite</li>
                <li>• ESLint</li>
                <li>• PostCSS</li>
                <li>• Autoprefixer</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-3">Tools</h3>
              <ul className="text-white space-y-1">
                <li>• Bolt.new AI</li>
                <li>• Local Storage</li>
                <li>• Responsive Design</li>
                <li>• Progressive Web App</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acknowledgments */}
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2" />
            Terima Kasih
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-400 mb-2">🤖 Bolt.new AI</h3>
              <p className="text-gray-300">
                Terima kasih kepada Bolt.new AI yang telah membantu dalam pengembangan JackStop. 
                Dengan bantuan AI, proses development menjadi lebih efisien dan memungkinkan 
                terciptanya fitur-fitur edukatif yang komprehensif.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-center">
          <Lightbulb className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Mari Bersama Melawan Judi Online</h2>
          <p className="text-white mb-4">
            JackStop adalah kontribusi kecil dalam melawan epidemi judi online. 
            Bagikan kepada keluarga dan teman untuk menyebarkan kesadaran.
          </p>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-white font-bold">
              "Pendidikan adalah senjata paling ampuh untuk mengubah dunia" - Nelson Mandela
            </p>
          </div>
        </div>

        {/* Contact & Feedback */}
        <div className="mt-6 bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700 text-center">
          <h2 className="text-xl font-bold text-white mb-4">💬 Feedback & Saran</h2>
          <p className="text-gray-300 mb-4">
            JackStop terus saya kembangkan untuk memberikan edukasi yang lebih baik. 
            Feedback dan saran Anda sangat berharga untuk perbaikan ke depan.
          </p>
          <a 
            href="https://www.linkedin.com/in/fauzi-fadhlurrohman/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Hubungi Developer</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;