import { api } from "@/lib/api";
import type { CreateNoteData, Note } from "@/types/note";

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await api.post<Note>("/notes", data);

  return response.data;
}
