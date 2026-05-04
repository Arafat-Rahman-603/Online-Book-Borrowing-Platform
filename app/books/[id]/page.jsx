"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const CATEGORY_BADGES = {
  Story: "badge-story",
  Tech: "badge-tech",
  Science: "badge-science",
};

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [borrowed, setBorrowed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        if (data.success) setBook(data.data);
        else router.push("/all-books");
      } catch {
        router.push("/all-books");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, router]);

  const handleBorrow = async () => {
    if (!session) {
      toast.error("Please login to borrow books.");
      router.push(`/login?callbackUrl=/books/${id}`);
      return;
    }
    if (book.available_quantity <= 0) {
      toast.error("No copies available right now.");
      return;
    }
    setBorrowing(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setBorrowed(true);
        setBook((prev) => ({ ...prev, available_quantity: prev.available_quantity - 1 }));
      } else {
        toast.error(data.error || "Failed to borrow book.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-80 h-[450px] bg-gray-200 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-4 pt-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-2" />
              <div className="space-y-2 mt-6">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
              </div>
              <div className="h-12 bg-gray-200 rounded-full w-48 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  const badgeClass = CATEGORY_BADGES[book.category] || "badge-tech";

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/all-books" className="hover:text-gold-400 transition-colors">All Books</Link>
          <span>/</span>
          <span className="text-cream truncate max-w-[200px]">{book.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          <div className="flex-shrink-0 w-full lg:w-72">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
              <Image
                src={book.image_url}
                alt={book.title}
                width={300}
                height={450}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: "2/3", height: "auto" }}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`category-badge ${badgeClass}`}>{book.category}</span>
              <span
                className={`category-badge ${
                  book.available_quantity > 0
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {book.available_quantity > 0
                  ? `${book.available_quantity} copies available`
                  : "Currently Unavailable"}
              </span>
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {book.title}
            </h1>

            <p className="text-text-muted text-lg mb-6">
              by{" "}
              <span className="text-gold-400 font-medium">{book.author}</span>
            </p>

            
            <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-6" />

            <div className="mb-8">
              <h2 className="font-playfair text-lg font-semibold text-gray-800 mb-3">
                About This Book
              </h2>
              <p className="text-text-muted leading-relaxed">{book.description}</p>
            </div>

            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass rounded-xl p-4 border border-gold-500/10">
                <p className="text-xs text-text-muted mb-1">Category</p>
                <p className="text-sm font-medium text-gray-800">{book.category}</p>
              </div>
              <div className="glass rounded-xl p-4 border border-gold-500/10">
                <p className="text-xs text-text-muted mb-1">Availability</p>
                <p className={`text-sm font-medium ${book.available_quantity > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {book.available_quantity > 0
                    ? `${book.available_quantity} copies left`
                    : "Out of stock"}
                </p>
              </div>
            </div>

            
            {borrowed ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">Successfully Borrowed!</p>
                  <p className="text-text-muted text-xs mt-0.5">Enjoy reading &quot;{book.title}&quot;</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="borrow-book-btn"
                  onClick={handleBorrow}
                  disabled={borrowing || book.available_quantity <= 0}
                  className={`btn btn-lg rounded-full px-10 font-bold flex items-center gap-2 ${
                    book.available_quantity > 0
                      ? "btn-gold shadow-2xl shadow-gold-500/30"
                      : "opacity-50 cursor-not-allowed glass border border-red-500/30 text-red-400"
                  }`}
                >
                  {borrowing ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : book.available_quantity > 0 ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Borrow This Book
                    </>
                  ) : (
                    "Not Available"
                  )}
                </button>
                <Link
                  href="/all-books"
                  className="btn btn-lg btn-outline-gold rounded-full px-8"
                >
                  ← Back to Library
                </Link>
              </div>
            )}

            {!session && (
              <p className="text-text-muted text-xs mt-3">
                <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium">
                  Sign in
                </Link>{" "}
                to borrow this book.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
