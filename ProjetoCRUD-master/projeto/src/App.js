import {BrowserRouter as Router} from 'react-router-dom'
import { Route, Routes} from "react-router"
import Navbar from './components/layout/Navbar';

import Produtos from './components/pages/Produtos'
import Relatorio from './components/pages/Relatorio'
import TipoProduto from './components/pages/TipoProduto'
import Venda from './components/pages/Venda'
import Visualizar from './components/pages/Visualizar';
import Cadastro from './components/pages/Cadastro';
import CadastroTipo from './components/pages/CadastroTipo';
import Editar from './components/pages/Editar';
import VisualizarTipo from './components/pages/VisualizarTipo';
import EditarTipo from './components/pages/EditarTipo';
import MostrarDetalhes from './components/pages/mostrarDetalhes';


function App() {
return (
<Router>
<Navbar/>
    <Routes>
        <Route exact path="/" element={<Venda />}> </Route>
    </Routes>
    <Routes>
        <Route path="/produtos" element={<Produtos />}> </Route>
    </Routes>
    <Routes>
        <Route path="/tipoproduto" element={<TipoProduto />}> </Route>
    </Routes>
    <Routes>
        <Route path="/relatorio" element={<Relatorio />}> </Route>
    </Routes>

    {/* LINKS DO CRUD DE PRODUTOS*/}

    <Routes>
        <Route path="/visualizar/:codigo" element={<Visualizar />}> </Route>
    </Routes>
    <Routes>
        <Route path="/cadastro" element={<Cadastro />}> </Route>
    </Routes>
    <Routes>
        <Route path="/editar/:codigo" element={<Editar />}> </Route>
    </Routes>
    <Routes>
        <Route path="/mostrardetalhe/:codigo" element={<MostrarDetalhes />}> </Route>
    </Routes>


   {/* LINKS DO CRUD DE PRODUTOS*/}
   <Routes>
        <Route path="/cadastrotipo" element={<CadastroTipo />}> </Route>
    </Routes>
    <Routes>
        <Route path="/visualizartipo/:codigo" element={<VisualizarTipo />}> </Route>
    </Routes>
    <Routes>
        <Route path="/editarTipo/:codigo" element={<EditarTipo />}> </Route>
    </Routes>

</Router>
);
  
}

export default App;
