export default function Pagination({ page, pageCount, onPageChange }) {
  return (
    <nav className="pagination" aria-label="Strony samochodów">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Poprzednia</button>
      <span aria-live="polite">{page} / {pageCount}</span>
      <button disabled={page === pageCount} onClick={() => onPageChange(page + 1)}>Następna</button>
    </nav>
  );
}
