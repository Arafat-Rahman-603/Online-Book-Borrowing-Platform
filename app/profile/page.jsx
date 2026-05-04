"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-gold-400" />
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <span className="category-badge badge-story mb-3 inline-block">Account</span>
          <h1 className="section-heading text-4xl">
            My <span className="text-gradient">Profile</span>
          </h1>
        </div>

        
        <div className="glass rounded-3xl border border-gold-500/20 overflow-hidden shadow-2xl">
          
          
          
          <div className="px-6 sm:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl ring-4 ring-white object-cover shadow-xl"
                    unoptimized
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl ring-4 ring-white bg-gradient-to-br from-gold-500 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {initials}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full ring-2 ring-white" />
              </div>
              <div className="sm:mb-2">
                <h2 className=" font-playfair text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-text-muted text-sm">{user.email}</p>
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: "👤",
                  label: "Full Name",
                  value: user.name,
                  color: "text-gray-800",
                },
                {
                  icon: "📧",
                  label: "Email Address",
                  value: user.email,
                  color: "text-gray-800",
                },
                {
                  icon: "🗓️",
                  label: "Member Since",
                  value: memberSince,
                  color: "text-gold-400",
                },
                {
                  icon: "🔐",
                  label: "Account Status",
                  value: "Active",
                  color: "text-emerald-400",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-4 border border-amber-100 hover:border-amber-200 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <span className="text-xs text-text-muted uppercase tracking-wider font-medium">
                      {item.label}
                    </span>
                  </div>
                  <p className={`font-medium text-sm ${item.color} truncate`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            
            {user.image && (
              <div className="mb-8 bg-white rounded-2xl p-4 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span>🖼️</span>
                  <span className="text-xs text-text-muted uppercase tracking-wider font-medium">
                    Profile Photo URL
                  </span>
                </div>
                <p className="text-sm text-text-muted truncate font-mono">{user.image}</p>
              </div>
            )}

            
            <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-6" />

            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/profile/update"
                id="update-profile-btn"
                className="btn btn-gold rounded-full px-8 flex-1 sm:flex-none font-semibold"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Information
              </Link>
              <Link
                href="/all-books"
                className="btn btn-outline-gold rounded-full px-8"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: "📚", value: "12", label: "Books Available" },
            { icon: "🔖", value: "Free", label: "Membership" },
            { icon: "⚡", value: "24/7", label: "Access" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center border border-gold-500/10">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-playfair text-lg font-bold text-gradient">{s.value}</div>
              <div className="text-xs text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
