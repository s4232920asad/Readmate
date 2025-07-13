
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Calendar } from "lucide-react";
import { Book, BookStatus } from "@/types/book";
import { useState } from "react";

interface BookListProps {
  books: Book[];
  onUpdateStatus: (id: string, status: BookStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeleteBook: (id: string) => void;
}

const getStatusColor = (status: BookStatus) => {
  switch (status) {
    case "To Read":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Reading":
      return "bg-red-100 text-red-800 border-red-200";
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusEmoji = (status: BookStatus) => {
  switch (status) {
    case "To Read":
      return "📚";
    case "Reading":
      return "📖";
    case "Completed":
      return "✅";
    default:
      return "📖";
  }
};

export const BookList = ({ books, onUpdateStatus, onUpdateNotes, onDeleteBook }: BookListProps) => {
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");

  const handleEditNotes = (bookId: string, currentNotes: string) => {
    setEditingNotes(bookId);
    setTempNotes(currentNotes || "");
  };

  const handleSaveNotes = (bookId: string) => {
    onUpdateNotes(bookId, tempNotes);
    setEditingNotes(null);
    setTempNotes("");
  };

  const handleCancelEdit = () => {
    setEditingNotes(null);
    setTempNotes("");
  };

  if (books.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
        <CardContent className="p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Books Found</h3>
          <p className="text-gray-500">Start building your reading library by adding your first book!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <Card
          key={book.id}
          className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl text-gray-800 mb-2">
                  {book.title}
                </CardTitle>
                <p className="text-gray-600 font-medium">by {book.author}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge
                    className={`${getStatusColor(book.status)} font-medium`}
                  >
                    {getStatusEmoji(book.status)} {book.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(book.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditNotes(book.id, book.notes || "")}
                  className="border-gray-200 hover:border-orange-400 hover:text-orange-600"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteBook(book.id)}
                  className="border-red-200 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Update Status:
                </label>
                <Select
                  value={book.status}
                  onValueChange={(value) =>
                    onUpdateStatus(book.id, value as BookStatus)
                  }
                >
                  <SelectTrigger className="w-full border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Read">📚 To Read</SelectItem>
                    <SelectItem value="Reading">
                      📖 Currently Reading
                    </SelectItem>
                    <SelectItem value="Completed">✅ Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editingNotes === book.id ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Notes:
                  </label>
                  <Textarea
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    placeholder="Add your thoughts, quotes, or notes..."
                    className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveNotes(book.id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Save Notes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-gray-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : book.notes ? (
                <div className="border border-gray-200 rounded-lg p-3">
                  <label className="text-sm font-medium text-amber-800 mb-1 block">
                    Your Notes:
                  </label>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {book.notes}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No notes added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
