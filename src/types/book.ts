
export type BookStatus = "To Read" | "Reading" | "Completed";

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  dateAdded: string;
  notes?: string;
}
