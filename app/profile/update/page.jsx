"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/profile/update");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", image: user.image || "" });
      setPreview(user.image || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLoading(true);
    try {

      const result = await updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully! ✨");
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-gold-400" />
      </div>
    );
  }

  if (!user) return null;

  const initials = form.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-gold-400 transition-colors">Profile</Link>
          <span>/</span>
          <span className="text-gray-700">Update</span>
        </nav>

        <div className="glass rounded-3xl p-8 sm:p-10 border border-gold-500/20 shadow-2xl">
          
          <div className="text-center mb-8">
            <span className="category-badge badge-story mb-4 inline-block">Edit Account</span>
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
              Update Information
            </h1>
            <p className="text-text-muted text-sm">Change your name and profile photo</p>
          </div>

          
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-2xl ring-4 ring-gold-500/30 object-cover shadow-xl"
                  onError={() => setPreview("")}
                  unoptimized
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl ring-4 ring-gold-500/30 bg-gradient-to-br from-gold-500 to-emerald-500 flex items-center justify-center text-3xl font-bold text-navy-900 shadow-xl">
                  {initials || "?"}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-gold-400">*</span>
              </label>
              <input
                id="update-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input-dark w-full rounded-xl px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                Photo URL <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                id="update-photo"
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/your-photo.jpg"
                className="input-dark w-full rounded-xl px-4 py-3 text-sm"
              />
              <p className="text-xs text-text-muted mt-1.5">
                Paste a public image URL to update your avatar.
              </p>
            </div>

            
            <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
              <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">Current Info</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="text-text-muted">Name: </span>{user.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="text-text-muted">Email: </span>{user.email}
                  <span className="text-xs text-text-muted ml-2">(cannot change)</span>
                </p>
              </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="update-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-gold flex-1 py-3 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7" />
                    </svg>
                    Update Information
                  </>
                )}
              </button>
              <Link
                href="/profile"
                className="btn btn-outline-gold rounded-2xl px-6 text-sm font-medium flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
