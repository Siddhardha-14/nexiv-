"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc, 
  doc, 
  arrayUnion,
  serverTimestamp 
} from "firebase/firestore";
import { projects } from "@/data/siteData";

interface TeamMember {
  uid: string;
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  members: TeamMember[];
  status: "Active" | "Completed";
  createdBy: string;
  createdAt: any;
}

export default function TeamsPage() {
  const { user, userProfile } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Team Modal State
  const [showModal, setShowModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Hook up active Firestore stream
  useEffect(() => {
    const q = query(collection(db, "teams"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Team[];
      setTeams(items);
      setLoading(false);
    }, (err) => {
      console.error("Error querying teams stream:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to get initials for user avatar
  const getInitials = (name: string) => {
    if (!name) return "??";
    const tokens = name.trim().split(/\s+/);
    if (tokens.length >= 2) {
      return (tokens[0][0] + tokens[1][0]).toUpperCase();
    }
    return tokens[0].slice(0, 2).toUpperCase();
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;
    if (!newTeamName.trim() || !selectedProjectId) {
      setFormError("Please populate all inputs before building team.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const selectedProject = projects.find(p => p.id === selectedProjectId);
      const projectName = selectedProject ? selectedProject.title : "Unknown Project";

      const memberName = userProfile.fullName || user.displayName || "Anonymous Developer";
      const memberAvatar = getInitials(memberName);

      const newTeamData = {
        name: newTeamName.trim(),
        projectId: selectedProjectId,
        projectName,
        status: "Active",
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        members: [
          {
            uid: user.uid,
            name: memberName,
            role: "Team Lead",
            avatar: memberAvatar
          }
        ]
      };

      await addDoc(collection(db, "teams"), newTeamData);
      
      // Reset form & dismiss modal
      setNewTeamName("");
      setSelectedProjectId("");
      setShowModal(false);
    } catch (err: any) {
      console.error("Failed to instantiate team document:", err);
      setFormError(err.message || "Persistence error occured.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    if (!user || !userProfile) {
      alert("Authentication session required to onboard.");
      return;
    }

    try {
      const memberName = userProfile.fullName || user.displayName || "Anonymous Developer";
      const memberAvatar = getInitials(memberName);

      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, {
        members: arrayUnion({
          uid: user.uid,
          name: memberName,
          role: "Fullstack Developer",
          avatar: memberAvatar
        })
      });
    } catch (err) {
      console.error("Failed updating team member array:", err);
      alert("Could not join team at this time. Please attempt again.");
    }
  };

  return (
    <div className="space-y-8 pb-12 relative animate-fade-in">
      {/* Page Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-3">
            <span className="w-2 h-8 bg-[#FF4B3A] rounded-full" />
            Collaboration Desk
          </h1>
          <p className="text-[#8C8C8C] text-sm font-medium mt-1 ml-5">
            Unite forces with peer engineers to execute scalable platform systems.
          </p>
        </div>
        <button
          onClick={() => {
            setFormError("");
            setShowModal(true);
          }}
          disabled={loading || !user}
          className="btn-primary text-[14px] font-black tracking-wide py-3.5 px-6 rounded-2xl flex items-center gap-2 hover:-translate-y-0.5 shadow-md transition-all shrink-0 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Formulate Team
        </button>
      </div>

      {/* Main Content Streams */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#FAFAFA] border-t-[#FF4B3A] animate-spin" />
          <p className="text-xs font-black tracking-widest text-[#A1A1A1] uppercase animate-pulse">
            Streaming active registers...
          </p>
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-24 bg-[#FAFAFA] rounded-[36px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-white rounded-3xl border border-gray-50 shadow-sm flex items-center justify-center mx-auto text-3xl mb-6">
            🤝
          </div>
          <h3 className="text-xl font-black text-[#1A1A1A]">No Active Fronts Logged</h3>
          <p className="text-sm text-[#8C8C8C] max-w-sm mx-auto mt-2 font-medium leading-relaxed">
            Be the initiator! Instantiate the inaugural developer squad and launch your collaborative engineering track.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 bg-white border border-gray-200 py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:border-[#FF4B3A] transition-colors shadow-sm"
          >
            ✨ Build Founding Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => {
            const isUserInTeam = team.members.some(m => m.uid === user?.uid);
            return (
              <div key={team.id} className="bg-white rounded-[32px] border border-gray-100 p-7 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden border-l-[5px]" style={{ borderLeftColor: isUserInTeam ? "#10B981" : "#E5E7EB" }}>
                {/* Status pill */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-black text-[#1A1A1A] group-hover:text-[#FF4B3A] transition-colors leading-snug tracking-tight">{team.name}</h3>
                    <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#FF4B3A] bg-[#FFF3E3] px-2 py-0.5 rounded-md mt-1.5">
                      🛰️ {projects.find(p => p.id === team.projectId)?.trackId || "core"}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 ${
                    team.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    ● {team.status}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-[11px] font-black text-[#A1A1A1] uppercase tracking-widest mb-2">Assigned Project Objective</div>
                  <p className="text-sm font-bold text-[#333] leading-snug bg-[#FAFAFA] border border-gray-50 p-3 rounded-xl truncate" title={team.projectName}>
                    {team.projectName}
                  </p>
                </div>

                {/* Members section */}
                <div className="flex-1 space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#A1A1A1] uppercase tracking-widest">Active Crew ({team.members.length})</span>
                  </div>
                  
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
                    {team.members.map((member, j) => (
                      <div key={j} className={`flex items-center gap-3 p-2.5 rounded-xl border ${member.uid === user?.uid ? "bg-emerald-50/30 border-emerald-100/50" : "bg-white border-gray-100/80"} shadow-sm`}>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.uid === user?.uid ? "from-emerald-400 to-emerald-600" : "from-[#FF4B3A] to-[#FF8A65]"} flex items-center justify-center text-white text-[11px] font-black shadow-sm flex-shrink-0`}>
                          {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-black text-[#1A1A1A] truncate leading-tight flex items-center gap-1.5">
                            {member.name}
                            {member.uid === user?.uid && (
                              <span className="text-[8px] bg-emerald-500 text-white px-1 py-0.5 rounded-md">YOU</span>
                            )}
                          </p>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${member.role === "Team Lead" ? "text-[#FF4B3A]" : "text-[#8C8C8C]"}`}>
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Control buttons */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  {isUserInTeam ? (
                    <button
                      className="w-full py-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-default"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Active Team Roster
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinTeam(team.id)}
                      className="w-full py-3 rounded-2xl bg-[#FAFAFA] text-[#1A1A1A] border border-gray-200 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FF4B3A] hover:text-white hover:border-[#FF4B3A] transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Join Integration Track
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE TEAM FLOATING MODAL LAYER */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[36px] p-8 md:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] border border-gray-100 animate-scale-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#FF4B3A] rounded-full" />
                Formulate New Team
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-8 h-8 rounded-xl bg-[#FAFAFA] border border-gray-100 text-[#8C8C8C] flex items-center justify-center hover:text-red-500 hover:border-red-100 transition-all"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 border border-red-100">
                <span>⚠️</span> {formError}
              </div>
            )}

            <form onSubmit={handleCreateTeam} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-[#8C8C8C] uppercase tracking-widest mb-2.5">Squad Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. IoT Devmasters, Neural Net Ninjas"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-[15px] font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#FF4B3A] focus:ring-1 focus:ring-[#FF4B3A] transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#8C8C8C] uppercase tracking-widest mb-2.5">Select Objective Project *</label>
                <select
                  required
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-[15px] font-bold focus:outline-none focus:border-[#FF4B3A] focus:ring-1 focus:ring-[#FF4B3A] transition-all shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%238C8C8C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
                >
                  <option value="" className="font-medium text-gray-400">-- Select project core --</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id} className="font-semibold text-[#1A1A1A]">
                      [{proj.trackId.toUpperCase()}] {proj.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF3E3] border border-[#FFDDB5] flex gap-3 items-start">
                <span className="text-xl">👑</span>
                <div>
                  <p className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wide">Team Leadership Role</p>
                  <p className="text-[11px] font-bold text-[#7A5D38] leading-relaxed mt-0.5">
                    As the builder of this squad, you will automatically be registered as the **Team Lead**.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 rounded-2xl bg-[#FAFAFA] border border-gray-200 text-[#1A1A1A] text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 rounded-2xl btn-primary text-white text-xs font-black uppercase tracking-widest shadow-md shadow-[#FF4B3A]/10 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Deploy Team"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
