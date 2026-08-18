import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
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
