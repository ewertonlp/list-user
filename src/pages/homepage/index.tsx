import { useEffect, useState } from 'react'


import './style.scss'
import UserDataTable from './components'

export default function HomePage() {
  const [searchText, setSearchText] = useState('')
  const [searchValue, setSearchValue] = useState('')

 

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchText(searchValue) 
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchValue])

 

  return (
    <div className="container">
      <header className="headerHomePage">
        <h2 className="title">List Users</h2>
        <input
          type="text"
          placeholder="Search user..."
          className="searchInput"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </header>
      <main>
        <UserDataTable searchText={searchValue} />
      </main>
    </div>
  )
}
