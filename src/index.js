const express = require("express");

const Route = require("./router");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", function(req, res){
    return res.json({mensaje: "Bienvenido a mi Proyecto backend API"});
});

app.use("/api", Route);

app.listen(PORT, function(){
    console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`);
});