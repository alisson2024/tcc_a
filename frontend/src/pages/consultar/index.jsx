import { useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Cabe } from "../../components/cabecalho/index.jsx";
import Rodape from "../../components/rodape/index.jsx";

import axios from "axios";

export default function Consultar() {
    const [produtos, setProdutos] = useState([]);
    const [token, setToken] = useState(null);

    const Navigate = useNavigate();

    async function buscar(token) {
        const url = `http://localhost:5002/select/produto?x-access-token=${token}`;
        let resp = await axios.get(url);
        setProdutos(resp.data);
    }

    async function deletar(id, token) {
        // Remova o parâmetro id
        const url = `http://localhost:5002/delete/produto/${id}?x-access-token=${token}`; // Substitua o parâmetro id
        await axios.delete(url);

        await buscar(token);
    }

    async function sair() {
        localStorage.setItem("USUARIO", null);
        Navigate("/");
    }

    useEffect(() => {
        let token = localStorage.getItem("USUARIO");
        setToken(token);

        if (token === "null") {
            Navigate("/");
        } else {
            buscar(token);
        }
    }, [Navigate]);

    return (
        <div className="pagina-consultar">
            <header>
                <Cabe />
            </header>

            <main>
                <div className="opcoes">
                    <button className="sair" onClick={sair}>Sair</button>
                    <button>
                        <Link to={"/cadastrar"}>Adicionar Item</Link>
                    </button>
        
                </div>

                <div className="tabela" style={{ overflow: "auto" }}>
                    <table>
                        <thead>
                            <tr className="bak">
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Imagem</th>
                                <th>Descricao</th>
                                <th>Valor</th>
                                <th>Estoque</th>
                                <th>Disponivel</th>
                                <th>Alterar ou excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtos.map((item) => (
                                <tr>
                                    <td>
                                        #{item.id.toString().padStart(2, "0")}
                                    </td>
                                    <td>{item.tipo}</td>
                                    <td>{item.img}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.estoque}</td>
                                    {/* <td>{new Date(item.vinganca).toLocaleDateString()}</td> */}
                                    <td>{item.disponivel ? "Sim" : "Não"}</td>
                                    <td>
                                        <Link to={`/cadastrar/${item.id}`}>
                                            <img
                                                src="/assets/images/editar.png"
                                                alt="icone_alterar"
                                                width={48}
                                            />
                                        </Link>

                                        <Link
                                            onClick={() =>
                                                deletar(item.id, token)
                                            }
                                        >
                                            <img
                                                src="/assets/images/Remover.svg"
                                                alt="icone_lixo"
                                                width={48}
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="verMais">
                    <hr />
                    <button>Ver Mais</button>
                    <hr />
                </div>
            </main>

            <footer>
                <Rodape />
            </footer>
        </div>
    );
}
