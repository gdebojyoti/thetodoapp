import React from 'react'
import { Route } from 'react-router-dom'

import Home from './app/pages/Home'
import Settings from './app/pages/Settings'

const Routes = () => {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/settings' component={Settings} />
    </>
  )
}

export default Routes
