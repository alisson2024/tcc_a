import "./index.scss";
import { Link } from "react-router-dom";

export default function Cabe({ pesquisar }) {
    return (
        <div className="secao-cabecalho">
            <div className="barraInfo">
                <div className="telefone">
                    <img
                        className="tel"
                        src="/assets/images/icones/telefone.svg"
                        alt="tel"
                    />
                    <p>(11) 94033-0018</p>
                </div>

                <div className="localizacao">
                    <img
                        className="loc"
                        src="/assets/images/icones/localização.svg"
                        alt="localização"
                    />
                    <p> Rua Ricardo Lúcio da Gama, 123</p>
                </div>
            </div>

            <div className="secao-navegacao">
                <div className="logo">
                    <Link to={"/"}>
                        <img
                            className="logo"
                            src="/assets/images/logo/Ashey-Logo.svg"
                            alt="logo"
                        />
                    </Link>
                </div>

                <div className="navegacao">
                    <Link to="/">
                        <h3>Inicio</h3>
                    </Link>

                    <div className="linha" />

                    <Link to="/produtos">
                        <h3>Produtos</h3>
                    </Link>

                    <div className="linha" />

                    <Link to="/sobre">
                        <h3>Sobre nós</h3>
                    </Link>

                    <div className="linha" />
                    <Link to="/ajuda">
                        <h3>FAQ</h3>
                    </Link>
                </div>

                {pesquisar && (
                    <div className="pesquisa">
                        <input type="search" placeholder="Pesquisar" />

                        <img
                            src="/assets/images/search.png"
                            alt="pesquisar"
                            width={25}
                            height={25}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
