import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRol } from '../context/RolContext';


function Footer() {
    const {rol}=useRol();
    return (
        <footer className="text-white mt-5 pb-4 footer">
            <div className="container">
                <section className="pt-4">
                    <div className="row text-center justify-content-center">
                        <div className="col-md-auto">
                            <h6 className="text-uppercase fw-bold">
                                <Link to="/" className="text-white link text-decoration-none">Inicio</Link>
                            </h6>

                        </div>
                        <div className="col-md-auto">
                            <h6 className="text-uppercase fw-bold">
                                <Link to="/ListaRepos" className="text-white link text-decoration-none">Repositorios</Link>
                            </h6>

                        </div>
                        {(rol==='administrador') &&(
                        <div className="col-md-auto">
                            <h6 className="text-uppercase fw-bold">
                                <Link to="/Mantenimientos/Usuarios" className="text-white link text-decoration-none">Mantenimiento</Link>
                            </h6>

                        </div>
                        )}
                    </div>
                </section>
             

                <hr className="my-2" />
                <section className="text-center">
                    <a href="https://www.facebook.com/UCenfotec/" className="text-white link me-4">
                        <FaFacebookF size={20} /></a>

                    <a href="https://x.com/UCenfotec?lang=en" className="text-white link me-4">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://www.instagram.com/ucenfotec/?hl=en" className="text-white link me-4">
                        <FaInstagram size={20} />
                    </a>

                </section>
            </div>

        </footer>
    )
}

export default Footer;