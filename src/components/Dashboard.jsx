import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard - MapaClientes
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-user me-2"></i>
                        Información del Usuario
                      </h5>
                      <p><strong>Nombre:</strong> {user.nombre}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Rol:</strong> 
                        <span className={`badge ms-2 ${user.rol === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                          {user.rol}
                        </span>
                      </p>
                      <p><strong>ID:</strong> {user.id}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="fas fa-chart-line me-2"></i>
                        Estadísticas
                      </h5>
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="border-end">
                            <h3 className="text-primary">15</h3>
                            <small>Clientes</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="border-end">
                            <h3 className="text-success">8</h3>
                            <small>Camiones</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <h3 className="text-warning">23</h3>
                          <small>Entregas</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="fas fa-cog me-2"></i>
                        Opciones Disponibles
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <div className="card border-primary">
                            <div className="card-body text-center">
                              <i className="fas fa-users fa-2x text-primary mb-2"></i>
                              <h6>Clientes</h6>
                              <p className="small">Gestionar clientes</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="card border-success">
                            <div className="card-body text-center">
                              <i className="fas fa-truck fa-2x text-success mb-2"></i>
                              <h6>Camiones</h6>
                              <p className="small">Gestionar flota</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="card border-info">
                            <div className="card-body text-center">
                              <i className="fas fa-map fa-2x text-info mb-2"></i>
                              <h6>Mapas</h6>
                              <p className="small">Ver rutas</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <div className="card border-warning">
                            <div className="card-body text-center">
                              <i className="fas fa-calendar fa-2x text-warning mb-2"></i>
                              <h6>Entregas</h6>
                              <p className="small">Programar entregas</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
