const Pagination = ({
  products,
  page,
  totalPages,
  setPage,
  maxVisible = 5,
}) => {
  const handlePageClick = (pageNum) => {
    if (pageNum !== page) setPage(pageNum);
  };
  const renderPageKey = (curr, key) => {
    const uniqueKey = key || curr;
    return (
      <span
        className={page === curr ? "pagination__selected" : ""}
        onClick={() => {
          if (curr !== "...") handlePageClick(curr);
        }}
        key={uniqueKey}
      >
        {curr}
      </span>
    );
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i, products[i - 1]?.id));
      }
    } else {
      //Truncation Logic
      const start = Math.max(1, page - Math.floor(maxVisible / 2));

      const end = Math.min(totalPages, start + maxVisible - 1);

      if (start > 1) {
        if (start > 2) pageNumbers.push(renderPageKey(1));
        pageNumbers.push(renderPageKey("...", "dot-start"));
      }
      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageKey(i));
      }
      pageNumbers.push(renderPageKey("...", "dot-end"));
      if (end < totalPages - 1) pageNumbers.push(renderPageKey(totalPages));
    }

    return pageNumbers;
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <span
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              ⬅️
            </span>
          )}
          {renderPageNumbers()}

          {page < totalPages && (
            <span
              onClick={() => {
                if (page < totalPages) setPage(page + 1);
              }}
            >
              ➡️
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default Pagination;
