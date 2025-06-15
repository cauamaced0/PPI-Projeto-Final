import express from "express";

const port = 4200;
const host = "0.0.0.0";

const app = express();



app.linsten(port, host, ()=> {
    console.log("Servidor escutando na porta 4200")
});