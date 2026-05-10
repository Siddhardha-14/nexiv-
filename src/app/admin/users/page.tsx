"use client";

const users = [
  { id: 1, name: "Aravind Kumar", email: "aravind@example.com", role: "student", joined: "Jan 5, 2026", status: "active", projects: 8 },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "student", joined: "Feb 12, 2026", status: "active", projects: 6 },
  { id: 3, name: "Rahul Mehta", email: "rahul@example.com", role: "student", joined: "Mar 1, 2026", status: "active", projects: 10 },
  { id: 4, name: "Rajesh Kumar", email: "rajesh@example.com", role: "mentor", joined: "Dec 1, 2025", status: "active", projects: 0 },
  { id: 5, name: "Sneha Reddy", email: "sneha@example.com", role: "student", joined: "Apr 3, 2026", status: "active", projects: 12 },
  { id: 6, name: "Vikram Tharun", email: "vikram@example.com", role: "student", joined: "Mar 20, 2026", status: "inactive", projects: 3 },
  { id: 7, name: "Dr. Anita Sharma", email: "anita@example.com", role: "mentor", joined: "Jan 15, 2026", status: "active", projects: 0 },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Management</h1>
          <p className="text-[var(--text-secondary)] text-sm">{users.length} total users</p>
        </div>
        <button className="btn-primary text-sm py-2 px-4 rounded-lg">+ Add User</button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Projects</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-primary)]/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{user.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${
                      user.role === "mentor" ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]" :
                      user.role === "admin" ? "bg-[var(--color-error)]/10 text-[var(--color-error)]" :
                      "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{user.joined}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 text-xs ${
                      user.status === "active" ? "text-[var(--color-success)]" : "text-[var(--text-muted)]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-[var(--color-success)]" : "bg-[var(--text-muted)]"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{user.projects}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
