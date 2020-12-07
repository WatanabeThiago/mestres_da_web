import express from 'express'
import 'reflect-metadata'
const app = express()
import './database/connect'
import routes from './routes'
app.use(express.json())
app.use(routes)


app.listen(3333, () => console.log('🆗 [SERVIDOR] Iniciado com sucesso na porta 3333.'))