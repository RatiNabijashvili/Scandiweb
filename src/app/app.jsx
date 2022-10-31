import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from '../main/main'
import { ContextProvider } from '../Context'
import Styles from './app.module.css'

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Main filter={'/'} />} />
          <Route path='/tech' element={<Main filter={'tech'} />} />
          <Route path='/clothes' element={<Main filter={'clothes'} />} />
          <Route path='/:id' element={<Main filter={':id'} />} />
          <Route path='/cart' element={<Main filter={'cart'} />} />
          <Route path='*' />
        </Routes>
      </Router>
    </ContextProvider>
  )
}

export default App
