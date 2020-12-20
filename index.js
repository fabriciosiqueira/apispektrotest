 const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');

 
 require('dotenv/config');
 //DB Connection
const connectDB = require('./src/database/Connection');
connectDB();

var produtoController = require('./controllers/produtoController.js');

 var app = express();
 app.use(bodyParser.json());

 //url da interface em angular, somente esse link terá acesso a API de Registro
 app.use(cors());

 app.listen(3000, () => console.log("Server iniciado com sucesso"));

//routes
app.use('/produtos', produtoController);