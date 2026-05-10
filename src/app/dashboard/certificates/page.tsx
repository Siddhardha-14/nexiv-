"use client";

const certificates = [
  { title: "Smart Home Automation System", track: "IoT", date: "Apr 15, 2026", code: "NXV-IOT-2026-0847", score: 92 },
  { title: "Real-Time Task Scheduler", track: "Embedded Systems", date: "Mar 20, 2026", code: "NXV-EMB-2026-0623", score: 88 },
  { title: "FinTech Analytics Dashboard", track: "UI/UX Design", date: "Feb 10, 2026", code: "NXV-UIX-2026-0415", score: 95 },
  { title: "ML Data Pipeline System", track: "Data Analytics", date: "Jan 5, 2026", code: "NXV-DAT-2026-0201", score: 90 },
  { title: "Python API Server", track: "Python Engineering", date: "Dec 12, 2025", code: "NXV-PYT-2025-1198", score: 87 },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Certificates</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Your earned engineering certificates with verification codes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 overflow-hidden card-hover"
          >
            {/* Certificate Preview */}
            <div className="h-36 bg-gradient-to-br from-[var(--color-primary)]/15 via-[var(--bg-surface)] to-[var(--color-accent)]/10 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">Certificate of Completion</div>
              </div>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--color-success)]/10 text-[var(--color-success)]">
                Verified
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-1">{cert.title}</h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">{cert.track} • {cert.date} • Score: {cert.score}%</p>
              <div className="flex items-center justify-between">
                <code className="text-xs text-[var(--text-muted)] bg-[var(--bg-primary)]/50 px-2 py-1 rounded font-mono">
                  {cert.code}
                </code>
                <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
