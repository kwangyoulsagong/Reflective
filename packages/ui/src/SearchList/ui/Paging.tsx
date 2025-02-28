import { PagingService } from "../Services/PagingService";
interface PagingProps {
  currentPage: number;
  onPageChange: (number: number) => void;
  totalPages: number;
}
const Paging = ({ currentPage, onPageChange, totalPages }: PagingProps) => {
  const pagingService = new PagingService();
  return (
    <section className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t ">
      <button
        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <article className="flex space-x-1 gap-3">
        {pagingService
          .getPageNumber({ currentPage, totalPages })
          .map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded-md ${
                page === currentPage
                  ? "bg-white text-primary border border-gray-300 hover:bg-gray-100"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
      </article>
      <button
        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </section>
  );
};
export default Paging;
