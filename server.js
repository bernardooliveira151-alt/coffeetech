const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.static('public')); // Para servir o HTML
app.use(express.json()); // Para ler o JSON que vem do site

// Configuração do Banco de Dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'senai', // <--- COLOQUE SUA SENHA DO MYSQL AQUI
    database: 'coffeetech'
};

let connection = null;

// Função para conectar
async function connectDB() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        console.log('MySQL conectado com sucesso!');
        return conn;
    } catch (error) {
        console.error('Erro ao conectar no MySQL:', error);
    }
}

// --- ROTAS (O que o servidor sabe fazer) ---

// 1. LISTAR (GET)
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários');
    }
});

// 2. CRIAR (POST)
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
        await connection.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email]);
        res.status(201).send('Criado!');
    } catch (error) {
        res.status(500).send('Erro ao criar');
    }
});

// 3. DELETAR (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.send('Apagado!');
    } catch (error) {
        res.status(500).send('Erro ao apagar');
    }
});

// Iniciar o Servidor
async function startServer() {
    connection = await connectDB();
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000 🚀');
    });
}

startServer();