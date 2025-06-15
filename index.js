import express from "express";

const port = 4200;
const host = "0.0.0.0";

const app = express();


app.get("/",(requisicao,resposta)=>{
    resposta.send(
        `<html lang="pt-br">
<   head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    </head>
    <body>
    
    </body>
    </html>`
    )
    })


app.linsten(port, host, ()=> {
    console.log("Servidor escutando na porta 4200")
});