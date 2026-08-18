"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div>
      {data?.notes.map((note) => (
        <article key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.tag}</p>
        </article>
      ))}
    </div>
  );
}
