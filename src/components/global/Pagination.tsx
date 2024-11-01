import { useSearchParams } from "react-router-dom";
import { PageProps } from "../../lib/definitions";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: PageProps;
};

const Pagination = ({ page }: Props) => {

  const { number, totalPages } = page;
  const [params, setParams] = useSearchParams();

  // Verify the number of visible pages
  if(totalPages < 1) return null;

  //currentPage
  const currentPage = number + 1;

  // number of visible pages
  const visiblePages = 5;

  // last and fisrt pages boolean values
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  //Array of the pages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= visiblePages) {
      return pages;
    }
    const start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const end = Math.min(totalPages, start + visiblePages - 1);
    return pages.slice(start - 1, end);
  };

  const changePageHandler = (currentPage: number, type: "next" | "prev") => {
    if (currentPage + 1 > totalPages || currentPage + 1 < 1) return;
    return () => {
      const newParams = new URLSearchParams(params);
      const newPage = type === "next" ? currentPage + 1 : currentPage - 1;
      newParams.set("page", newPage.toString());
      setParams(newParams);
      window.location.reload();
    };
  };

  const handlePageChange = (page: number) => {
    if(page > totalPages || page < 1) return;
    const newParams = new URLSearchParams(params);
    newParams.set("page", (page-1).toString());
    setParams(newParams);
    window.location.reload();
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
      <li className={"page-item" + (isFirstPage ? " disabled" : "")}>
          <button
            disabled={isFirstPage}
            onClick={()=> handlePageChange(1)}
            className="page-link"
          >
            <ChevronFirst size={20} />
          </button>
        </li>
        <li className={"page-item" + (isFirstPage ? " disabled" : "")}>
          <button
            disabled={isFirstPage}
            onClick={changePageHandler(number, "prev")}
            className="page-link"
          >
            <ChevronLeft size={20} />
          </button>
        </li>
        {getVisiblePages().map((page) => (
          <li key={page} className="page-item">
            <button
              disabled={page === currentPage}
              onClick={() => handlePageChange(page)}
              className={"page-link " + (page === currentPage ? " active" : "")}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={"page-item" + (isLastPage ? " disabled" : "")}>
          <button
            disabled={isLastPage}
            onClick={changePageHandler(number, "next")}
            className="page-link"
          >
            <ChevronRight size={20} />
          </button>
        </li>
        <li className={"page-item" + (isLastPage ? " disabled" : "")}>
          <button
            disabled={isLastPage}
            onClick={()=> handlePageChange(totalPages)}
            className="page-link"
          >
            <ChevronLast size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;