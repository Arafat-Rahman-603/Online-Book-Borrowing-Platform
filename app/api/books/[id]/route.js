import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const book = books.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
