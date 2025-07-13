import { useEffect, useState } from "react";
import { BookList } from "@/components/BookList";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { Book, BookStatus } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import {
  deleteBookFromFirestore,
  getUserBooks,
  updateBookStatusInFirestore,
} from "@/lib/books";
import { useAuth } from "@/hooks/use-auth";

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"title" | "dateAdded">("dateAdded");
  const { toast } = useToast();
  const { user } = useAuth();

  // Load books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;

      try {
        const userBooks = await getUserBooks(user);
        setBooks(userBooks);
      } catch (err) {
        toast({
          title: "Error loading books",
          description: "Could not fetch books from database.",
          variant: "destructive",
        });
      }
    };

    fetchBooks();
  }, [user]);

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
    } catch {
      toast({
        title: "Error updating status",
        description: "Unable to update book status.",
        variant: "destructive",
      });
    }
  };

  const updateBookNotes = (id: string, notes: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, notes } : book))
    );
    // Note: Optional — if you want to sync notes to Firestore, add updateBookNotesInFirestore
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
    } catch {
      toast({
        title: "Error deleting book",
        description: "Could not remove book from your list.",
        variant: "destructive",
      });
    }
  };

  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "All" || book.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Books</h1>
        <p className="text-gray-600">
          Browse and manage your entire reading collection
        </p>
      </div>

      <div className="space-y-6">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <BookList
          books={filteredAndSortedBooks}
          onUpdateStatus={updateBookStatus}
          onUpdateNotes={updateBookNotes}
          onDeleteBook={deleteBook}
        />
      </div>
    </div>
  );
};

export default AllBooks;
