import con from './connection.js'

export async function consultarProdutos() {
    let comando = `
       SELECT   id_produto    id,  
                tipo,		
                img,
                descricao,	
                valor,
                disponivel,
                estoque  
	    FROM produtos
    `

    let resposta = await con.query(comando, []);
    let registros = resposta[0]

    return registros;
}

export async function consultarProdutosid(idUsuario) {
    let comando = `
       SELECT   id_produto  id,  
                tipo,		
                img,
                descricao,	
                valor,
                disponivel,
                estoque,
                id_autonomo  
	    FROM produtos
        WHERE id_autonomo = ?
    `

    let resposta = await con.query(comando, [idUsuario]);
    let registros = resposta[0]

    return registros;
}

export async function inserirProdutos(produto) {
    let comando =
        `
    INSERT INTO produtos (tipo, img, descricao, valor, disponivel,estoque) VALUES
    (?, ?, ?, ?, ?, ?)
    `

    let resposta = await con.query(comando, [produto.tipo, produto.img, produto.descricao, produto.valor, produto.disponivel, produto.estoque]);
    let info = resposta[0]

    return info.insertId;
}

export async function alterarProdutos(produto, id) {
    let comando = `
    UPDATE produtos
    SET tipo = ?,
    img = ?,
    descricao = ?, 
    valor = ?, 
    disponivel = ?,
    estoque = ? 
    WHERE id_produto = ?;
    `

    let resposta = await con.query(comando, [produto.tipo, produto.img, produto.descricao, produto.valor, produto.disponivel, produto.estoque, id]);
    let info = resposta[0]

    return info.affectedRows;
}

export async function deletarProduto(id) {
    let comando = 
    `
    delete from produtos
    where id_produto = ?
    `
    
    let resposta = await con.query(comando, [id]);

    let info = resposta[0]

    let linhasAfetadas= info.affectedRows;

    return linhasAfetadas;
}