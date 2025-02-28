export class PagingService {
  constructor(private readonly end = 4) {}
  getPageNumber({
    currentPage,
    totalPages,
  }: {
    currentPage: number;
    totalPages: number;
  }) {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + this.end);
    if (endPage - startPage < this.end) {
      startPage = Math.max(1, endPage - this.end);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
