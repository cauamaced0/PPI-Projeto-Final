import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const port = 4200;
const host = "0.0.0.0";
var listaUsuarios = [];
var listaEquipes = [];

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
                <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
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
                    <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
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
                <title>Lista de Usuarios</title>
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
                    <a class="nav-link btn btn-outline-danger rounded-pill px-3"  href="/logout">Sair</a>
            </li>
        </ul>   
    </div>
    </nav>
    <div class="container w-75 mb-10 mt-10">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col"> n° camisa</th>
                    <th scope="col"> posição</th>
                </tr>
            </thead>
                <tbody>`;
            for(let i= 0; i<listaUsuarios.length; i++)
                {
                    conteudo = conteudo+ `
                    <tr>
                        <td>${listaUsuarios[i].nomeJ}</td>
                        <td>${listaUsuarios[i].numCamisa}</td>
                        <td>${listaUsuarios[i].posicao}</td>`
                }

        conteudo = conteudo + `</tbody>
         </table>
          <div class="d-flex justify-content-between mt-4">
             <a href="/cadastrarJogador" class="btn btn-primary">Cadastrar Novamente</a>
             <a href="/Menu" class="btn btn-secondary">Voltar ao Menu</a>
         </div>
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
                            <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
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
                <input type="number" nome="numCamisa" class="form-control" id="numCamisa" >
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
                <button type="submit" class="btn btn-primary">Cadastrar</button>
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
    const numeroJ= Number(numJ);
    const dataN = requisicao.body.data;
    let dataLimiteInferior = new Date("1955-12-31");
    let dataLimiteSuperior = new Date("2025-06-18");
    let dataNascimento = new Date(dataN);
    const Altur = requisicao.body.Altura;
    const sexo = requisicao.body.sexo;
    const posicao = requisicao.body.posicao;
    const equipe = requisicao.body.equipe;
    if(nomeJ && !isNaN(numeroJ) && dataNascimento > dataLimiteInferior &&
    dataNascimento < dataLimiteSuperior && Altur && sexo && posicao && equipe){
        listaUsuarios.push({
        nomeJ: nomeJ,
        numCamisa: numJ,
        posicao:posicao
    });
    resposta.redirect("/listaUsuarios");
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
                            <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
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
            if(!numeroJ|| isNaN(numeroJ))
                {
                    conteudo = conteudo + `
                    <label for="inputnum4" class="form-label">número do jogador (n° da camisa)</label>
                    <input type="number" name="numCamisa" class="form-control" id="numCamisa" >
                    <span class="text-danger">Por favor informe o numero da camisa!</span>
                    `
                }
            else
            {
                conteudo = conteudo + `
                <label for="inputnum4" class="form-label">número do jogador (n° da camisa)</label>
                <input type="number" name="numCamisa" class="form-control" id="numCamisa" value="${numJ}" >
                `
            }
            conteudo = conteudo + `
            </div>
            <div class="col-12">
            `
        if(!dataN || dataN > "31-12-1955" || dataN < "18-6-2025")
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
            <input type="date" name="data" class="form-control" id="data" value="${dataN}">
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
            <input type="text" name="Altura" class="form-control" id="Altura" value="${Altur}">    
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
            <input type="text" name="sexo" class="form-control" id="sexo" value="${sexo}" >   
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
            <input type="text" name="posicao" class="form-control" id="posicao" value="${posicao}" >
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
                <span class="text-danger">Por favor insira uma equipe!</span>
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
                <select id="equipe" name="equipe" class="form-select" value="${equipe}">
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            `
        }
        conteudo = conteudo + `
        </div>
            <br>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
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

app.get("/cadastrarEquipe",verificarAutenticacao, (requisicao,resposta)=>{
    resposta.send(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastrar Equipe</title>
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
                            <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
                    </li>
                </ul>   
            </div>
            </nav>
        <br>
        <form method="POST" action="/cadastrarEquipe" class="w-50 mx-auto border rounded shadow p-4">
            <div class="col-md-6">
                <label for="inputNome4" class="form-label">Nome da Equipe:</label>
                <input type="text" name="equipe"class="form-control" id="equipe" >
            </div>
            <div class="col-12">
                <label for="inputAlt" class="form-label">Nome do Técnico Responsável:</label>
                <input type="text" name="nomeTec" class="form-control" id="nomeTec" >
            </div>
            <div class="col-md-4">
                <label for="celular" class="form-label">Telefone do Técnico Responsável:</label>
                <input type="tel" name="celular" class="form-control" id="celular" placeholder="(99) 99999-9999" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" required>
                <div class="form-text">Formato esperado: (99) 99999-9999</div>
            </div>
            <br>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`);
    resposta.end();
})

app.post("/cadastrarEquipe",verificarAutenticacao,(requisicao,resposta)=>{
    const nomeTec = requisicao.body.nomeTec;
    const equipe = requisicao.body.equipe;
    if(nomeTec && equipe)
        {
            listaEquipes.push({
                equipe : equipe,
                nomeTec : nomeTec
            });
            resposta.redirect("/listaEquipes")
        }
        else
        {
            let conteudo = `
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastrar Equipe</title>
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
                            <a class="nav-link btn btn-outline-danger rounded-pill px-3" href="/logout">Sair</a>
                    </li>
                </ul>   
            </div>
            </nav>
        <br>
        <form method="POST" action="/cadastrarEquipe" class="w-50 mx-auto border rounded shadow p-4">
            <div class="col-md-6">
            `
            if(!equipe)
                {
                    conteudo = conteudo + `
                    <label for="inputNome4" class="form-label">Nome da Equipe:</label>
                    <input type="text" name="equipe"class="form-control" id="equipe" >
                    <span class="text-danger">Por favor insira o nome da equipe!</span>
                    `
                }
            else
            {
                conteudo = conteudo + `
                <label for="inputNome4" class="form-label">Nome da Equipe:</label>
                <input type="text" name="equipe"class="form-control" id="equipe" value="${equipe}" >
                `
            }
            conteudo = conteudo +`
            </div>
            <div class="col-12">
            `
            if(!nomeTec)
                {
                    conteudo = conteudo + `
                    <label for="inputAlt" class="form-label">Nome do Técnico Responsável:</label>
                    <input type="text" name="nomeTec" class="form-control" id="nomeTec" >
                    <span class="text-danger">Por favor insira o nome do Tecnico Responsavel!</span>
                    `
                }
            else
            {
                conteudo = conteudo +`
                <label for="inputAlt" class="form-label">Nome do Técnico Responsável:</label>
                <input type="text" name="nomeTec" class="form-control" id="nomeTec" velue="${nomeTec}" >
                `
            }
            conteudo = conteudo +`
           </div>
            <div class="col-md-4">
                <label for="celular" class="form-label">Telefone do Técnico Responsável:</label>
                <input type="tel" name="celular" class="form-control" id="celular" placeholder="(99) 99999-9999" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" required>
                <div class="form-text">Formato esperado: (99) 99999-9999</div>
            </div>
            <br>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>
            `
        resposta.send(conteudo);
        resposta.end();
        }
})

app.get("/listaEquipes", verificarAutenticacao ,(requisicao,resposta) =>{
    let conteudo=`<html lang="pt-br">
    <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Lista de Equipes</title>
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
                    <a class="nav-link btn btn-outline-danger rounded-pill px-3"  href="/logout">Sair</a>
            </li>
        </ul>   
    </div>
    </nav>
    <div class="container w-75 mb-10 mt-10">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col"> Tecnico Responsavel</th>
                </tr>
            </thead>
                <tbody>`;
            for(let i= 0; i<listaEquipes.length; i++)
                {
                    conteudo = conteudo+ `
                    <tr>
                        <td>${listaEquipes[i].nomeJ}</td>
                        <td>${listaEquipes[i].numCamisa}</td>
                        <td>${listaEquipes[i].posicao}</td>`
                }

        conteudo = conteudo + `</tbody>
         </table>
          <div class="d-flex justify-content-between mt-4">
             <a href="/cadastrarEquipe" class="btn btn-primary">Cadastrar Novamente</a>
             <a href="/Menu" class="btn btn-secondary">Voltar ao Menu</a>
         </div>
            </div>
        </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </body>
    </html>`
resposta.send(conteudo);
    resposta.end();
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