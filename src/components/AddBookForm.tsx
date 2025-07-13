
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookPlus } from "lucide-react";
import { Book, BookStatus } from "@/types/book";

interface AddBookFormProps {
  onAddBook: (book: Omit<Book, "id" | "dateAdded">) => void;
}

export const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("To Read");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      onAddBook({
        title: title.trim(),
        author: author.trim(),
        status,
        notes: notes.trim() || undefined,
      });
      setTitle("");
      setAuthor("");
      setStatus("To Read");
      setNotes("");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <BookPlus className="w-5 h-5 text-orange-500" />
          Add New Book
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              required
              className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
              className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Reading Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as BookStatus)}>
              <SelectTrigger className="border-gray-200 focus:border-orange-400 focus:ring-orange-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Read">📚 To Read</SelectItem>
                <SelectItem value="Reading">📖 Currently Reading</SelectItem>
                <SelectItem value="Completed">✅ Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your thoughts, quotes, or notes..."
              className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <BookPlus className="w-4 h-4 mr-2" />
            Add Book to Library
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
