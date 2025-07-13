import { useState, useEffect } from "react";
import { BookStats } from "@/components/BookStats";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Book } from "@/types/book";
import { useAuth } from "@/hooks/use-auth";
import { getUserBooks } from "@/lib/books";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentTheme, setCurrentTheme] = useState("sunset");
  const { user } = useAuth();

  // Load books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      if (user) {
        const userBooks = await getUserBooks(user);
        setBooks(userBooks);
      }
    };
    fetchBooks();
  }, [user]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("readmate-theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("readmate-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const stats = {
    toRead: books.filter((book) => book.status === "To Read").length,
    reading: books.filter((book) => book.status === "Reading").length,
    completed: books.filter((book) => book.status === "Completed").length,
    total: books.length,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reading Dashboard
        </h1>
        <p className="text-gray-600">
          Track your reading progress and customize your experience
        </p>
      </div>

      {/* 👤 User Profile */}
      {user && (
        <div className="mb-8 p-4 border rounded-md bg-white/80 shadow-sm">
          <h2 className="text-xl font-semibold mb-1 text-gray-800">
            User Profile
          </h2>
          <p className="text-gray-700">
            <strong>Username:</strong>{" "}
            {user.email ? user.email.split("@")[0] : "Anonymous User"}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      {/* 📊 Stats Overview */}
      <BookStats stats={stats} />

      {/* 🎨 Theme Selection */}
      <ThemeSelector
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
};

export default Dashboard;
