import express from 'express'

const app = express()
const PORT = 3333

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
