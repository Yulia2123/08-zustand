"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";

import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <div className={css.item}>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>

              <span className={css.tag}>{note.tag}</span>
            </div>

            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <div className={css.actions}>
                <Link className={css.link} href={`/notes/${note.id}`}>
                  View details
                </Link>

                <button
                  className={css.button}
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
