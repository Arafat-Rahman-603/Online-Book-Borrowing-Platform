"use client";

import Link from "next/link";
import Image from "next/image";

const CATEGORY_STYLES = {
  Story: "badge-story",
  Tech: "badge-tech",
  Science: "badge-science",
};

export default function BookCard({ book, showDetails = true }) {
  const badgeClass = CATEGORY_STYLES[book.category] || "badge-tech";

  return (
    <div className="card-book group flex flex-col h-full">
      
      <div className="relative overflow-hidden h-56 bg-gray-100">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3">
          <span className={`category-badge ${badgeClass}`}>{book.category}</span>
        </div>
        
        <div className="absolute top-3 right-3">
          <span
            className={`category-badge ${
              book.available_quantity > 0
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {book.available_quantity > 0
              ? `${book.available_quantity} left`
              : "Unavailable"}
          </span>
        </div>
      </div>

      
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-playfair text-base font-bold text-gray-800 leading-snug mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-text-muted text-xs mb-3">by {book.author}</p>
        {book.description && (
          <p className="text-text-muted text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
            {book.description}
          </p>
        )}

        {showDetails && (
          <Link
            href={`/books/${book.id}`}
            className="btn btn-sm btn-gold w-full rounded-full mt-auto text-sm"
            id={`view-book-${book.id}`}
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
