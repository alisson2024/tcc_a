import "./index.scss";

import MenuUsuario from "../../components/MenuUsuario/index.jsx";
import Cabe from "../../components/cabecalho/index.jsx";
import Rodape from "../../components/rodape/index.jsx";
import Card from "../../components/CardProduto/index.jsx";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Produto() {
    
	const {id} = useParams()
	const [produto, setProduto] = useState([]);

	async function buscar() {
		const url = `http://localhost:5002/select/produto/${id}`
		let resp = await axios.get(url)
		setProduto(resp.data)

		alert(JSON.stringify(produto)) 
	}

	useEffect( () => {
       buscar();

    }, []);


    /*
        "id":5,
        "tipo":"Batom",
        "img":"batom.jpg",
        "descricao":"Batom matte vermelho intenso",
        "valor":20,
        "disponivel":true,
        "estoque":100}
    */

    return (
        <div className="pagina-produto">
            <header>
                <MenuUsuario />
                <Cabe />
            </header>

            <main>
				<button onClick={buscar}>mostrar produto encontrado</button>


                <div className="botao-voltar">
                    <Link to={"/"}>
                        <div className="voltar">
                            <img
                                src="/assets/images/Arrowleft.png"
                                alt="seta"
                                width={25}
                            />
                            <h1>VOLTAR</h1>
                        </div>
                    </Link>
                </div>

                <div className="guia">
                    <p> home / </p>
					<p> produtos /  </p>
					<p> cremes capilares</p>
                </div>

                <div className="secao-produto">
                    
					<div className="container-flex">
                        <div className="imagem-produto">
                            <img src="/assets/images/Creme1.png" alt="" />
                        </div>

                        <div className="info">
                            <h1>Sérum Revitalizante loreal</h1>
                            <h2>R$ {Number(produto.valor).toFixed(2)}</h2>

                            <hr />

                            <div>
                                <h2>Categoria</h2>
                                <p>pentes/escovas</p>
                            </div>

                            <div className="numero">
                                <img
                                    src="/assets/images/RedesSociais/whatsapp.svg"
                                    alt="whatsapp"
                                />
                                <p>(11) 9999-9999</p>
                            </div>
                        </div>
                    </div>

                    <div className="descricao">
                        <hr className="linha" />
                        <h1>Descrição</h1>
                        <p>
                            {produto.descricao}
                        </p>
                    </div>
                </div>

                <div className="Produtos-relacionados">
                    <h1>Produtos Relacionados</h1>

                    <div className="produtos">
                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />

                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />

                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />

                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />

                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />
                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />

                        <Card
                            imagem="\assets\images\Makeup_Blue2.png"
                            alt="imagem produto"
                            preco={50}
                            nome="Nome do produto"
                        />
                    </div>
                </div>
            </main>

            <footer>
                <Rodape />
            </footer>
        </div>
    );
}
