import {Routes, Route} from 'react-router-dom'

import  HomePage  from './pages/homepage/index'
import UserDetail from './pages/user';

import './global.scss';

export function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/user/:id' element={<UserDetail />}/>
      </Routes>
      
    </div>
  )
}
