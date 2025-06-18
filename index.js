import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const port = 4200;
const host = "0.0.0.0";
var listaUsuarios = [];

const app = express();

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: "Ch4V3$3cR3T4",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 *60 * 30}, // 1000milisegundos = 1 segundo * 60= 60 segundos= 1 minuto *30 = 30 min
    httpOnly: true,
    secure: false
}));

app.use(cookieParser());

app.get("/", (requisicao,resposta)=>{
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

    app.get("/Menu", verificarAutenticacao, (requisicao,resposta)=>{
        const ultimoLogin = requisicao.cookies.ultimoLogin;
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
                     <span class="navbar-text">${ultimoLogin?"Ultimo acesso: " +ultimoLogin:""}</span> 
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
           <form action="/cadastrarEquipe" method="GET" class="row g-3 border p-3">
                <button type="submit" class="btn btn-primary btn-lg">Cadastro de Equipes</button>
            </form>
            <form action="/cadastrarJogador" method="GET" class="row g-3 border p-3">
                <button type="submit" class="btn btn-primary btn-lg">Cadastro de Jogadores</button>
            </form>
         </div>   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>
            `)
      resposta.end();      
    })

app.post("/", (requisicao, resposta)=>{
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    if(nome == "admin"&&email &&senha=="123"){
        requisicao.session.logado = true;
        const dataHoraAtual = new Date();
        resposta.cookie('ultimoLogin', dataHoraAtual.toLocaleString(), { maxAge: 1000 *60 * 30});
        resposta.redirect("/Menu");
        }
        else{
        
       let conteudo = `<html lang="pt-br">
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

app.get("/listaUsuarios", verificarAutenticacao ,(requisicao,resposta) =>{
    let conteudo=`<html lang="pt-br">
    <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastrar Jogador</title>
            </head>
            <body>
    <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
        Inicio
        </a>
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

app.get("/cadastrarJogador",verificarAutenticacao, (requisicao,resposta)=>{
    resposta.send(
        `<html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastrar Jogador</title>
            </head>
            <body>
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                     <a class="navbar-brand d-flex align-items-center" href="/">
                         <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
                     Inicio
                     </a>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                            <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
                    </li>
                </ul>   
            </div>
            </nav>
        <br>
        <form method="POST" action="/cadastrarJogador" class="w-50 mx-auto border rounded shadow p-4">
            <div class="col-md-6">
                <label for="inputNome4" class="form-label">Nome do jogador:</label>
                <input type="name" name="nomeJ"class="form-control" id="nomeJ" >
            </div>
            <div class="col-md-6">
                <label for="inputnum4" class="form-label">número do jogador (n° da camisa)</label>
                <input type="text" nome="numCamisa" class="form-control" id="numCamisa" >
            </div>
            <div class="col-12">
                <label for="date" class="form-label">Data de Nascimento:</label>
                <input type="date" name="data" class="form-control" id="data" >
            </div>
            <div class="col-12">
                <label for="inputAlt" class="form-label">Altura em cm:</label>
                <input type="text" name="Altura" class="form-control" id="Altura" >
            </div>
            <div class="col-md-6">
                <label for="sexo" class="form-label">gênero (sexo):</label>
                <input type="text" name="sexo" class="form-control" id="sexo" >
            </div>
            <div class="col-md-2">
                <label for="posicao" class="form-label">Posição:</label>
                <input type="text" name="posicao" class="form-control" id="posicao" >
            </div>
            <div class="col-md-4">
                <label for="equip" class="form-label">Equip:</label>
                <select id="equipe" name="equipe" class="form-select" >
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            </div>
            <br>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </form>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`)
    resposta.end();
});

app.post("/cadastrarJogador",verificarAutenticacao,(requisicao,resposta)=>{
    const nomeJ = requisicao.body.nomeJ;
    const numJ = requisicao.body.numCamisa;
    const dataN = requisicao.body.data;
    const Altur = requisicao.body.Altura;
    const sexo = requisicao.body.sexo;
    const posicao = requisicao.body.posicao;
    const equipe = requisicao.body.equipe;
    if(nomeJ && numJ && dataN > "31-12-1955" &&dataN < "18-6-2025" && Altura && Altur && sexo && posicao && equipe){
        resposta.redirect("/listaUsuarios");
        listaUsuarios.push({
        nome: nome,
        email: email
    });
        }
     else
     {
        let conteudo = `<html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastrar Jogador</title>
            </head>
            <body>
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                     <a class="navbar-brand d-flex align-items-center" href="/">
                         <img src="/img/Logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
                     Inicio
                     </a>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                            <a class=""nav-link btn btn-outline-danger rounded-pill px-3" " href="/logout">Sair</a>
                    </li>
                </ul>   
            </div>
            </nav>
        <br>
        <form method="POST" action="/cadastrarJogador" class="w-50 mx-auto border rounded shadow p-4">
            <div class="col-md-6">`
            if(!nomeJ)
                {
                    conteudo= conteudo + `
                    <label for="inputNome4" class="form-label">Nome do jogador:</label>
                    <input type="name" name="nomeJ"class="form-control" id="nomeJ" >
                    <span class="text-danger">Por favor informe o nome!</span>
                    `
                }
            else
            {
                conteudo = conteudo + `
                <label for="inputNome4" class="form-label">Nome do jogador:</label>
                <input type="name" name="nomeJ"class="form-control" id="nomeJ" value="${nomeJ}">    
                `
            }
            conteudo= conteudo + `
            </div>
            <div class="col-md-6">
            `
            if(!numJ|| isNaN(numJ))
                {
                    conteudo = conteudo + `
                    <label for="inputnum4" class="form-label">número do jogador (n° da camisa)</label>
                    <input type="text" name="numCamisa" class="form-control" id="numCamisa" >
                    <span class="text-danger">Por favor informe o numero da camisa!</span>
                    `
                }
            else
            {
                conteudo = conteudo + `
                <label for="inputnum4" class="form-label">número do jogador (n° da camisa)</label>
                <input type="text" name="numCamisa" class="form-control" id="numCamisa" value="${numJ}" >
                `
            }
            conteudo = conteudo + `
            </div>
            <div class="col-12">
            `
        if(!dataN)
            {
                conteudo = conteudo + `
                <label for="date" class="form-label">Data de Nascimento:</label>
                <input type="date" name="data" class="form-control" id="data">
                <span class="text-danger">Por favor insira uma data de nascimento valida!</span>
                `
            }
        else
        {
            conteudo = conteudo + `
            <label for="date" class="form-label">Data de Nascimento:</label>
            <input type="date" name="data" class="form-control" id="data">
            `
        }
        conteudo = conteudo + `
        </div>
        <div class="col-12">
        `
        if(!Altur)
            {
                conteudo = conteudo + `
                <label for="inputAlt" class="form-label">Altura em cm:</label>
                <input type="text" name="Altura" class="form-control" id="Altura" >
                <span class="text-danger">Por favor insira uma altura!</span>
                `
            }
        else
        {
            conteudo = conteudo + `
            <label for="inputAlt" class="form-label">Altura em cm:</label>
            <input type="text" name="Altura" class="form-control" id="Altura" >    
            `
        }
        conteudo = conteudo + `
        </div>
        <div class="col-md-6">
        `
        if(!sexo)
            {
                conteudo = conteudo + `
                <label for="sexo" class="form-label">gênero (sexo):</label>
                <input type="text" name="sexo" class="form-control" id="sexo" >
                <span class="text-danger">Por favor insira um genero!</span>
                `
            }
        else
        {
            conteudo = conteudo + `
            <label for="sexo" class="form-label">gênero (sexo):</label>
            <input type="text" name="sexo" class="form-control" id="sexo" >   
            `
        }
       conteudo = conteudo + `
        </div>
        <div class="col-md-2">
       ` 
       if(!posicao)
        {
             conteudo = conteudo + `
              <label for="posicao" class="form-label">Posição:</label>
            <input type="text" name="posicao" class="form-control" id="posicao" >
            <span class="text-danger">Por favor insira uma posicao!</span>
             `
        }
        else
        {
            conteudo = conteudo + `
            <label for="posicao" class="form-label">Posição:</label>
            <input type="text" name="posicao" class="form-control" id="posicao" >
            `
        }
        conteudo = conteudo + `
        </div>
        <div class="col-md-4">
        `
        if(!equipe)
            {
                conteudo = conteudo + `
                <label for="equip" class="form-label">Equip:</label>
                <span class="text-danger">Por favor insira uma equip!</span>
                <select id="equipe" name="equipe" class="form-select" >
                <option selected>Choose...</option>
                <option>...</option>
                </select>
                `
            }
        else
        {
            conteudo = conteudo + `
            <label for="equip" class="form-label">Equip:</label>
                <select id="equipe" name="equipe" class="form-select" >
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            `
        }
        conteudo = conteudo + `
        </div>
            <br>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </form>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>
        `
        resposta.send(conteudo);
        resposta.end();
     }   
});

function verificarAutenticacao(requisicao,resposta, next)
{
    if(requisicao.session.logado)
        {
            next();
        }
    else
    {
        resposta.redirect("/");
    }
};

app.get("/logout", (requisicao,resposta) =>{
    requisicao.session.destroy();
    resposta.redirect("/");
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