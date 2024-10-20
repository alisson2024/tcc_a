
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/Landing/index.jsx";
import Tabela from "./pages/cadastrar/index.jsx";
import Consultar from "./pages/consultar/index.jsx";
import Light from "./pages/Light_digital/index.jsx";
import Produto from "./pages/Produto/index.jsx";
import Cadastrar from "./pages/cadastrar/index.jsx";
import Login from "./pages/Login/index.jsx";
import Not from "./pages/not_found/index.jsx";
import Sobre from "./pages/sobrenos/index.jsx";
import Esqueceu_senha_codigo from "./pages/esqueceu_senha_codigo/index.jsx";
import Esqueceu_senha_email from "./pages/esqueceu_senha_email/index.jsx";
import Esqueceu_senha_senha from "./pages/esqueceu_senha_senha/index.jsx";


export default function Navegacao() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tabela" element={<Tabela />} />
                <Route path="/consultar" element={<Consultar />} />
                <Route path="/light" element={<Light />} />
                <Route path="/produto" element={<Produto />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/cadastrar/:id" element={<Cadastrar />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/sobre" element={<Sobre/>} />
                <Route path="/esqueceu_senha_codigo" element={<Esqueceu_senha_codigo />} />
                <Route path="/esqueceu_senha_email" element={<Esqueceu_senha_email/>} />
                <Route path="/esqueceu_senha_senha" element={<Esqueceu_senha_senha/>} />

                <Route path="*" element={<Not />} />
            </Routes>
        </BrowserRouter>
    )
}