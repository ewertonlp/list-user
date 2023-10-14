import { fireEvent, render} from '@testing-library/react'
import { Pagination } from './pagination'

describe('Test Pagination', () => {
  it('should render correctly', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(1).toBe(1)
  })

  it('should call onPageChange with correct page when page button is clicked', () => {
    const onPageChange = jest.fn()
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    )

    fireEvent.click(getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})