"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-white">
            AK
          </div>
          <div>
            <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium">
              Change Photo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Full Name</label>
            <input
              type="text"
              defaultValue="Aravind Kumar"
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="aravind@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Bio</label>
          <textarea
            rows={3}
            defaultValue="IoT & Embedded Systems enthusiast building connected solutions."
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
          />
        </div>
        <button className="btn-primary text-sm py-2.5 px-5 rounded-lg mt-4">Save Changes</button>
      </div>

      {/* Notifications Section */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-3">
          {[
            { label: "Project reminders", desc: "Get reminded about upcoming deadlines", checked: true },
            { label: "Mentor feedback", desc: "Notify when mentor reviews your submission", checked: true },
            { label: "Team invitations", desc: "Receive team invite notifications", checked: true },
            { label: "Platform updates", desc: "News about new features and tracks", checked: false },
          ].map((item, i) => (
            <label key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg-primary)]/20 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="w-4 h-4 rounded accent-[var(--color-primary)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-6">
        <h2 className="text-lg font-semibold mb-2 text-[var(--color-error)]">Danger Zone</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">Permanently delete your account and all data.</p>
        <button className="px-4 py-2 rounded-lg border border-[var(--color-error)]/30 text-[var(--color-error)] text-sm font-medium hover:bg-[var(--color-error)]/10 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
