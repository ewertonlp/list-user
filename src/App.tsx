import {Routes, Route} from 'react-router-dom'
import  HomePage  from './pages/homepage/index'

import './global.scss';
import User from './pages/user';

export function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/user/:id' element={<User />}/>
      </Routes>
      
    </div>
  )
}
