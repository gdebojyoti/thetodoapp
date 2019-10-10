import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Routes from '../Routes'

const PORT = 9876
const app = express()

app.use(express.static('public'))

app.use('/', (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
  )
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    
        <meta name="title" content="The Todo App">
        <meta name="description" content="A web app for The Todo App!">

        <link rel='stylesheet' href='style.css' />
        <title>The Todo App</title>
      </head>
      <body>
        <div id="app" class="app app--haha">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `

  res.send(html)
})

app.listen(PORT, () => {
  console.info(`SSR running on port ${PORT}`)
})
