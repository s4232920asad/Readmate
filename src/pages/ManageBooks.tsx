import { useState, useEffect } from "react";
import { AddBookForm } from "@/components/AddBookForm";
import { BookList } from "@/components/BookList";
import { Book, BookStatus } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import {
  addBookToFirestore,
  getUserBooks,
  updateBookStatusInFirestore,
  deleteBookFromFirestore,
  updateBookNotesInFirestore,
} from "@/lib/books";
import { useAuth } from "@/hooks/use-auth";

const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load books from Firebase on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const userBooks = await getUserBooks(user);
        setBooks(userBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load books. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user, toast]);

  const addBook = async (bookData: Omit<Book, "id" | "dateAdded">) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add books.",
        variant: "destructive",
      });
      return;
    }
    try {
      const newBookId = await addBookToFirestore(bookData, user);
      const newBook: Book = {
        ...bookData,
        id: newBookId,
        dateAdded: new Date().toISOString(),
      };
      setBooks((prev) => [newBook, ...prev]);
      toast({
        title: "Book added successfully!",
        description: `"${bookData.title}" has been added to your reading list.`,
      });
    } catch (err) {
      console.error("Error adding book:", err);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateBookStatus = async (id: string, status: BookStatus) => {
    try {
      await updateBookStatusInFirestore(id, status);
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { ...book, status } : book))
      );
      toast({
        title: "Status updated!",
        description: "Book status has been updated successfully.",
      });
    } catch (err) {
      console.error("Error updating book status:", err);
      toast({
        title: "Error",
        description: "Failed to update book status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateBookNotes = async (id: string, notes: string) => {
    try {
      await updateBookNotesInFirestore(id, notes);
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { ...book, notes } : book))
      );
      toast({
        title: "Notes updated!",
        description: "Book notes have been updated successfully.",
      });
    } catch (err) {
      console.error("Error updating book notes:", err);
      toast({
        title: "Error",
        description: "Failed to update notes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteBook = async (id: string) => {
    const bookToDelete = books.find((book) => book.id === id);
    try {
      await deleteBookFromFirestore(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      toast({
        title: "Book deleted",
        description: `"${bookToDelete?.title}" has been removed from your reading list.`,
        variant: "destructive",
      });
    } catch (err) {
      console.error("Error deleting book:", err);
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const recentBooks = books.slice(0, 3);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        Please log in to manage your books.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Books</h1>
        <p className="text-gray-600">
          Add new books and manage your recent additions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AddBookForm onAddBook={addBook} />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Books
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Your last 3 book
              {recentBooks.length !== 1 ? "s" : ""}
            </p>
          </div>

          {recentBooks.length === 0 ? (
            <p className="text-gray-500">
              No books added yet. Add a new book to get started!
            </p>
          ) : (
            <BookList
              books={recentBooks}
              onUpdateStatus={updateBookStatus}
              onUpdateNotes={updateBookNotes}
              onDeleteBook={deleteBook}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
