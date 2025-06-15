export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body || {};
    let data = '';

    // Para ler o body no serverless
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const parsed = new URLSearchParams(data);
      const nome = parsed.get('nome');
      const email = parsed.get('email');
      res.status(200).send(`Nome: ${nome}, Email: ${email}`);
    });
  } else {
    res.status(405).send('Método não permitido');
  }
}