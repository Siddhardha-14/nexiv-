"use client";

import { useState } from "react";
import Tooltip from "@/components/ui/Tooltip";

const users = [
  { id: 1, name: "Aravind Kumar", email: "aravind@example.com", role: "student", joined: "Jan 5, 2026", status: "active", projects: 8 },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "student", joined: "Feb 12, 2026", status: "active", projects: 6 },
  { id: 3, name: "Rahul Mehta", email: "rahul@example.com", role: "student", joined: "Mar 1, 2026", status: "active", projects: 10 },
  { id: 4, name: "Rajesh Kumar", email: "rajesh@example.com", role: "mentor", joined: "Dec 1, 2025", status: "active", projects: 0 },
  { id: 5, name: "Sneha Reddy", email: "sneha@example.com", role: "student", joined: "Apr 3, 2026", status: "active", projects: 12 },
  { id: 6, name: "Vikram Tharun", email: "vikram@example.com", role: "student", joined: "Mar 20, 2026", status: "inactive", projects: 3 },
  { id: 7, name: "Dr. Anita Sharma", email: "anita@example.com", role: "mentor", joined: "Jan 15, 2026", status: "active", projects: 0 },
];

const roleFilters = ["All", "student", "mentor"] as const;

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchQuery.trim() ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Management</h1>
          <p className="text-[var(--text-secondary)] text-sm">{users.length} total users</p>
        </div>
        <Tooltip content="User creation is coming in v2.0" position="bottom">
          <button
            className="btn-primary text-sm py-2 px-4 rounded-lg opacity-60 cursor-not-allowed coming-soon-badge"
            disabled
          >
            + Add User
          </button>
        </Tooltip>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A1A1A1]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Role Filter */}
        <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] w-fit self-start">
          {roleFilters.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                roleFilter === role
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(searchQuery || roleFilter !== "All") && (
        <p className="text-xs text-[var(--text-muted)]">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      )}

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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--text-muted)]">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm font-medium">No users found</p>
                      <p className="text-xs">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
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
                      <Tooltip content="User editing available in v2.0" position="left">
                        <button className="text-xs text-[var(--text-muted)] cursor-not-allowed" disabled>
                          Edit
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
