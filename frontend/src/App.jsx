import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { RolProvider } from "./context/RolContext";
import Header from "./components/Header";
import Home from "./views/Home";
import Usuarios from "./views/Usuarios";
import Carreras from "./views/Carreras";
import Categorias from "./views/Categorias";
import Produccion from "./views/Produccion";
import Area from "./views/Area";
import Tecnologias from "./views/Tecnologias";
import Linea from "./views/Linea";
import Investigacion from "./views/Investigacion";
import Login from "./views/Login";
import Registro from "./views/Registro";
import ListaRepos from "./views/ListaRepos";
import RegistroRepo from "./views/RegistroRepo";
import Footer from "./components/Footer";
import Dashboard from "./views/Dashboard";

const RUTAS_SIN_LAYOUT = ["/login", "/registro"];

function Layout() {
    const location = useLocation();
    const ocultarLayout = RUTAS_SIN_LAYOUT.includes(location.pathname);

    return (
        <div className="d-flex flex-column min-vh-100">

            {!ocultarLayout && <Header />}

            <main className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/Mantenimientos/Usuarios" element={<Usuarios />} />
                    <Route path="/Mantenimientos/Carreras" element={<Carreras />} />
                    <Route path="/Mantenimientos/Categorias" element={<Categorias />} />
                    <Route path="/Mantenimientos/Produccion" element={<Produccion />}/>
                    <Route path="/Mantenimientos/Area" element={<Area />}/>
                    <Route path="/Mantenimientos/Tecnologias" element={<Tecnologias />}/>
                    <Route path="/Mantenimientos/Investigacion" element={<Investigacion />} />
                    <Route path="/Mantenimientos/Lineas" element={<Linea />}/>
                    <Route path="/ListaRepos" element={<ListaRepos />} />
                    <Route path="/RegistroRepos" element={<RegistroRepo />}/>
                    <Route path="/Dashboard" element={<Dashboard />}/>

                </Routes>
            </main>

            {!ocultarLayout && <Footer />}

        </div>
    );
}

function App() {

  return (
    <>
      <RolProvider >
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </RolProvider>
    </>

  )
}

export default App;
