
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SkillHeatmap from './components/SkillHeatmap';
import MentorshipNetwork from './components/MentorshipNetwork';
import MatchFinder from './components/MatchFinder';
import GroupBuilder from './components/GroupBuilder';
import AuthScreen from './components/AuthScreen';
import MentorshipManager from './components/MentorshipManager';
import StatisticsScreen from './components/StatisticsScreen';
import MentorDashboard from './components/MentorDashboard';
import { mockUsers, currentUser as defaultUser, badges } from './services/mockData';
import { User, MentorshipRequest, Badge } from './types';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Data State
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [activeTab, setActiveTab] = useState('matches');
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  
  // Mentorship & Gamification State
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'achievement'} | null>(null);

  // --- Authentication Flow ---
  const handleLogin = (email: string, name: string, isRegistering: boolean) => {
    // Simulate Login/Register validation
    const user = { ...currentUser, email, name, id: isRegistering ? `user-${Date.now()}` : currentUser.id };
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Load Dashboard immediately after login per diagram
    if (user.role === 'Professor') {
        setActiveTab('dashboard');
    } else {
        setActiveTab('my-profile');
    }
  };

  // --- Mentorship Flow Logic ---

  // 1. Request Mentorship
  const handleRequestMentorship = (mentor: User, topic: string) => {
    const newRequest: MentorshipRequest = {
        id: `req-${Date.now()}`,
        mentorId: mentor.id,
        menteeId: currentUser.id,
        mentorName: mentor.name,
        menteeName: currentUser.name,
        topic: topic,
        status: 'pending'
    };
    setMentorshipRequests([...mentorshipRequests, newRequest]);
    setNotification({ message: `Solicitação enviada para ${mentor.name}!`, type: 'success' });
  };

  // 2. Update Status (Accept/Reject/Complete)
  const handleUpdateStatus = (requestId: string, status: 'accepted' | 'rejected' | 'completed') => {
    setMentorshipRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status } : req
    ));
    
    if (status === 'accepted') {
        setNotification({ message: "Mentoria agendada!", type: 'success' });
    }
  };

  // 3. Evaluation & Points (Gamification)
  const handleEvaluateSession = (requestId: string, rating: number) => {
      // Find the request to identify the mentor
      const req = mentorshipRequests.find(r => r.id === requestId);
      if (!req) return;
      
      // Update request with rating
      setMentorshipRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'completed', rating } : r
      ));

      // Award points to Mentor
      if (req.mentorId === currentUser.id) {
          updatePoints(currentUser.id, 50); // If I am mentor
      } else {
          // If I am mentee, update the mock mentor in 'allUsers'
          setAllUsers(prev => prev.map(u => {
              if (u.id === req.mentorId) {
                  return { ...u, points: u.points + 50 }; 
              }
              return u;
          }));
          // Also give some points to mentee for learning
          updatePoints(currentUser.id, 20);
      }
  };

  // 4. Gamification Engine
  const updatePoints = (userId: string, pointsToAdd: number) => {
      setCurrentUser(prev => {
          const newPoints = prev.points + pointsToAdd;
          const newBadges = checkNewBadges(newPoints, prev.badges);
          
          if (newBadges.length > prev.badges.length) {
              const latestBadge = newBadges[newBadges.length - 1];
              setNotification({ 
                  message: `Nova Conquista Desbloqueada: ${latestBadge.name}!`, 
                  type: 'achievement' 
              });
          }
          
          return { ...prev, points: newPoints, badges: newBadges };
      });
  };

  const checkNewBadges = (points: number, currentBadges: Badge[]): Badge[] => {
      const potentialBadges = [...currentBadges];
      // Simple rule: 1000 points = Mestre Yoda
      if (points >= 1000 && !potentialBadges.find(b => b.name === 'Mestre Yoda')) {
          const newBadge = badges.find(b => b.name === 'Mestre Yoda');
          if (newBadge) potentialBadges.push(newBadge);
      }
      return potentialBadges;
  };
  
  // Toggle availability
  const toggleMentorAvailability = () => {
      setCurrentUser(prev => ({...prev, isAvailableMentor: !prev.isAvailableMentor}));
      setNotification({ message: "Status de mentor atualizado!", type: 'info' });
  };

  // --- Effects ---
  
  // Notification Timer
  useEffect(() => {
      if (notification) {
          const timer = setTimeout(() => setNotification(null), 4000);
          return () => clearTimeout(timer);
      }
  }, [notification]);

  // Sync current user to allUsers
  useEffect(() => {
      if(!allUsers.find(u => u.id === currentUser.id)) {
          setAllUsers([...allUsers, currentUser]);
      } else {
          setAllUsers(allUsers.map(u => u.id === currentUser.id ? currentUser : u));
      }
  }, [currentUser]); // Only depend on currentUser changes

  // Toggle for demo purposes to show Professor Dashboard vs Student View
  const toggleUserRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'Student' ? 'Professor' : 'Student',
      isAvailableMentor: prev.role === 'Student' // Become mentor if switching to prof/advanced
    }));
    setActiveTab(currentUser.role === 'Student' ? 'dashboard' : 'my-profile');
  };
  
  const hasAdvancedSkills = currentUser.skills.some(s => s.level === 'Avançado');

  if (!isAuthenticated) {
      return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      {/* Notification Toast */}
      {notification && (
          <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl border animate-slideIn
              ${notification.type === 'achievement' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 
                notification.type === 'success' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 
                'bg-blue-100 border-blue-300 text-blue-800'}`}>
              <div className="flex items-center gap-3">
                  <span className="text-2xl">
                      {notification.type === 'achievement' ? '🏆' : notification.type === 'success' ? '✅' : 'ℹ️'}
                  </span>
                  <div>
                      <h4 className="font-bold text-sm">
                          {notification.type === 'achievement' ? 'Conquista!' : 'Sucesso'}
                      </h4>
                      <p className="text-sm font-medium">{notification.message}</p>
                  </div>
              </div>
          </div>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        toggleUserRole={toggleUserRole}
      />

      <main className="pl-64 min-h-screen">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
                {activeTab === 'matches' ? 'Central de Mentoria' : 
                 activeTab === 'stats' ? 'Estatísticas da Comunidade' :
                 activeTab === 'mentor-stats' ? 'Estatísticas de Ensino' :
                 activeTab.replace('-', ' ')}
            </h2>
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                   <span className="text-xs text-slate-500 font-medium">Turma</span>
                   <span className="text-sm font-bold text-slate-700">Engenharia de Software 2024</span>
               </div>
               <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition relative">
                  🔔
                  {mentorshipRequests.filter(r => r.mentorId === currentUser.id && r.status === 'pending').length > 0 && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
               </button>
            </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* View: Dashboard (Professor) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
               {currentUser.role === 'Student' && (
                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm mb-4">
                       ⚠️ Você está visualizando o Dashboard (Acesso de Professor).
                   </div>
               )}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                      <SkillHeatmap users={allUsers} />
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-lg mb-4 text-slate-800">Resumo da Turma</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-700 font-medium">Total de Alunos</span>
                            <span className="text-2xl font-bold text-blue-900">{allUsers.length}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                            <span className="text-emerald-700 font-medium">Mentores Ativos</span>
                            <span className="text-2xl font-bold text-emerald-900">
                                {allUsers.filter(u => u.isAvailableMentor).length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="text-purple-700 font-medium">Sessões Realizadas</span>
                            <span className="text-2xl font-bold text-purple-900">
                                {mentorshipRequests.filter(r => r.status === 'completed').length + 142}
                            </span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <MentorshipNetwork users={allUsers} />
            </div>
          )}

          {/* View: Profile (Student) */}
          {activeTab === 'my-profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                  <div className="lg:col-span-1 space-y-6">
                      {/* Profile Card */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                          <div className="relative inline-block">
                              <img src={currentUser.avatar} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md" alt="Avatar"/>
                              <div className="absolute bottom-0 right-0 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                                  Nível {Math.floor(currentUser.points / 100) + 1}
                              </div>
                          </div>
                          <h3 className="mt-4 text-xl font-bold text-slate-900">{currentUser.name}</h3>
                          <p className="text-slate-500">{currentUser.email}</p>
                          
                          <div className="mt-6 flex justify-center gap-4 text-center">
                              <div>
                                  <div className="font-bold text-xl text-slate-800">{currentUser.points}</div>
                                  <div className="text-xs text-slate-500 uppercase tracking-wide">Pontos</div>
                              </div>
                              <div>
                                  <div className="font-bold text-xl text-slate-800">{currentUser.badges.length}</div>
                                  <div className="text-xs text-slate-500 uppercase tracking-wide">Badges</div>
                              </div>
                          </div>
                      </div>

                      {/* Badges */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <span>🏆</span> Conquistas
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                              {currentUser.badges.map(badge => (
                                  <div key={badge.id} className="flex flex-col items-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-help group relative">
                                      <span className="text-2xl">{badge.icon}</span>
                                      <span className="text-[10px] text-center mt-1 font-medium text-slate-600 truncate w-full">{badge.name}</span>
                                      <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 bg-slate-800 text-white text-xs p-2 rounded z-20 text-center pointer-events-none">
                                          {badge.description}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                      {/* Mentor Availability Toggle Section */}
                      <div className={`p-6 rounded-xl shadow-sm border transition-all ${currentUser.isAvailableMentor ? 'bg-gradient-to-r from-brand-600 to-brand-800 text-white border-brand-700' : 'bg-white border-slate-200'}`}>
                          <div className="flex justify-between items-center">
                              <div>
                                  <h4 className={`font-bold text-lg ${currentUser.isAvailableMentor ? 'text-white' : 'text-slate-800'}`}>Área do Mentor</h4>
                                  <p className={`text-sm mt-1 ${currentUser.isAvailableMentor ? 'text-brand-100' : 'text-slate-500'}`}>
                                      {hasAdvancedSkills 
                                          ? "Você possui habilidades avançadas! Contribua com a comunidade." 
                                          : "Evolua suas skills para se tornar um mentor."}
                                  </p>
                              </div>
                              
                              {hasAdvancedSkills && (
                                  <div className="flex items-center gap-3">
                                      <span className={`text-sm font-medium ${currentUser.isAvailableMentor ? 'text-brand-100' : 'text-slate-500'}`}>
                                          {currentUser.isAvailableMentor ? 'Disponível' : 'Indisponível'}
                                      </span>
                                      <button 
                                          onClick={toggleMentorAvailability}
                                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${currentUser.isAvailableMentor ? 'bg-white/30' : 'bg-slate-200'}`}
                                      >
                                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${currentUser.isAvailableMentor ? 'translate-x-6' : 'translate-x-1'}`} />
                                      </button>
                                  </div>
                              )}
                          </div>
                          
                          {currentUser.isAvailableMentor && (
                              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4">
                                  <button onClick={() => setActiveTab('mentor-stats')} className="px-4 py-2 bg-white text-brand-700 rounded-lg text-sm font-bold hover:bg-brand-50 transition-colors">
                                      Ver Meu Painel de Mentor
                                  </button>
                              </div>
                          )}
                      </div>

                      {/* Skills */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <div className="flex justify-between items-center mb-6">
                              <h4 className="font-bold text-lg text-slate-800">Minhas Competências</h4>
                              <button className="text-sm text-brand-600 font-medium hover:underline">+ Editar Perfil</button>
                          </div>
                          <div className="space-y-4">
                              {currentUser.skills.map((skill, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                      <div className="font-medium text-slate-700">{skill.name}</div>
                                      <div className={`px-3 py-1 rounded-full text-xs font-bold 
                                          ${skill.level === 'Avançado' ? 'bg-indigo-100 text-indigo-700' : 
                                            skill.level === 'Intermediário' ? 'bg-blue-100 text-blue-700' : 
                                            'bg-slate-200 text-slate-600'}`}>
                                          {skill.level}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Interests */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                           <h4 className="font-bold text-lg text-slate-800 mb-4">Interesses de Aprendizado</h4>
                           <div className="flex flex-wrap gap-2">
                               {currentUser.interests.map((int, idx) => (
                                   <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium border border-emerald-100">
                                       {int}
                                   </span>
                               ))}
                           </div>
                      </div>
                  </div>
              </div>
          )}

          {/* View: Mentor Stats (New) */}
          {activeTab === 'mentor-stats' && (
            <MentorDashboard currentUser={currentUser} requests={mentorshipRequests} />
          )}

          {/* View: Matches (Mentorship Logic) */}
          {activeTab === 'matches' && (
              <div className="animate-fadeIn space-y-8">
                  
                  {/* Tab Switcher for Mentorship Section */}
                  <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl w-fit">
                      <button 
                         className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-slate-800 shadow-sm"
                      >
                         Encontrar Mentor
                      </button>
                  </div>

                  <MatchFinder 
                    currentUser={currentUser} 
                    allUsers={allUsers} 
                    onRequestMentorship={handleRequestMentorship}
                  />

                  <div className="border-t border-slate-200 pt-8">
                      <h2 className="text-xl font-bold text-slate-800 mb-6">Gerenciar Mentorias</h2>
                      <MentorshipManager 
                          currentUser={currentUser}
                          requests={mentorshipRequests}
                          onUpdateStatus={handleUpdateStatus}
                          onEvaluate={handleEvaluateSession}
                      />
                  </div>
              </div>
          )}

          {/* View: Groups (Shared) */}
          {activeTab === 'groups' && (
             <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                     <GroupBuilder users={allUsers} />
                     
                     <div className="mt-8">
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Grupos Existentes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-bold text-slate-800">Hackathon React</h5>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Projeto</span>
                                </div>
                                <p className="text-sm text-slate-600 mb-4 line-clamp-2">Grupo focado em criar o frontend do projeto final em 2 semanas.</p>
                                <div className="flex items-center -space-x-2">
                                    {allUsers.slice(0,3).map(u => (
                                        <img key={u.id} src={u.avatar} className="w-8 h-8 rounded-full border-2 border-white" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 border-2 border-white">+2</div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>
                 
                 <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl p-6 text-white h-fit shadow-lg">
                    <h3 className="font-bold text-xl mb-2">Seu Progresso</h3>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-bold text-3xl">{currentUser.points}</span>
                            <span className="text-xs text-brand-100 mb-1">XP Total</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2 mb-1">
                            <div className="bg-white h-2 rounded-full" style={{width: `${Math.min((currentUser.points / 1000) * 100, 100)}%`}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-brand-100 mt-2">
                            <span>Nível {Math.floor(currentUser.points / 100) + 1}</span>
                            <span>Próximo: {(Math.floor(currentUser.points / 100) + 1) * 100} XP</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-brand-100 text-sm mb-2">Próxima Conquista:</p>
                        <div className="flex items-center gap-3 p-3 bg-brand-700/50 rounded-lg">
                            <span className="text-2xl grayscale opacity-70">🧙‍♂️</span>
                            <div>
                                <p className="font-bold text-sm">Mestre Yoda</p>
                                <p className="text-[10px] text-brand-100">Atinja 1000 pontos de colaboração</p>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
          )}

          {/* View: Stats (Shared) */}
          {activeTab === 'stats' && (
            <StatisticsScreen users={allUsers} />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
