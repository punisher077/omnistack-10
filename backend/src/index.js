const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.listen(3030);

mongoose.connect(
	"mongodb+srv://omnistack:omnistack@cluster0-w4dsb.mongodb.net/dev_radar?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.use(routes);

// MÉTODOS HTTP
// GET = BUSCANDO INFO (LISTAR, BUSCAR UM E ETC)
// POST = CRIAR INFO (SALVAR, CADASTRAR)
// PUT = EDITAR IFO
// DELETE = DELETAR INFO

// TIPOS DE PARAMETRO
// query params: parametros usados para busca, filtros, ordenação etc (req.query)
//      (http://localhost:3333/busca?idade=20&tamanho=2)
//      ficam visiveis na URL

// route params: parametros usados para deletar ou editar (req.params)
//      (http://localhost:3333/users/1)
//      ficam visiveis na URL
//      são usados para identificar algo a ser deletado ou editado

// body: parametros usados para criar ou editar (req.body)
//      invisivel na URL
//      está no corpo da requisição
