"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookCard from "@/components/BookCard";

const CATEGORIES = ["All", "Story", "Tech", "Science"];

function AllBooksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);


  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== "All") params.set("category", activeCategory);
        if (debouncedSearch) params.set("search", debouncedSearch);
        const res = await fetch(`/api/books?${params}`);
        const data = await res.json();
        setBooks(data.success ? data.data : []);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [activeCategory, debouncedSearch]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setSidebarOpen(false);
  };

  const categoryMeta = {
    All: { icon: "📚", color: "text-gray-800", bg: "bg-amber-50 border-amber-400" },
    Story: { icon: "📖", color: "text-purple-600", bg: "bg-indigo-50 border-indigo-400" },
    Tech: { icon: "💻", color: "text-amber-700", bg: "bg-amber-50 border-amber-400" },
    Science: { icon: "🔬", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-400" },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <span className="category-badge badge-tech mb-3 inline-block">Library</span>
          <h1 className="section-heading text-4xl sm:text-5xl mb-3">
            All <span className="text-gradient">Books</span>
          </h1>
          <p className="text-text-muted">
            Browse our full collection — search by title or filter by category.
          </p>
        </div>

        
        <div className="relative mb-8 max-w-2xl">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="book-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title or author..."
            className="input-dark w-full rounded-2xl pl-12 pr-4 py-4 text-base shadow-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold-400 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        
        <button
          className="md:hidden flex items-center gap-2 mb-4 btn btn-sm btn-outline-gold rounded-full px-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm3 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
          </svg>
          Filter by Category
          {activeCategory !== "All" && (
            <span className="category-badge badge-tech">{activeCategory}</span>
          )}
        </button>

        <div className="flex gap-6">
          
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block w-full md:w-56 flex-shrink-0 mb-6 md:mb-0`}
          >
            <div className="glass rounded-2xl p-5 border border-gold-500/15 sticky top-24">
              <h2 className="font-playfair text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm3 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
                </svg>
                Categories
              </h2>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => {
                  const meta = categoryMeta[cat];
                  const isActive = activeCategory === cat;
                  return (
                    <li key={cat}>
                      <button
                        id={`filter-${cat.toLowerCase()}`}
                        onClick={() => handleCategory(cat)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          isActive
                            ? `${meta.bg} ${meta.color}`
                            : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <span>{meta.icon}</span>
                        <span>{cat}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          
          <div className="flex-1 min-w-0">
            
            <div className="flex items-center justify-between mb-5">
              <p className="text-text-muted text-sm">
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <span className="text-gold-400 font-semibold">{books.length}</span>{" "}
                    {books.length === 1 ? "book" : "books"} found
                    {activeCategory !== "All" && (
                      <> in <span className="text-gray-800 font-medium">{activeCategory}</span></>
                    )}
                    {debouncedSearch && (
                      <> for &quot;<span className="text-gray-800 font-medium">{debouncedSearch}</span>&quot;</>
                    )}
                  </>
                )}
              </p>
              {(activeCategory !== "All" || debouncedSearch) && (
                <button
                  onClick={() => { setActiveCategory("All"); setSearch(""); }}
                  className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Clear filters ✕
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100 shadow-sm">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-9 bg-gray-200 rounded-full mt-4" />
                  </div>
                </div>
              ))}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="font-playfair text-xl text-gray-800 mb-2">No books found</h3>
                <p className="text-text-muted text-sm mb-6">
                  Try adjusting your search or filter.
                </p>
                <button
                  onClick={() => { setActiveCategory("All"); setSearch(""); }}
                  className="btn btn-sm btn-outline-gold rounded-full px-6"
                >
                  Show all books
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, i) => (
                  <div key={book.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-gold-400" />
      </div>
    }>
      <AllBooksContent />
    </Suspense>
  );
}
