import axios from 'axios'
import { useQuery } from 'react-query'

interface User {
  name: {
    first: string
    last: string
  }
}

const fetchRandomUsers = async (page: number) => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10`
    )
    const data = response.data.results

    return data
  } catch (error) {
    alert('Error fetching random user')
  }
}

export function useRandomUsers(page: number, searchText?: string) {
  return useQuery(['randomUsers', page, searchText], async () => {
    const users = await fetchRandomUsers(page)

    if (searchText) {
      // Filtrar usuários com base no texto de pesquisa
      const filteredUsers = users.filter((user:User) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      return filteredUsers
    }

    return users
  })
}
