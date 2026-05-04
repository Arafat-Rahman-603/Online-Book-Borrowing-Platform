import mongoose from "mongoose";

const BorrowRecordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    bookTitle: { type: String, required: true },
    borrowedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.BorrowRecord ||
  mongoose.model("BorrowRecord", BorrowRecordSchema);
