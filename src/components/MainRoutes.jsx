import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import CreateNote from './CreateNote'
import Notes from './Notes'

export default function MainRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/addnote' element={<CreateNote/>}/>
            <Route path='/notes' element={<Notes/>}/>
        </Routes>
    </div>
  )
}
