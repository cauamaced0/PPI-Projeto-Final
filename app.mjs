import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurações iniciais
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para interpretar dados URL-encoded
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com a requisição POST
app.post('/submit', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    res.send(`Nome: ${nome}, Email: ${email}`);
});

// Inicia o servidor
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});