import { createConnection } from 'typeorm'

createConnection().then(() => console.log('🆗 [BANCO DE DADOS] Conectado com sucesso ao banco de dados "mestres_da_web"'))