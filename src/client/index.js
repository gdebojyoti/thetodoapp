// import React from 'react'
// import { render } from 'react-dom'

// import Routes from '../Routes'
// // import './sw'

// render(<Routes />, document.getElementById('app'))

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './sw'

import Routes from '../Routes'

hydrate(<BrowserRouter><Routes /></BrowserRouter>, document.getElementById('app'))
