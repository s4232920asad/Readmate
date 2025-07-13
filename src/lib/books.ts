// lib/books.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Book, BookStatus } from "@/types/book";
import { User } from "firebase/auth";

const booksRef = collection(db, "books");

export const addBookToFirestore = async (
  book: Omit<Book, "id" | "dateAdded" | "uid">,
  user: User
) => {
  const docRef = await addDoc(booksRef, {
      ...book,
      uid: user.uid,
      dateAdded: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserBooks = async (user: User): Promise<Book[]> => {
  const q = query(booksRef, where("uid", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
          id: docSnap.id,
          title: data.title,
          author: data.author,
          status: data.status,
          uid: data.uid,
          notes: data.notes || "", // Ensure notes is always a string, even if not present
          dateAdded:
              data.dateAdded instanceof Timestamp
                  ? data.dateAdded.toDate().toISOString()
                  : new Date().toISOString(),
      };
  });
};

export const updateBookStatusInFirestore = async (
  bookId: string,
  status: BookStatus
) => {
  const bookDoc = doc(db, "books", bookId);
  await updateDoc(bookDoc, { status });
};

// NEW FUNCTION: updateBookNotesInFirestore
export const updateBookNotesInFirestore = async (
  bookId: string,
  notes: string
) => {
  const bookDoc = doc(db, "books", bookId);
  await updateDoc(bookDoc, { notes });
};

export const deleteBookFromFirestore = async (bookId: string) => {
  const bookDoc = doc(db, "books", bookId);
  await deleteDoc(bookDoc);
};