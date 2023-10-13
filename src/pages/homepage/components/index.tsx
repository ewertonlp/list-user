import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UseQueryResult } from 'react-query'

import { Pagination } from '../../../componentes/pagination/pagination'
import { useRandomUsers } from '../../../hooks/useRandomUser'

import '../style.scss'

interface UserDataTableProps {
  searchText: string
}

interface User {
  id: {
    value: string
    name: string
  }
  name: {
    first: string
    last: string
    title: string
  }
  dob: {
    date: Date
    age: number
  }
}


export default function UserDataTable({ searchText }: UserDataTableProps) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(15)

  const { data, isLoading, isError, error } = useRandomUsers(
    page,
    searchText
  ) as UseQueryResult<User[], Error>

  if (isLoading) {
    return <div className="loading">Loading Users Data...</div>
  }

  if (isError) {
    return <div>Erro: {error.message}</div>
  }

  return (
    <div className="container">
      <table className="userList">
        <thead className="userListHead">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Date</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchText && data
            ? data.map((user: User, index: number) => {
                const date = new Date(user.dob.date)
                const formatedDate = date.toLocaleDateString('en-US')
                return (
                  <tr key={index}>
                    <td>{user.id.value}</td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.name.title}</td>
                    <td>{formatedDate}</td>
                    <td>{user.dob.age}</td>
                    <td>
                      <Link to={`/user/${user.id.name}`} className="navUser">
                        View profile
                      </Link>
                    </td>
                  </tr>
                )
              })
            : data?.map((user: User, index: number) => {
                const date = new Date(user.dob.date)
                const formatedDate = date.toLocaleDateString('en-US')
                return (
                  <tr key={index}>
                    <td>{user.id.value}</td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.name.title}</td>
                    <td>{formatedDate}</td>
                    <td>{user.dob.age}</td>
                    <td>
                      <Link to={`/user/${user.id.name}`} className="navUser">
                        View profile
                      </Link>
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
      <div className="pagination">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
