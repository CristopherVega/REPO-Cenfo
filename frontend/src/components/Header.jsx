import { NavbarToggle } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useRol } from '../context/RolContext';


function Header() {

    const { usuario, rol, estaAutenticado, cerrarSesion } = useRol();
    const navigate = useNavigate();

    function manejarCerrarSesion() {
        cerrarSesion();
        navigate('/login');
    }

    const inicial = usuario ? usuario.nombre.trim()[0].toUpperCase() : '';

    return (
        <header>
            <Navbar expand="lg" className='navbar' data-bs-theme="dark">
                <Container>

                    <Navbar.Brand href='#'>Repo CENFO</Navbar.Brand>


                    <NavbarToggle aria-controls='basic-navbar-nav' />


                    <Navbar.Collapse id='basic-navbar-nav'>


                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to="/" id='inicio' href='#'>Inicio</Nav.Link>

                            <NavDropdown title="Repositorios" id='repositorios-dropdown'>
                                <NavDropdown.Item as={Link} to="/ListaRepos" id='listaRepos' >Lista de repositorios</NavDropdown.Item>
                                {estaAutenticado && (
                                    <NavDropdown.Item as={Link}to={"/RegistroRepos"} >Registrar Repositorio</NavDropdown.Item>
                                )}
                            </NavDropdown>

                            {['administrador', 'coordinador', 'docente'].includes(rol) && (
                                <Nav.Link as={Link} to="/Dashboard" id="dashboard">Dashboard</Nav.Link>
                            )}

                            {(rol === 'administrador' || rol === 'coordinador') && (
                                <NavDropdown title="Mantenimientos" id='mantenimientos-dropdown'>
                                    {rol === 'administrador' && <NavDropdown.Item as={Link} to={"/Mantenimientos/Usuarios"}>Usuarios</NavDropdown.Item>}
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Produccion"}>Tipos de Produccion</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Categorias"}>Categorias</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Area"}>Areas de conocimiento</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Tecnologias"}>Tecnologias</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Investigacion"}>Tipos de Investigacion</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Carreras"}>Carreras</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/Mantenimientos/Lineas"}>Lineas de Investigacion</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>

                        {estaAutenticado ? (
                            <NavDropdown
                                title={
                                    <div
                                        className='rounded-circle d-flex align-items-center justify-content-center text-white text-uppercase'
                                        style={{ width: '40px', height: '40px', fontWeight: 'bold', backgroundColor: '#6f42c1' }}
                                    >
                                        {inicial}
                                    </div>
                                }
                                id="dropdownRoles"
                                className="nav-perfil"
                                align="end"
                            >
                                <NavDropdown.Header className="text-start border-bottom pb-2 mb-1 fw-bold text-white">
                                    {usuario.nombre}
                                </NavDropdown.Header>

                                <NavDropdown.Header className="text-start border-bottom pb-2 mb-1 text-white">
                                    Rol: {rol}
                                </NavDropdown.Header>

                                <div className="my-2 px-3">
                                    <button
                                        className="btn btn-danger w-100"
                                        type="button"
                                        onClick={manejarCerrarSesion}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </NavDropdown>
                        ) : (
                            <Nav>
                                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
                            </Nav>
                        )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
