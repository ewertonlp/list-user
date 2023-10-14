import HomePage from './index'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

describe('HomePage Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    )
    const title = getByText('List Users')
    const input = getByPlaceholderText('Search user...')
    expect(title).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })
})
