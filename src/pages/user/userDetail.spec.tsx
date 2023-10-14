import UserDetail from './'
import { render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

const mockUserData = {
  name: {
    first: 'John',
    last: 'Doe',
    title: 'Mr.',
  },
}

jest.mock('../../hooks/useDetailUser', () => ({
  useDetailsUser: jest.fn(() => ({
    data: mockUserData,
    isLoading: false,
    error: null,
  })),
}))

describe('UserDetail Component', () => {
  it('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={['/user/123']}>
        <Route path="/user/:id">
          <UserDetail />
        </Route>
      </MemoryRouter>
    )

    const userName = getByText(
      `${mockUserData.name.first} ${mockUserData.name.last}`
    )
    const userTitle = getByText(mockUserData.name.title)
    const userImage = getByAltText('User Image')

    expect(userName).toBeInTheDocument()
    expect(userTitle).toBeInTheDocument()
    expect(userImage).toBeInTheDocument()
  })
})
