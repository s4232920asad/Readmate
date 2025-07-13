
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { BookStatus } from "@/types/book";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: BookStatus | "All";
  setFilterStatus: (status: BookStatus | "All") => void;
  sortBy: "title" | "dateAdded";
  setSortBy: (sort: "title" | "dateAdded") => void;
}

export const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
}: SearchAndFilterProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as BookStatus | "All")}>
            <SelectTrigger className="border-gray-200 focus:border-orange-400 focus:ring-orange-400">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Books</SelectItem>
              <SelectItem value="To Read">📚 To Read</SelectItem>
              <SelectItem value="Reading">📖 Currently Reading</SelectItem>
              <SelectItem value="Completed">✅ Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "title" | "dateAdded")}>
            <SelectTrigger className="border-gray-200 focus:border-orange-400 focus:ring-orange-400">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateAdded">📅 Date Added</SelectItem>
              <SelectItem value="title">📝 Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
