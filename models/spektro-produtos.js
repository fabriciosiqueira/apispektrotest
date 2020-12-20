const mongoose = require('mongoose');

var SpektroProduto = mongoose.model('SpektroProduto', {
    nome: {
        type: String
    },
    categoria: {
        type: String
    },
    qtd: {
        type: Number
    },
    preco: {
        type: Number
    }
});

module.exports = { SpektroProduto };