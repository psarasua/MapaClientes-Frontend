// ClientesPanel.jsx
// Panel principal para la gestión de clientes.
// Permite ver, crear, editar, eliminar y buscar clientes, así como ver su ubicación en el mapa.
// Maneja el estado y la lógica de interacción de la vista principal.

import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { apiFetch } from '../../services/api';
import ClienteModalMapa from "./ClienteModalMapa";
import ClienteModalFormulario from "./ClienteModalFormulario";
import { Button, Spinner, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster, toast } from 'sonner';
import OfflineMessage from '../ui/OfflineMessage';

const MySwal = withReactContent(Swal);

const ClientesPanel = React.memo(function ClientesPanel() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: null, lng: null });
  const [clienteEdit, setClienteEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAltaModal, setShowAltaModal] = useState(false);

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setConnectionError(false);
    try {
      const response = await apiFetch('/clientes');
      // Extraer datos de manera más robusta
      let clientesData = [];
      if (Array.isArray(response)) {
        clientesData = response;
      } else if (response && response.data) {
        clientesData = Array.isArray(response.data.data) ? response.data.data : 
                     Array.isArray(response.data) ? response.data : [];
      }
      
      setClientes(clientesData);
      if (response.info) {
        toast.info(response.info, { closeButton: true });
      }
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setConnectionError(true);
      toast.error('No se pudo conectar al servidor. Verificar conexión.', { closeButton: true });
      // Mantener los datos existentes para que la aplicación no se caiga
      setClientes(prev => Array.isArray(prev) ? prev : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClientes(); }, [fetchClientes]);

  const handleRowClick = (cliente) => {
    setClienteEdit(cliente);
    setShowEditModal(true);
  };

  const handleDeleteCliente = async (id, nombre) => {
    const result = await MySwal.fire({
      title: '¿Eliminar cliente?',
      text: `¿Seguro que deseas eliminar a "${nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
    });
    if (result.isConfirmed) {
      setLoading(true);
      try {
        await apiFetch(`/clientes/${id}`, { method: "DELETE" });
        fetchClientes();
        toast.success('Cliente eliminado correctamente', { closeButton: true });
      } catch {
        toast.error('Error al eliminar el cliente', { closeButton: true });
      } finally {
        setLoading(false);
      }
    }
  };

  // Columnas para react-data-table-component
  const columns = [
    { name: 'ID', selector: row => row?.id || '', sortable: true, width: '70px' },
    { name: 'Nombre', selector: row => row?.nombre || '', sortable: true },
    { name: 'Razón Social', selector: row => row?.razon || '', sortable: true },
    { name: 'Código Alternativo', selector: row => row?.codigo_alternativo || '', sortable: true },
    { name: 'Dirección', selector: row => row?.direccion || '', sortable: true },
    { name: 'Teléfono', selector: row => row?.telefono || '', sortable: true },
    { name: 'RUT', selector: row => row?.rut || '', sortable: true },
    { name: 'Activo', selector: row => row?.activo ? 'Sí' : 'No', sortable: true, width: '80px' },
    {
      name: 'Ubicación',
      selector: row => !!(row?.x && row?.y),
      cell: row => {
        const hasCoords = row?.x && row?.y;
        return (
          <button
            type="button"
            className="bg-transparent border-0 p-0 m-0 d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36, cursor: hasCoords ? 'pointer' : 'not-allowed' }}
            title={hasCoords ? `X: ${row.x}, Y: ${row.y}` : 'Sin coordenadas'}
            aria-label={hasCoords ? 'Ver ubicación en el mapa' : 'Sin ubicación'}
            tabIndex={hasCoords ? 0 : -1}
            disabled={!hasCoords}
            onClick={hasCoords ? () => { setMapCoords({ lat: row.y, lng: row.x }); setShowModal(true); } : undefined}
          >
            <i
              className="bi bi-flag-fill"
              style={{ fontSize: 18, color: hasCoords ? '#198754' : '#dc3545' }}
            ></i>
          </button>
        );
      },
      sortable: false,
      width: '56px',
    },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex gap-2">
          <Button 
            variant="outline-warning" 
            size="sm" 
            title={`Editar cliente ${row?.nombre || 'sin nombre'}`} 
            aria-label={`Editar cliente ${row?.nombre || 'sin nombre'}`} 
            onClick={() => handleRowClick(row)}
          >
            <FaPencilAlt aria-hidden="true" />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            title={`Eliminar cliente ${row?.nombre || 'sin nombre'}`} 
            aria-label={`Eliminar cliente ${row?.nombre || 'sin nombre'}`} 
            onClick={() => handleDeleteCliente(row?.id, row?.nombre || 'sin nombre')}
          >
            <FaTrash aria-hidden="true" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      width: '120px',
    },
  ];

  // Filtro avanzado: búsqueda por nombre y estado activo/inactivo
  const [estado, setEstado] = useState("");

  const filteredData = (Array.isArray(clientes) ? clientes : []).filter(c => {
    const matchNombre = filter.trim()
      ? c.nombre && typeof c.nombre === 'string' && c.nombre.toLowerCase().includes(filter.toLowerCase())
      : true;
    const matchEstado = estado === ""
      ? true
      : estado === "activo"
        ? c.activo
        : !c.activo;
    return matchNombre && matchEstado;
  });

  return (
    <>
      <Toaster richColors position="top-right" />
      <div>
        <div className="mb-4 d-flex justify-content-center align-items-center gap-3">
          <Form.Control
            type="search"
            className="text-center shadow-sm border-0 rounded-pill px-4 py-2"
            style={{ maxWidth: 350, fontSize: 18, background: "#f8f9fa" }}
            placeholder="🔍 Buscar por nombre..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            aria-label="Buscar clientes"
          />
          <Form.Select
            value={estado}
            onChange={e => setEstado(e.target.value)}
            style={{ maxWidth: 180, fontSize: 16 }}
            aria-label="Filtrar por estado"
          >
            <option value="">Todos</option>
            <option value="activo">Solo activos</option>
            <option value="inactivo">Solo inactivos</option>
          </Form.Select>
          <Button
            variant="success"
            className="rounded-pill px-4 py-2 shadow-sm"
            style={{ fontSize: 18 }}
            onClick={() => {
              setShowAltaModal(true);
              toast.info('Formulario de alta de cliente abierto', { closeButton: true });
            }}
          >
            + Nuevo Cliente
          </Button>
        </div>
        
        {connectionError && (
          <OfflineMessage 
            onRetry={fetchClientes}
            message="No se pudieron cargar los clientes. Verifica la conexión al servidor."
          />
        )}
        
        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 50, 100]}
          highlightOnHover
          pointerOnHover
          noDataComponent={<div className="text-center text-muted py-5" style={{fontSize: 18}}>No se encontraron clientes para el filtro actual.</div>}
          responsive
          striped
          dense
        />
        <div className="text-center text-secondary mt-2 mb-4" style={{fontSize: 16}}>
          Mostrando {filteredData.length} de {Array.isArray(clientes) ? clientes.length : 0} clientes
        </div>
        {/* Modales */}
        {showModal && (
          <ClienteModalMapa
            coords={mapCoords}
            onClose={() => setShowModal(false)}
            // ...otras props
          />
        )}
        {showEditModal && (
          <ClienteModalFormulario
            cliente={clienteEdit}
            onClose={() => setShowEditModal(false)}
            fetchClientes={fetchClientes}
            setClienteEdit={setClienteEdit}
          />
        )}
        {showAltaModal && (
          <ClienteModalFormulario
            onClose={() => setShowAltaModal(false)}
            // ...otras props
          />
        )}
      </div>
    </>
  );
});

export default ClientesPanel;
