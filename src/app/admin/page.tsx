"use client";

const chartBars = [35, 48, 62, 55, 78, 85, 72, 90, 68, 95, 88, 100];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Platform Overview</h1>
          <p className="text-base font-medium text-[#8C8C8C] mt-1">Real-time telemetry and platform health monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 border border-gray-200 rounded-full bg-white text-[#1A1A1A] text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all">
            <svg className="w-4 h-4 text-[#A1A1A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Audit
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,247", change: "+12%", color: "#FF4B3A", icon: "👥" },
          { label: "Active Students", value: "892", change: "+8%", color: "#1A1A1A", icon: "🎓" },
          { label: "Revenue (MTD)", value: "₹4.2L", change: "+23%", color: "#10B981", icon: "💰" },
          { label: "Certifications", value: "156", change: "+15%", color: "#F59E0B", icon: "🏆" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${stat.color}10` }}>
                {stat.icon}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                i % 2 === 0 ? "bg-green-50 text-green-600" : "bg-[#FFF3E3] text-[#FF4B3A]"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-black tracking-tight text-[#1A1A1A]">{stat.value}</div>
            <p className="text-sm font-bold text-[#8C8C8C] mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-black tracking-tight text-[#1A1A1A]">User Growth Traffic</h2>
            <p className="text-sm font-medium text-[#8C8C8C] mt-1">Metric snapshot over the last 12 months.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full text-[11px] font-black uppercase tracking-wider text-[#FF4B3A]">
               <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B3A]" /> Active Accounts
            </div>
          </div>
        </div>
        <div className="flex items-end gap-3 h-64">
          {chartBars.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
              <div className="text-xs text-[#1A1A1A] font-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform -translate-y-1">
                {Math.round(height * 12.5)}
              </div>
              <div
                className="w-full rounded-t-xl transition-all duration-500 cursor-pointer transform origin-bottom group-hover:scale-x-105 shadow-sm group-hover:shadow-md"
                style={{
                  height: `${height}%`,
                  backgroundColor: i === chartBars.length - 1 ? "#FF4B3A" : "#F1F3F5",
                }}
              />
              <span className="text-xs text-[#A1A1A1] font-bold">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <h2 className="text-xl font-black mb-6 tracking-tight text-[#1A1A1A]">Recent System Activity</h2>
          <div className="space-y-2">
            {[
              { text: "New student registered: Anita P.", time: "10 min ago", icon: "👤", color: "#FF4B3A" },
              { text: "Project submission: ML Pipeline by Vikram", time: "1 hour ago", icon: "📦", color: "#10B981" },
              { text: "Certificate issued: Sneha R. - Networking", time: "3 hours ago", icon: "🏆", color: "#F59E0B" },
              { text: "New mentor application: Dr. Sharma", time: "5 hours ago", icon: "👨‍🏫", color: "#1A1A1A" },
              { text: "Payment verified: ₹499 from Rahul M.", time: "8 hours ago", icon: "💳", color: "#10B981" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FFFDFB] transition-all border border-transparent hover:border-orange-50 cursor-pointer">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: `${activity.color}10` }}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-[#1A1A1A] truncate">{activity.text}</p>
                  <span className="text-xs font-medium text-[#A1A1A1]">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track Performance */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <h2 className="text-xl font-black mb-6 tracking-tight text-[#1A1A1A]">Top Track Analytics</h2>
          <div className="space-y-6">
            {[
              { name: "Python Engineering", students: 312, completion: 78, color: "#FF4B3A" },
              { name: "UI/UX Design", students: 256, completion: 72, color: "#1A1A1A" },
              { name: "IoT Integration", students: 198, completion: 65, color: "#10B981" },
              { name: "Embedded Systems", students: 174, completion: 58, color: "#F59E0B" },
              { name: "Data Analytics", students: 148, completion: 82, color: "#2563EB" },
            ].map((track) => (
              <div key={track.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px] font-bold text-[#4A4A4A]">{track.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#A1A1A1]">{track.students} cap.</span>
                    <span className="text-sm font-black" style={{ color: track.color }}>{track.completion}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-50 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${track.completion}%`, backgroundColor: track.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
