import './style.scss'

export default function HomePage() {
  return (
    <div className="container">
      <header className="headerHomePage">
        <h2 className="title">List Users</h2>
        <input
          type="text"
          placeholder="Search user..."
          className="searchInput"
        />
      </header>
      <main>
        <div className='container'>
          <table className='userList'>
            <thead className='userListHead'>
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
              <tr>
                <td>código</td>
                <td>Jennie</td>
                <td>Nicohls</td>
                <td>Miss</td>
                <td>11/02/2023</td>
                <td>30</td>
                <td>
                  <a href="">View profile</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
