import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './app/pages/Home'
import Settings from './app/pages/Settings'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route exact path='/settings' component={Settings} />
    </BrowserRouter>
  )
}

export default Routes
