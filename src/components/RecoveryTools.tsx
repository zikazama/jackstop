import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Target, Award, Clock, DollarSign, Plus, Minus } from 'lucide-react';
import { playSuccessSound, playClickSound } from '../utils/soundEffects';

interface RecoveryToolsProps {
  onBack: () => void;
}

interface RecoveryData {
  cleanDays: number;
  startDate: string;
  moneySaved: number;
  goals: Goal[];
  milestones: Milestone[];
  dailyCheckins: DailyCheckin[];
}

interface Goal {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  completed: boolean;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  daysRequired: number;
  achieved: boolean;
  achievedDate?: string;
}

interface DailyCheckin {
  date: string;
  mood: number;
  urgeLevel: number;
  activities: string[];
  notes: string;
}

const RecoveryTools: React.FC<RecoveryToolsProps> = ({ onBack }) => {
  const [recoveryData, setRecoveryData] = useState<RecoveryData>(() => {
    const saved = localStorage.getItem('recoveryData');
    return saved ? JSON.parse(saved) : {
      cleanDays: 0,
      startDate: '',
      moneySaved: 0,
      goals: [],
      milestones: [
        { id: 1, title: "1 Hari Bebas Judi", description: "Hari pertama tanpa berjudi", daysRequired: 1, achieved: false },
        { id: 2, title: "1 Minggu Bebas Judi", description: "Satu minggu penuh tanpa berjudi", daysRequired: 7, achieved: false },
        { id: 3, title: "1 Bulan Bebas Judi", description: "Satu bulan tanpa berjudi", daysRequired: 30, achieved: false },
        { id: 4, title: "3 Bulan Bebas Judi", description: "Tiga bulan tanpa berjudi", daysRequired: 90, achieved: false },
        { id: 5, title: "6 Bulan Bebas Judi", description: "Enam bulan tanpa berjudi", daysRequired: 180, achieved: false },
        { id: 6, title: "1 Tahun Bebas Judi", description: "Satu tahun penuh tanpa berjudi", daysRequired: 365, achieved: false }
      ],
      dailyCheckins: []
    };
  });

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [showMoneySavedPopup, setShowMoneySavedPopup] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [progressAmount, setProgressAmount] = useState(0);
  const [progressType, setProgressType] = useState<'add' | 'subtract'>('add');
  const [moneySavedAmount, setMoneySavedAmount] = useState(0);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: 0,
    deadline: ''
  });
  const [todayCheckin, setTodayCheckin] = useState({
    mood: 5,
    urgeLevel: 1,
    activities: [] as string[],
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('recoveryData', JSON.stringify(recoveryData));
  }, [recoveryData]);

  useEffect(() => {
    if (recoveryData.startDate) {
      const startDate = new Date(recoveryData.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setRecoveryData(prev => ({
        ...prev,
        cleanDays: diffDays,
        milestones: prev.milestones.map(milestone => ({
          ...milestone,
          achieved: diffDays >= milestone.daysRequired && !milestone.achieved ? true : milestone.achieved,
          achievedDate: diffDays >= milestone.daysRequired && !milestone.achieved ? today.toISOString().split('T')[0] : milestone.achievedDate
        }))
      }));
    }
  }, [recoveryData.startDate]);

  const startRecovery = () => {
    playSuccessSound();
    const today = new Date().toISOString().split('T')[0];
    setRecoveryData(prev => ({
      ...prev,
      startDate: today,
      cleanDays: 1
    }));
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) return;
    
    playClickSound();
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      deadline: newGoal.deadline,
      completed: false
    };
    
    setRecoveryData(prev => ({
      ...prev,
      goals: [...prev.goals, goal]
    }));
    
    setNewGoal({ title: '', description: '', targetAmount: 0, deadline: '' });
    setShowGoalForm(false);
  };

  const openProgressPopup = (goal: Goal) => {
    setSelectedGoal(goal);
    setProgressAmount(0);
    setProgressType('add');
    setShowProgressPopup(true);
  };

  const updateGoalProgress = () => {
    if (!selectedGoal || progressAmount <= 0) return;
    
    playClickSound();
    const finalAmount = progressType === 'add' ? progressAmount : -progressAmount;
    
    setRecoveryData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === selectedGoal.id 
          ? { 
              ...goal, 
              currentAmount: Math.max(0, Math.min(goal.targetAmount, goal.currentAmount + finalAmount)),
              completed: goal.currentAmount + finalAmount >= goal.targetAmount
            }
          : goal
      )
    }));
    
    setShowProgressPopup(false);
    setSelectedGoal(null);
    setProgressAmount(0);
  };

  const updateMoneySaved = () => {
    if (moneySavedAmount <= 0) return;
    
    playClickSound();
    setRecoveryData(prev => ({
      ...prev,
      moneySaved: prev.moneySaved + moneySavedAmount
    }));
    
    setShowMoneySavedPopup(false);
    setMoneySavedAmount(0);
  };

  const submitDailyCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    const checkin: DailyCheckin = {
      date: today,
      mood: todayCheckin.mood,
      urgeLevel: todayCheckin.urgeLevel,
      activities: todayCheckin.activities,
      notes: todayCheckin.notes
    };
    
    setRecoveryData(prev => ({
      ...prev,
      dailyCheckins: [checkin, ...prev.dailyCheckins.filter(c => c.date !== today)]
    }));
    
    setShowCheckinForm(false);
    playSuccessSound();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const motivationalQuotes = [
    "Setiap hari tanpa judi adalah kemenangan",
    "Kamu lebih kuat dari kecanduan",
    "Masa depan cerah menanti di depan",
    "Satu hari pada satu waktu",
    "Pemulihan adalah perjalanan, bukan tujuan"
  ];

  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

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
            <h1 className="text-3xl font-bold text-white mb-2">Tools Pemulihan</h1>
            <p className="text-pink-300">Alat bantu untuk mendukung perjalanan pemulihan Anda</p>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">💪 Motivasi Hari Ini</h2>
          <p className="text-xl text-white italic">"{todayQuote}"</p>
        </div>

        {!recoveryData.startDate ? (
          /* Start Recovery */
          <div className="bg-black bg-opacity-50 rounded-lg p-8 border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Mulai Perjalanan Pemulihan</h2>
            <p className="text-gray-300 mb-6">
              Hari ini adalah hari pertama dari hidup baru Anda tanpa judi. 
              Klik tombol di bawah untuk memulai tracking pemulihan.
            </p>
            <button
              onClick={startRecovery}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
            >
              Mulai Pemulihan Hari Ini
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-green-700 text-center">
                <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Hari Bebas Judi</h3>
                <div className="text-4xl font-bold text-green-400">{recoveryData.cleanDays}</div>
                <p className="text-gray-300 mt-2">Sejak {new Date(recoveryData.startDate).toLocaleDateString('id-ID')}</p>
              </div>

              <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-blue-700 text-center">
                <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Uang Diselamatkan</h3>
                <div className="text-2xl font-bold text-blue-400">{formatCurrency(recoveryData.moneySaved)}</div>
                <button
                  onClick={() => {
                    setMoneySavedAmount(0);
                    setShowMoneySavedPopup(true);
                  }}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Update
                </button>
              </div>

              <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-purple-700 text-center">
                <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Milestone Tercapai</h3>
                <div className="text-4xl font-bold text-purple-400">
                  {recoveryData.milestones.filter(m => m.achieved).length}
                </div>
                <p className="text-gray-300 mt-2">dari {recoveryData.milestones.length} milestone</p>
              </div>
            </div>

            {/* Daily Check-in */}
            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Check-in Harian</h2>
                    <p className="text-green-300 text-sm">Pantau mood dan keinginan judi harian</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCheckinForm(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ✨ Check-in Hari Ini
                </button>
              </div>
              
              {recoveryData.dailyCheckins.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-8 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Belum Ada Check-in</h3>
                  <p className="text-gray-300">Mulai check-in harian untuk memantau progress pemulihan Anda!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {recoveryData.dailyCheckins.slice(0, 4).map((checkin, index) => {
                    const moodEmoji = checkin.mood >= 8 ? '😊' : checkin.mood >= 6 ? '🙂' : checkin.mood >= 4 ? '😐' : '😔';
                    const urgeEmoji = checkin.urgeLevel >= 8 ? '🔥' : checkin.urgeLevel >= 6 ? '😤' : checkin.urgeLevel >= 4 ? '😰' : '😌';
                    const moodColor = checkin.mood >= 8 ? 'text-green-400' : checkin.mood >= 6 ? 'text-yellow-400' : checkin.mood >= 4 ? 'text-orange-400' : 'text-red-400';
                    const urgeColor = checkin.urgeLevel >= 8 ? 'text-red-400' : checkin.urgeLevel >= 6 ? 'text-orange-400' : checkin.urgeLevel >= 4 ? 'text-yellow-400' : 'text-green-400';
                    
                    return (
                      <div key={index} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-600/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full mr-3">
                              <span className="text-white text-sm font-bold">
                                {new Date(checkin.date).getDate()}
                              </span>
                            </div>
                            <div>
                              <span className="text-white font-bold text-lg">
                                {new Date(checkin.date).toLocaleDateString('id-ID', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{moodEmoji}</span>
                              <span className="text-white font-medium">Mood</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-600 rounded-full h-2 mr-3">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${moodColor.replace('text-', 'bg-')}`}
                                  style={{ width: `${(checkin.mood / 10) * 100}%` }}
                                ></div>
                              </div>
                              <span className={`font-bold ${moodColor}`}>{checkin.mood}/10</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{urgeEmoji}</span>
                              <span className="text-white font-medium">Keinginan Judi</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-600 rounded-full h-2 mr-3">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${urgeColor.replace('text-', 'bg-')}`}
                                  style={{ width: `${(checkin.urgeLevel / 10) * 100}%` }}
                                ></div>
                              </div>
                              <span className={`font-bold ${urgeColor}`}>{checkin.urgeLevel}/10</span>
                            </div>
                          </div>
                        </div>
                        
                        {checkin.notes && (
                          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <div className="flex items-start">
                              <span className="text-blue-400 mr-2">💭</span>
                              <p className="text-gray-200 text-sm italic">"{checkin.notes}"</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-gray-600/30">
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Check-in #{index + 1}</span>
                            <span>{new Date(checkin.date).toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {recoveryData.dailyCheckins.length > 4 && (
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Menampilkan 4 check-in terbaru dari {recoveryData.dailyCheckins.length} total check-in
                  </p>
                </div>
              )}
            </div>

            {/* Milestones */}
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Milestone Pemulihan
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recoveryData.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`p-4 rounded-lg border-2 ${
                      milestone.achieved
                        ? 'bg-green-900 bg-opacity-50 border-green-600'
                        : recoveryData.cleanDays >= milestone.daysRequired
                        ? 'bg-yellow-900 bg-opacity-50 border-yellow-600'
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold">{milestone.title}</h3>
                      {milestone.achieved && <Award className="w-6 h-6 text-yellow-400" />}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{milestone.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {milestone.daysRequired} hari diperlukan
                      </span>
                      {milestone.achieved && milestone.achievedDate && (
                        <span className="text-green-400 text-sm">
                          Tercapai: {new Date(milestone.achievedDate).toLocaleDateString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Target Finansial
                </h2>
                <button
                  onClick={() => setShowGoalForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tambah Target
                </button>
              </div>
              
              {recoveryData.goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Belum ada target finansial. Tambahkan target untuk memotivasi pemulihan!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recoveryData.goals.map((goal) => (
                    <div key={goal.id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-bold">{goal.title}</h3>
                          <p className="text-gray-300 text-sm">{goal.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          goal.completed ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {goal.completed ? 'Tercapai' : 'Dalam Progress'}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-white">
                            {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {!goal.completed && (
                        <button
                          onClick={() => openProgressPopup(goal)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          Update Progress
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Goal Form Modal */}
        {showGoalForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Tambah Target Finansial</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama target (contoh: Dana Darurat)"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
                <textarea
                  placeholder="Deskripsi target"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Target jumlah (IDR)"
                  value={newGoal.targetAmount ? formatCurrency(newGoal.targetAmount) : ''}
                  onChange={(e) => {
                    // Hapus karakter non-digit sebelum parsing
                    const raw = e.target.value.replace(/[^\d]/g, '');
                    setNewGoal(prev => ({ ...prev, targetAmount: Number(raw) }));
                  }}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addGoal}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Tambah Target
                </button>
                <button
                  onClick={() => setShowGoalForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Check-in Form Modal */}
        {showCheckinForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Check-in Harian</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-bold mb-2">
                    Mood Hari Ini (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={todayCheckin.mood}
                    onChange={(e) => setTodayCheckin(prev => ({ ...prev, mood: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-white">{todayCheckin.mood}/10</div>
                </div>
                
                <div>
                  <label className="block text-white font-bold mb-2">
                    Tingkat Keinginan Judi (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={todayCheckin.urgeLevel}
                    onChange={(e) => setTodayCheckin(prev => ({ ...prev, urgeLevel: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-white">{todayCheckin.urgeLevel}/10</div>
                </div>
                
                <textarea
                  placeholder="Catatan hari ini (opsional)"
                  value={todayCheckin.notes}
                  onChange={(e) => setTodayCheckin(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={submitDailyCheckin}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Submit Check-in
                </button>
                <button
                  onClick={() => setShowCheckinForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Update Popup */}
        {showProgressPopup && selectedGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Update Progress Target "{selectedGoal.title}"</h3>
              
              <div className="space-y-4">
                {/* Current Progress Info */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Jumlah Saat Ini:</span>
                    <span className="text-white font-bold">{formatCurrency(selectedGoal.currentAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Target:</span>
                    <span className="text-white font-bold">{formatCurrency(selectedGoal.targetAmount)}</span>
                  </div>
                </div>

                {/* Progress Type Selection */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setProgressType('add')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                      progressType === 'add' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Tambah
                  </button>
                  <button
                    onClick={() => setProgressType('subtract')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                      progressType === 'subtract' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Minus className="w-5 h-5 mr-2" />
                    Kurangi
                  </button>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Jumlah yang ingin {progressType === 'add' ? 'ditambahkan' : 'dikurangi'}:
                  </label>
                  <input
                    type="text"
                    value={progressAmount ? formatCurrency(progressAmount) : ''}
                    onChange={(e) => {
                      // Hapus karakter non-digit sebelum parsing
                      const raw = e.target.value.replace(/[^\d]/g, '');
                      setProgressAmount(Math.max(0, Number(raw)));
                    }}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg text-center text-lg"
                    placeholder="0"
                  />
                </div>

                {/* Preview */}
                {progressAmount > 0 && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-center">
                      <span className="text-gray-300 text-sm">Setelah update:</span>
                      <div className="text-white font-bold text-lg">
                        {formatCurrency(
                          progressType === 'add' 
                            ? selectedGoal.currentAmount + progressAmount
                            : Math.max(0, selectedGoal.currentAmount - progressAmount)
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={updateGoalProgress}
                  disabled={progressAmount <= 0}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                    progressAmount > 0 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-500 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Update Progress
                </button>
                <button
                  onClick={() => {
                    setShowProgressPopup(false);
                    setSelectedGoal(null);
                    setProgressAmount(0);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Money Saved Update Popup */}
        {showMoneySavedPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-blue-400" />
                Update Uang Diselamatkan
              </h3>
              
              <div className="space-y-4">
                {/* Current Money Saved Info */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-center">
                    <span className="text-gray-300 text-sm">Total Uang Diselamatkan Saat Ini:</span>
                    <div className="text-white font-bold text-xl">{formatCurrency(recoveryData.moneySaved)}</div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-white font-bold mb-2">
                    Jumlah uang yang diselamatkan hari ini:
                  </label>
                  <input
                    type="text"
                    value={moneySavedAmount ? formatCurrency(moneySavedAmount) : ''}
                    onChange={(e) => {
                      // Hapus karakter non-digit sebelum parsing
                      const raw = e.target.value.replace(/[^\d]/g, '');
                      setMoneySavedAmount(Math.max(0, Number(raw)));
                    }}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg text-center text-lg"
                    placeholder="0"
                  />
                </div>

                {/* Preview */}
                {moneySavedAmount > 0 && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-center">
                      <span className="text-gray-300 text-sm">Total setelah update:</span>
                      <div className="text-white font-bold text-lg">
                        {formatCurrency(recoveryData.moneySaved + moneySavedAmount)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={updateMoneySaved}
                  disabled={moneySavedAmount <= 0}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                    moneySavedAmount > 0 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-500 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Update Uang Diselamatkan
                </button>
                <button
                  onClick={() => {
                    setShowMoneySavedPopup(false);
                    setMoneySavedAmount(0);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
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

export default RecoveryTools;