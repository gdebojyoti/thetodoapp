import React from 'react'
import { render } from 'react-dom'

import Routes from '../Routes'
import './sw'

render(<Routes />, document.getElementById('app'))
