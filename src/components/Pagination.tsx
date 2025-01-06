import { useMemo } from "react";
import type { PaginationProps } from "../types";

const paginationButtons = (current: number, total: number) => [
  { label: "&lt;&lt;", page: 1, disabled: current === 1, title: 'First page' },
  { label: "&lt;", page: current - 1, disabled: current === 1, title: 'Previous page' },
  { label: "&gt;", page: current + 1, disabled: current === total, title: 'Next page' },
  { label: "&gt;&gt;", page: total, disabled: current === total, title: 'Last page' },
];

export default function Pagination({
  onChange,
  currentPage,
  totalRecords,
  limit,
}: PaginationProps) {
  const totalPages = useMemo(
    () => Math.ceil(totalRecords / limit),
    [totalRecords, limit]
  );

  return (
    <div className="flex">
      {paginationButtons(currentPage, totalPages).map(
        ({ label, page, disabled, title }) => (
          <button
            key={label}
            title={title}
            dangerouslySetInnerHTML={{ __html: label }}
            disabled={disabled}
            className={`h-10 w-10 border ${disabled ? "opacity-50" : ""}`}
            onClick={() => onChange(page)}
          />
        )
      )}
    </div>
  );
}
