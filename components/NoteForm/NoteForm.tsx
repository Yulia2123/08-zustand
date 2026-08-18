"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createNote } from "@/lib/api";
import type { CreateNoteData } from "@/types/note";

import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),

  content: Yup.string().trim(),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      onSuccess?.();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>

            <Field id="title" name="title" type="text" />

            <ErrorMessage name="title" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>

            <Field as="textarea" id="content" name="content" />

            <ErrorMessage name="content" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>

            <Field as="select" id="tag" name="tag">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>

            <ErrorMessage name="tag" component="p" className={css.error} />
          </div>

          {mutation.isError && (
            <p className={css.error}>Something went wrong. Please try again.</p>
          )}

          <div>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>

            <button className={css.button} type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
