import * as express from 'express'

import { router } from './routes/router'

import { RedisCache } from './modules'

import { ErrorHandler } from './helpers';

void (async () => {
  try {
    console.log(new Date(Date.now()), 'Info. Try to start service')

    await RedisCache.init()

    const app = express()

    const port = process.env.PORT || 3001

    app.use(express.json())

    app.use(router)

    app.use(ErrorHandler.errorStatusCode)

    app.use(ErrorHandler.error)

    app.listen(port, () => {
      console.log(new Date(Date.now()), `Info. Service listening on port ${port}`)
      console.log(new Date(Date.now()), 'Info. Service started successfully')
    })
  } catch (error) {
    console.log(new Date(Date.now()), 'Error. Service start failed', { error })
    process.exit(1)
  }
})()
