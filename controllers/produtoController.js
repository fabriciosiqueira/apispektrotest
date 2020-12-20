const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();

const { SpektroProduto } = require('../models/spektro-produtos');


/* CRUD */

//Create
router.post('/', (req,res) => {
    if(req.body.nome == "") {
        let doc = "Voce precisa preencher o formulario"
        res.send(doc);
    } else {

        const produto = new SpektroProduto({
            nome: req.body.nome,
            categoria: req.body.categoria,
            qtd: req.body.qtd,
            preco: req.body.preco,
        });
    
        produto.save((err, doc) => {
            if (!err) { 
                console.log(doc)
                res.send(doc);
            } else {
                console.log('Error ao salvar Produto: ' + JSON.stringify(err, undefined, 2));
            }
        });

    }
    
});



//Read
router.get('/', (req,res) => {
    SpektroProduto.find((err,docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("Error ao retornar lista de Produtos: " + JSON.stringify(err, undefined, 2))
        }
    });
});

//Update
router.put('/:id', (req, res) => {

    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`Nao ha nada gravado com id dado: ${req.params.id}`);
    } 

    const produto = {
        nome: req.body.nome,
        categoria: req.body.categoria,
        qtd: req.body.qtd,
        preco: req.body.preco,
    };

    SpektroProduto.findByIdAndUpdate(req.params.id, { $set: produto }, { new:true }, (err,doc) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log("Error ao atualizar dados do Produto: " + JSON.stringify(err, undefined, 2))
        }      
    });
});

//Delete
router.delete('/:id', (req,res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`Nao ha nada gravado com id dado: ${req.params.id}`);
    }
    SpektroProduto.findByIdAndRemove(req.params.id, (err,doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error ao remover Produto: " + JSON.stringify(err, undefined, 2))
        }       
    }) 
})



module.exports = router;
