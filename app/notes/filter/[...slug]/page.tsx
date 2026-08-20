import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0] === "all" ? "" : slug[0];

  return {
    title: tag ? `${tag} Notes | NoteHub` : "All Notes | NoteHub",
    description: tag
      ? `Notes filtered by ${tag} tag.`
      : "All notes in NoteHub.",

    openGraph: {
      title: tag ? `${tag} Notes | NoteHub` : "All Notes | NoteHub",
      description: tag
        ? `Notes filtered by ${tag} tag.`
        : "All notes in NoteHub.",
      url: "https://notehub.com/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tag = slug[0] === "all" ? "" : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
