import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Todos from './Todos'
import AddTodos from './AddTodos'

export default function Index() {
  return (
    <Routes>
      <Route index element={<Home/> }/>
      <Route path='/addtodos/*' element={<AddTodos/> }/>
      <Route  path='/todos/*' element={<Todos/>}/>
    </Routes>
  )
}
