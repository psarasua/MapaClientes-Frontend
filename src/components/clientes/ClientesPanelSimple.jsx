// ClientesPanelSimple.jsx
// Versión simplificada para depurar errores
import React, { useEffect, useState, useCallback } from "react";
import { apiFetch } from '../../services/api';
import { toast } from 'sonner';
import { Card, Alert, Button } from 'react-bootstrap';

const ClientesPanelSimple = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching clientes...');
      const response = await apiFetch('/clientes');
      console.log('Response:', response);
      
      let clientesData = [];
      if (Array.isArray(response)) {
        clientesData = response;
      } else if (response && response.data) {
        clientesData = Array.isArray(response.data.data) ? response.data.data : 
                     Array.isArray(response.data) ? response.data : [];
      }
      
      console.log('Processed data:', clientesData);
      setClientes(clientesData);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setError(error.message);
      toast.error('Error al cargar clientes: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        <Alert.Heading>Error</Alert.Heading>
        <p>Error al cargar los clientes: {error}</p>
        <Button onClick={fetchClientes}>Intentar de nuevo</Button>
      </Alert>
    );
  }

  return (
    <div className="m-4">
      <Card>
        <Card.Header>
          <h3>Clientes (Modo Depuración)</h3>
          <p>Total: {clientes.length} clientes</p>
        </Card.Header>
        <Card.Body>
          {clientes.length === 0 ? (
            <Alert variant="info">No hay clientes para mostrar</Alert>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Razón Social</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Activo</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente, index) => (
                    <tr key={cliente?.id || index}>
                      <td>{cliente?.id || 'N/A'}</td>
                      <td>{cliente?.nombre || 'N/A'}</td>
                      <td>{cliente?.razon || 'N/A'}</td>
                      <td>{cliente?.direccion || 'N/A'}</td>
                      <td>{cliente?.telefono || 'N/A'}</td>
                      <td>{cliente?.activo ? 'Sí' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientesPanelSimple;
