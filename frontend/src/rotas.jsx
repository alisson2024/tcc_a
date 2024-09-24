
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App/app.jsx";

export default function Navegacao() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
            </Routes>
        </BrowserRouter>
    )

}