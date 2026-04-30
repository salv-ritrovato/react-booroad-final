import { Link } from "react-router-dom";

export default function AppHeader() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top px-3 custom-navbar">
            <div className="container-fluid">
                {/* BOOROAD LOGO */}
                <Link className="navbar-brand d-flex align-items-center fw-bold" to="/travel">
                    <i className="bi bi-airplane-engines-fill text-turquoise me-2"></i>
                    <span className="logo-text">
                        BOO<span className="text-turquoise">ROAD</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* NAVBAR BUTTONS */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto ms-lg-4">
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="#">
                                <i className="bi bi-speedometer2 me-1"></i> Pannello di Controllo
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="#">
                                <i className="bi bi-geo-alt me-1"></i> I miei Viaggi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="#">
                                <i className="bi bi-calendar3 me-1"></i> Calendario
                            </Link>
                        </li>
                    </ul>
                    {/* LOGOUT BUTTON */}
                    <div className="d-flex">
                        <Link to="/" className="text-decoration-none">
                            <button className="btn navbar-btn btn-sm d-flex align-items-center px-4 rounded-pill">
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}