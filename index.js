import express from "express";

const port = 4200;
const host = "0.0.0.0";
var listaUsuarios = [];
var logado = false;

const app = express();

app.use(express.urlencoded({extended: true}))


app.get("/",(requisicao,resposta)=>{
    resposta.send(
        `<html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Login</title>
    </head>
    <body>
    <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="/">
      <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
      Inicio
    </a>
        <div class="d-flex align-items-center">
            <a class="navbar-brand" href="/listaUsuarios">Ususarios Logados</a>
            </div>
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
                <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
        </li>
     </ul>   
  </div>
</nav>
    <br/>
    <div class="container  mt-5">
    <form method="POST" action="/"  class="w-50 mx-auto border rounded shadow p-4">
    <h2 class="text-center mb-4">Login</h1>
        <div class="mb-3">
            <label for="exampleInputnome1" class="form-label">Nome</label>
            <input type="name" name="nome" class="form-control" id="nome" >
        </div> 
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" >
            <div id="emailHelp" class="form-text">Nós nunca compartilharemos o seu email com outros.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Senha</label>
            <input type="password" name="senha" class="form-control" id="senha" required>
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
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
            <a class="navbar-brand d-flex align-items-center" href="/">
            <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
            Inicio
            </a>
                <div class="d-flex align-items-center">
                    <a class="navbar-brand" href="/listaUsuarios">Ususarios Logados</a>
                    </div>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                        <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
                </li>
            </ul>   
        </div>
        </nav>
        <br/>
        <br>  
        <div class="container w-75 mt-10">
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

app.post("/",(requisicao, resposta)=>{
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    if(nome&&email){
    listaUsuarios.push({
        nome: nome,
        email: email
    });
    resposta.redirect("/Menu");
        }
        else{
        
       let conteudo = `<html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Inicio</title>
    </head>
    <body>
    <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
        Inicio
        </a>
            <div class="d-flex align-items-center">
                <a class="navbar-brand" href="/listaUsuarios">Ususarios Logados</a>
                </div>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                    <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
            </li>
        </ul>   
    </div>
    </nav>
    <br/>
    <div class="container  mt-5">
    <form method="POST" action="/"  class="w-50 mx-auto border rounded shadow p-4">
    <h2 class="text-center mb-4">Login</h1>
        <div class="mb-3">`
        if(!nome){
            conteudo = conteudo + `
            <label for="exampleInputnome1" class="form-label">Nome</label>
            <input type="name" name="nome" class="form-control" id="nome"  >
            <span class="text-danger">Por favor informe o nome!</span>`
        }
        else
        {
            conteudo = conteudo + `
            <label for="exampleInputnome1" class="form-label">Nome</label>
            <input type="name" name="nome" class="form-control" id="nome" value="${nome}" >
            `
        }
            conteudo = conteudo +`</div> 
        <div class="mb-3">`
        if(!email)
            {
                conteudo = conteudo+`
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email"  aria-describedby="emailHelp" >
                <span class="text-danger">Por favor informe o email!</span>`   
            }
            else{
                conteudo = conteudo + `
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" value="${email}" aria-describedby="emailHelp" >    
                `
            }
            conteudo = conteudo + `<div id="emailHelp" class="form-text">Nós nunca compartilharemos o seu email com outros.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Senha</label>
            <input type="password" name="senha" class="form-control" id="senha" required>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`
        
    resposta.send(conteudo);
    resposta.end();
        }
}); 

app.get("/listaUsuarios",(requisicao,resposta) =>{
    let conteudo=`<html lang="pt-br">
    <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
        Inicio
        </a>
            <div class="d-flex align-items-center">
                <a class="navbar-brand" href="/listaUsuarios">Ususarios Logados</a>
                </div>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                    <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
            </li>
        </ul>   
    </div>
    </nav>
    <div class="container w-75 mb-10 mt-10">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col"> email</th>
                </tr>
            </thead>
                <tbody>`;
            for(let i= 0; i<listaUsuarios.length; i++)
                {
                    conteudo = conteudo+ `
                    <tr>
                        <td>${listaUsuarios[i].nome}</td>
                        <td>${listaUsuarios[i].email}</td>`
                }

        conteudo = conteudo + `</tbody>
                </table>
            </div>
        </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`
resposta.send(conteudo);
    resposta.end();
});

app.get("/logout", (requisicao,resposta) =>{
    resposta.send("<p>Voce saiu do sistema</p>");
    resposta.end();
})

app.use(express.static('public'));

app.listen(port, host, ()=> {
    console.log("Servidor escutando na porta 4200")
});

console.log(`──▄────▄▄▄▄▄▄▄────▄───
─▀▀▄─▄█████████▄─▄▀▀──
─────██─▀███▀─██──────
───▄─▀████▀████▀─▄────
─▀█────██▀█▀██────█▀── caua_maced0`)