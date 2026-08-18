"use client";

import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.button}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      previousClassName={css.button}
      nextClassName={css.button}
      breakLabel="..."
    />
  );
}
