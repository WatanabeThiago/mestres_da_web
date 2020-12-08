import express from 'express'
import 'reflect-metadata'
import cors from 'cors'
import './database/connect'
import routes from './routes'


const app = express()
app.use(express.json())
app.use(routes)
app.use(cors)


app.listen(3333, () => console.log('🆗 [SERVIDOR] Iniciado com sucesso na porta 3333.'))