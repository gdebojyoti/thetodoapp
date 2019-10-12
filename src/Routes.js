import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './app/pages/Home'
import Settings from './app/pages/Settings'
import Login from './app/pages/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/login' component={Login} />
    </BrowserRouter>
  )
}

export default Routes
