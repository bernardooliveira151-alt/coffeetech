const mysql = require('mysql2/promise');
require('dotenv').config(); // Conserta o erro de leitura do .env

const connectDB = async () => {
  try {
    // Usa os nomes corretos do arquivo .env (DB_HOST, etc)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('🔌 MySQL Conectado com Sucesso!');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error.message);
    process.exit(1);
  }
};
// Exporta a função direta, não um objeto
module.exports = connectDB;