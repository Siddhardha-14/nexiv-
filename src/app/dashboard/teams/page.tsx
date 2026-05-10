"use client";

const teams = [
  {
    name: "IoT Builders",
    project: "Smart Home Automation",
    members: [
      { name: "Aravind K.", role: "Team Lead", avatar: "AK" },
      { name: "Priya S.", role: "Frontend Dev", avatar: "PS" },
      { name: "Rahul M.", role: "Hardware Eng", avatar: "RM" },
    ],
    status: "Active",
  },
  {
    name: "Data Squad",
    project: "ML Data Pipeline",
    members: [
      { name: "Aravind K.", role: "Backend Dev", avatar: "AK" },
      { name: "Sneha R.", role: "Team Lead", avatar: "SR" },
      { name: "Vikram T.", role: "Data Eng", avatar: "VT" },
      { name: "Anita P.", role: "ML Engineer", avatar: "AP" },
    ],
    status: "Active",
  },
];

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Teams</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Collaborate with peers on engineering projects
          </p>
        </div>
        <button className="btn-primary text-sm py-2 px-4 rounded-lg flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teams.map((team, i) => (
          <div key={i} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-5 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{team.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">Project: {team.project}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--color-success)]/10 text-[var(--color-success)]">
                {team.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {team.members.map((member, j) => (
                <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--bg-primary)]/30">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
              Invite Member
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
