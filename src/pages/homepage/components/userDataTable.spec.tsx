import UserDataTable from './index'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

describe('UserDataTable Component', () => {
  it('should render loading message when isLoading is true', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UserDataTable searchText="" />
      </QueryClientProvider>
    )
    const loadingMessage = getByText('Loading Users Data...')
    expect(loadingMessage).toBeInTheDocument()
  })

})
