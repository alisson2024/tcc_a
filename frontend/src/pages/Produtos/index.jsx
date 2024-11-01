import "./index.scss";
import MenuUsuario from "../../components/MenuUsuario/index.jsx";
import Cabe from "../../components/cabecalho/index.jsx";
import Rodape from "../../components/rodape/index.jsx";
import Card from "../../components/CardProduto/index.jsx";

import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FiltroPreco from "../../components/filtro/index.jsx";

export default function Produtos() {
  const [produto, setProduto] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
  const [precoMax, setPrecoMax] = useState(2000);

  const categorias = [
    "pentes", "escovas", "shampoo", "condicionador",
    "mascara capilar", "creme", "esfoliante", "hidratante",
    "protetor", "sabonete", "perfumes", "maquiagem", "batom", "delineador","cabelos"
  ];

  async function buscarProdutos() {
    try {
      const url = `http://localhost:5002/produto/preco/`;
      const resp = await axios.post(url, { precoMax });
      const produtos = Array.isArray(resp.data) ? resp.data : [];
      setProduto(produtos);
      setProdutosFiltrados(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const filtrarProdutos = () => {
    let produtosFiltrados = produto;

    if (filtrosSelecionados.length > 0) {
      produtosFiltrados = produtosFiltrados.filter((item) =>
        filtrosSelecionados.includes(item.categoria.toLowerCase())
      );
    }
    
    setProdutosFiltrados(produtosFiltrados);
  };

  const handleFiltroClick = (categoria) => {
    setFiltrosSelecionados((prev) =>
      prev.includes(categoria)
        ? prev.filter((filtro) => filtro !== categoria)
        : [...prev, categoria]
    );
  };

  useEffect(() => {
    buscarProdutos();
  }, [precoMax]);

  useEffect(() => {
    filtrarProdutos();
  }, [filtrosSelecionados, produto]);

  return (
    <div className="pagina-produtos">
      <header>
        <MenuUsuario />
        <Cabe pesquisar={true} />
      </header>

      <main>
        <div className="container_principal">
          <div className="filtros">
            <h2>Filtros</h2>
            <FiltroPreco setPrecoMax={setPrecoMax} />

            <h2>Tipo de produto</h2>
            <div className="categorias">
              {categorias.map((categoria, idx) => (
                <div key={idx} className="click">
                  <input
                    className="check"
                    type="checkbox"
                    checked={filtrosSelecionados.includes(categoria)}
                    onChange={() => handleFiltroClick(categoria)}
                  />
                  <p>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="listaProdutos">
            <h1>Resultados Principais</h1>
            <div className="produtos">
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((item) => (
                  <Link to={`/produto/${item.id}`} key={item.id}>
                    <Card
                      imagem={item.img}
                      alt={item.img}
                      preco={item.valor}
                      nome={item.nome}
                    />
                  </Link>
                ))
              ) : (
                <p>Nenhum produto encontrado</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Rodape />
      </footer>
    </div>
  );
}