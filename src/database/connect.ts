import { createConnection } from 'typeorm'

createConnection().then(() => console.log('🆗 [BANCO DE DADOS] Conectado com sucesso ao banco de dados "backend_dev"'))