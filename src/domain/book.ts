export interface Book {
  title: string;
  author: string;
  borrowed: boolean;
  borrowedBy: string | null;
  borrowedDate: Date | null;
}
