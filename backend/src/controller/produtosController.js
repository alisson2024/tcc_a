import * as db from "../repository/produtosRepository.js";
import alterarImagemService from "../service/AlterarImagemService.js";

import { autenticar } from "../utils/jwt.js";

import multer from 'multer'

import { Router } from "express";
import consultarProdutosIDService from "../service/consultarProdutosIDService.js";
import consultarProdutosNomeService from "../service/consultarProdutosNomeService.js";
import inserirProdutoService from "../service/inserirProdutoService.js";
import alterarProdutoService from "../service/alterarProdutoService.js";
import removerProdutoService from "../service/RemoverProdutoService.js";

const endpoints = Router();

//seleciona todos os produtos
endpoints.get("/select/produto", autenticar, async (req, resp) => {
    try {
        //Recebe o id pelo Token
        let idUsuario = req.user.id;

        let produto = await db.consultarProdutos(idUsuario);

        resp.send(produto);
    } catch (error) {
        resp.send({
            Error: error.message,
        });
    }
});

//Seleciona um id especifico
endpoints.get("/select/produto/:id", autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let produto = await consultarProdutosIDService(id);

        resp.send(produto[0]);
    } catch (error) {
        resp.send({
            Error: error.message
        });
    }
});

//Busca produtos por nome ou pela descrição
endpoints.get("/produto/nome", autenticar, async (req, resp) => {
    try {
        let buscar = req.body;

        let produtos = await consultarProdutosNomeService(buscar)
        
        resp.send(produtos);
    } catch (err) {
        resp.send({
            Error: err.message,
        });
    }
});

//insere um novo produto
let uploadImagemProduto = multer({dest: './storage/produtos'})
endpoints.post("/insert/produto", autenticar, uploadImagemProduto.single('produto'), async (req, resp) => {
    try {
        let id = req.user.id;
        
        let produto = null
        let caminhoImagem = null

        if (!req.body.data){
            //Usar o body ainda funciona
            produto = req.body
            caminhoImagem = produto.img 
        } else {
            produto = JSON.parse(req.body.data)
            
            //verifica se algum arquivo foi enviado
            if (req.file && req.file.path) {
                caminhoImagem = req.file.path;
            } else {
                console.log('Nenhum arquivo foi enviado.');
                caminhoImagem = produto.img
            }
        }

        let resposta = await inserirProdutoService(produto, caminhoImagem, id)

        resp.send({
            id: resposta
        });
    } catch (error) {
        resp.send({
            Error: error.message,
        });
    }
});

/* Thunder client
            Body > Form

            Marca a caxinha "Files"

            Files
            field name = produto
            "escolher imagem"
        */
//inserindo uma imagem
let atualizarImagemProduto = multer({dest: './storage/produtos'})
endpoints.put("/update/imagem/:id", autenticar, atualizarImagemProduto.single('produto'), async (req, resp) => {
        try {
            let id = req.params.id;
            let caminhoImagem = req.file.path;
            let extensao = req.file.mimetype
            let nome = req.file.originalname

            //processamento (service)
            let linhasAfetadas = await alterarImagemService(id, caminhoImagem)

            //saida
            resp.send({
                linhasAfetadas: linhasAfetadas,
                Nome: nome,
                Extensao: extensao
            });
        } catch (error) {
            resp.send({
                Error: error.message
            })
        }
    }
)

//Altera um produto
endpoints.put("/update/produto/:id", autenticar, async (req, resp) => {
    try {
        let idProduto = req.params.id;
        let produto = req.body;

        let resposta = await alterarProdutoService(produto, idProduto)

        resp.send({
            linhasAfetadas: resposta
        });
    } catch (error) {
        resp.send({
            Error: error.message,
        });
    }
});

//Remove um produto
endpoints.delete("/delete/produto/:id", autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let resposta = await removerProdutoService(id)

        resp.send({
            linhasAfetadas: resposta,
        });
    } catch (error) {
        resp.send({
            Error: error.message,
        });
    }
});

export default endpoints;
