import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">📚</div>
        <h1 className="font-playfair text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-text-muted mb-8 leading-relaxed">
          Looks like this page got lost in the library stacks. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-gold rounded-full px-8">
            Go Home
          </Link>
          <Link href="/all-books" className="btn btn-outline-gold rounded-full px-8">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}
