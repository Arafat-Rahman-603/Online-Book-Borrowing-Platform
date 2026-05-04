import Link from "next/link";
import BookCard from "@/components/BookCard";
import books from "@/data/books.json";

export const metadata = {
  title: "BookVault – Find Your Next Read",
  description:
    "Explore thousands of books across genres. Borrow digitally, read anywhere. Join BookVault today.",
};

export default function HomePage() {
  const featuredBooks = books.slice(0, 4);
  const categories = [
    {
      name: "Story",
      icon: "📖",
      desc: "Immerse yourself in captivating narratives and unforgettable worlds.",
      color: "from-indigo-500/20 to-purple-500/20",
      border: "border-indigo-500/30",
      hover: "hover:border-indigo-400/60",
      badge: "badge-story",
      count: books.filter((b) => b.category === "Story").length,
    },
    {
      name: "Tech",
      icon: "💻",
      desc: "Master programming, design, and the technologies shaping tomorrow.",
      color: "from-gold-500/20 to-amber-500/20",
      border: "border-gold-500/30",
      hover: "hover:border-gold-400/60",
      badge: "badge-tech",
      count: books.filter((b) => b.category === "Tech").length,
    },
    {
      name: "Science",
      icon: "🔬",
      desc: "Explore the cosmos, evolution, and the wonders of the natural world.",
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      hover: "hover:border-emerald-400/60",
      badge: "badge-science",
      count: books.filter((b) => b.category === "Science").length,
    },
  ];

  const stats = [
    { value: "12+", label: "Books Available", icon: "📚" },
    { value: "3", label: "Categories", icon: "🗂️" },
    { value: "Free", label: "Membership", icon: "🎁" },
    { value: "24/7", label: "Access", icon: "⚡" },
  ];

  const features = [
    {
      icon: "🔐",
      title: "Secure Authentication",
      desc: "Industry-grade security powered by BetterAuth with Google OAuth support.",
    },
    {
      icon: "📱",
      title: "Read Anywhere",
      desc: "Fully responsive on mobile, tablet, and desktop — your library on every device.",
    },
    {
      icon: "🔍",
      title: "Smart Search",
      desc: "Find books instantly by title, author, or category with powerful filtering.",
    },
    {
      icon: "⚡",
      title: "Instant Borrowing",
      desc: "Borrow any available title with one click. No paperwork, no waiting.",
    },
    {
      icon: "🎯",
      title: "Curated Collections",
      desc: "Hand-picked selections across Story, Tech, and Science for every reader.",
    },
    {
      icon: "🆓",
      title: "Always Free",
      desc: "No subscription fees. Create an account and start reading immediately.",
    },
  ];

  return (
    <div className="min-h-screen">
      
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-24">
        
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
        </div>

        
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-text-muted tracking-widest uppercase">
              Digital Library Platform
            </span>
          </div>

          <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl mb-6 animate-fade-up">
            Find Your{" "}
            <span className="text-gradient">Next Read</span>
          </h1>

          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Explore thousands of books across genres. Borrow digitally, read
            anywhere — your perfect library experience, reimagined.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/all-books"
              id="browse-now-btn"
              className="btn btn-gold btn-lg rounded-full px-10 font-bold text-base shadow-2xl shadow-gold-500/30"
            >
              Browse Now
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="btn btn-outline-gold btn-lg rounded-full px-10 font-semibold text-base"
            >
              Join Free
            </Link>
          </div>

          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-playfair text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        
       
      </section>

      
      

      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge badge-tech mb-4 inline-block">Featured</span>
            <h2 className="section-heading text-4xl mb-4">
              Featured <span className="text-gradient">Books</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Hand-picked titles our readers love. Start with these fan favourites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, i) => (
              <div
                key={book.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/all-books"
              className="btn btn-outline-gold rounded-full px-8"
            >
              View All Books →
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, transparent, rgba(251,191,36,0.05), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge badge-science mb-4 inline-block">Categories</span>
            <h2 className="section-heading text-4xl mb-4">
              Browse by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Discover books organized by genre — find exactly what you are looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/all-books?category=${cat.name}`}
                id={`category-${cat.name.toLowerCase()}`}
                className={`group glass rounded-2xl p-8 border ${cat.border} ${cat.hover} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2 group-hover:text-gold-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className={`category-badge ${cat.badge}`}>{cat.count} books</span>
                  <span className="text-gold-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-badge badge-story mb-4 inline-block">Why BookVault</span>
            <h2 className="section-heading text-4xl mb-4">
              Everything You Need in{" "}
              <span className="text-gradient">One Platform</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              BookVault is built for readers who value simplicity, security, and a
              premium experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="glass rounded-2xl p-6 glass-hover border border-transparent"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-2xl mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-2">
                  {feat.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass rounded-3xl p-10 sm:p-14 text-center overflow-hidden border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                Ready to Start <span className="text-gradient">Reading?</span>
              </h2>
              <p className="text-text-muted mb-8 max-w-lg mx-auto">
                Join thousands of readers on BookVault. Create your free account
                and start borrowing today — no credit card required.
              </p>
              <Link
                href="/register"
                id="cta-register-btn"
                className="btn btn-gold btn-lg rounded-full px-12 font-bold shadow-2xl shadow-gold-500/30"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
