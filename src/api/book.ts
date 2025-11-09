import request from ".";

// book.ts
export interface Book {
  uid: string; // UUID in TypeScript is represented as string
  title: string; // String type in TypeScript
  author: string; // String type in TypeScript
  publisher: string; // String type in TypeScript
  page_count: number; // Number type in TypeScript (int in Python)
  language: string; // String type in TypeScript
  created_at: string; // Date/time in TypeScript typically represented as ISO string
  update_at: string; // Date/time in TypeScript typically represented as ISO string
}

export interface BookUpdate {
  title: string; // Optional title field
  author: string; // Optional author field
  publisher: string; // Optional publisher field
  page_count: number; // Optional page count field
  language: string; // Optional language field
}

export interface BookCreate {
  title: string; // Required title field
  author: string; // Required author field
  publisher: string; // Required publisher field
  page_count: number; // Required page count field
  language: string; // Required language field
}

export const fetchBooks = (): Promise<Book[]> => {
  return request.get("/");
};
