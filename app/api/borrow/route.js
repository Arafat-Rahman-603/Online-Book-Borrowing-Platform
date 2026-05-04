import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import BorrowRecord from "@/models/BorrowRecord";
import books from "@/data/books.json";
import { headers } from "next/headers";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bookId } = await request.json();
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    if (book.available_quantity <= 0) {
      return NextResponse.json(
        { success: false, error: "No copies available" },
        { status: 400 }
      );
    }


    await connectDB();
    await BorrowRecord.create({
      userId: session.user.id,
      bookId: book.id,
      bookTitle: book.title,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully borrowed "${book.title}"!`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
