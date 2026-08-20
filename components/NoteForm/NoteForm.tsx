"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";

import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = async (formData: FormData) => {
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const tag = String(formData.get("tag") ?? "Todo");

    await createNote({
      title,
      content,
      tag,
    });

    clearDraft();

    queryClient.invalidateQueries({
      queryKey: ["notes"],
    });

    router.push("/notes/filter/all");
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={draft.title}
          onChange={(event) =>
            setDraft({
              title: event.target.value,
            })
          }
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          defaultValue={draft.content}
          onChange={(event) =>
            setDraft({
              content: event.target.value,
            })
          }
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={(event) =>
            setDraft({
              tag: event.target.value,
            })
          }
        >
          <option value="Home">Home</option>
          <option value="Friends">Friends</option>
          <option value="Fitness">Fitness</option>
          <option value="Plans">Plans</option>
          <option value="Important">Important</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>

        <button type="submit">Create note</button>
      </div>
    </form>
  );
}
