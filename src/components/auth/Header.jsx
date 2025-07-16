import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center py-2">
          <div className="col-md-6">
            <h1 className="h4 mb-0">
              <i className="fas fa-map-marked-alt me-2"></i>
              MapaClientes
            </h1>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-end">
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user me-2"></i>
                  {user.nombre} {user.apellido}
                  <span className="badge bg-secondary ms-2">{user.rol}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <h6 className="dropdown-header">
                      <i className="fas fa-user-circle me-2"></i>
                      Información del Usuario
                    </h6>
                  </li>
                  <li>
                    <span className="dropdown-item-text">
                      <i className="fas fa-envelope me-2"></i>
                      {user.email}
                    </span>
                  </li>
                  <li>
                    <span className="dropdown-item-text">
                      <i className="fas fa-id-badge me-2"></i>
                      ID: {user.id}
                    </span>
                  </li>
                  <li>
                    <span className="dropdown-item-text">
                      <i className="fas fa-clock me-2"></i>
                      Último login: {new Date(user.lastLogin).toLocaleString()}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={onLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
