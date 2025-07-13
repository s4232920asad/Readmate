
import { Book } from "lucide-react";

export const BookHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
          <Book className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          ReadMate
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Your personal reading companion. Track, organize, and celebrate your reading journey.
      </p>
    </div>
  );
};
