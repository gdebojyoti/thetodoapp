import React, { useState } from 'react'

import './style'

const NavBar = () => {
  const [showingSidebar, setShowingSidebar] = useState(false)
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <nav className='nav'>
        <div className='nav__item' onClick={() => setShowingSidebar(true)}>Menu</div>
        <div className='nav__item'>New</div>
        <div className='nav__item'>Settings</div>
      </nav>
      <aside className={`sidebar ${showingSidebar && 'sidebar--showing'}`} onClick={() => setShowingSidebar(false)}>
        <div className='sidebar__content' onClick={stopPropagation}>
          <div className='sidebar__heading'>The Todo App</div>
          <a className='sidebar__item' href='/'>Home</a>
          <a className='sidebar__item' href='/notes'>Notes</a>
        </div>
      </aside>
    </>
  )
}

export default NavBar
