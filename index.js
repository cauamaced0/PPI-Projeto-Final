import express from "express";

const port = 4200;
const host = "0.0.0.0";

const app = express();


app.get("/",(requisicao,resposta)=>{
    resposta.send(
        `<html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Inicio</title>
    </head>
    <body>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
             <a class="navbar-brand" href="/">
                <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
         Inicio
            </a>
        </div>
    </nav>
    <br/>
    <div class="container w-75">
    <form action="/Menu" method="GET"class="row g-3 border p-3">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
             <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">Nós nunca compartilharemos o seu email com outros.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Senha</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary" href ="/Menu">Enviar</button>
    </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`
    )
    resposta.end();
    });

    app.get("/Menu",(requisicao,resposta)=>{
        resposta.send(`<html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Menu</title>
    </head>
    <body>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
             <a class="navbar-brand" href="/">
                <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
         Inicio
            </a>
        </div>
    </nav>
        <br/>
        <br>  
        <div class="container w-75">
        <p><b>Por favor, Selecione a opção desejada:</b></p>
           <form action="/cadastroJogador" method="GET" class="row g-3 border p-3">
                <button type="submit" class="btn btn-primary btn-lg">Cadastrar Jogador</button>
            </form>
            <form action="/cadastroEquipe" method="GET" class="row g-3 border p-3">
                <button type="submit" class="btn btn-primary btn-lg">Cadastrar Equipe</button>
            </form>
         </div>   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>
            `)
      resposta.end();      
    })

app.use(express.static('public'));

app.listen(port, host, ()=> {
    console.log("Servidor escutando na porta 4200")
});