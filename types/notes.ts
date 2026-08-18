import type { Note } from "./note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
