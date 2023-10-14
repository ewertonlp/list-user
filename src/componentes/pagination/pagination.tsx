import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import './style.scss'

interface paginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: paginationProps) => {

  const maxPagesToShow = 5
  const firstPageToShow = Math.max(
    1,
    currentPage - Math.floor(maxPagesToShow / 2)
  )
  const lastPageToShow = Math.min(
    totalPages,
    firstPageToShow + maxPagesToShow - 1
  )

  const pageNumbers = []
  for (let i = firstPageToShow; i <= lastPageToShow; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="previous-button"
      >
        <CaretLeft size={32} weight='bold' />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="next-button"
      >
        <CaretRight size={32} weight='bold' />
      </button>
    </div>
  )
}
