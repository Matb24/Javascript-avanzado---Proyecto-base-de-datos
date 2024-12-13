import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { API_URL_ALMACEN } from "../../config.js";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./MenuAlm.css";

const Almacen = () => {
  const [objetos, setObjetos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [objetoSeleccionado, setObjetoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerObjetos();
  }, []);

  const obtenerObjetos = async () => {
    try {
      const response = await fetch(`${API_URL_ALMACEN}/almacen`);
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      const data = await response.json();
      setObjetos(data);
    } catch (error) {
      console.error("Error al cargar los objetos:", error);
      alert("Hubo un problema al cargar los objetos.");
    }
  };

  const abrirModalEdicion = (objeto) => {
    setObjetoSeleccionado(objeto);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setObjetoSeleccionado(null);
  };

  const guardarCambios = async () => {
    if (!objetoSeleccionado) return;
    try {
      const response = await fetch(`${API_URL_ALMACEN}/almacen/${objetoSeleccionado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objetoSeleccionado),
      });

      if (response.ok) {
        alert("Objeto actualizado correctamente");
        obtenerObjetos();
        cerrarModal();
      } else {
        alert("Error al actualizar el objeto");
      }
    } catch (error) {
      console.error("Error al actualizar el objeto:", error);
    }
  };

  const eliminarObjeto = async (id) => {
    try {
      const response = await fetch(`${API_URL_ALMACEN}/almacen/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Objeto eliminado correctamente");
        obtenerObjetos();
      } else {
        alert("Error al eliminar el objeto");
      }
    } catch (error) {
      console.error("Error al eliminar el objeto:", error);
    }
  };

  const handleLogout = () => {
    alert("Has cerrado sesión.");
    navigate("/"); // Redirige a la página de login
  };

  return (
    <div className="container my-4">
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          Almacén
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/registro">
                  Registrar producto
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row">
        {objetos.map((objeto) => (
          <div key={objeto._id} className="col-md-4 mb-4">
            <div
              className={`card bg-dark text-white border-${objeto.estado === 'disponible' ? 'success' : objeto.estado === 'dañado' ? 'danger' : objeto.estado === 'en espera' ? 'warning' : 'secondary'}`}
              onClick={() => abrirModalEdicion(objeto)}
            >
              <div className="card-body">
                <h5 className="card-title">{objeto.nombre}</h5>
                <p className="card-text">Cantidad: {objeto.cantidad}</p>
                <p className="card-text">Estado: {objeto.estado}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && objetoSeleccionado && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Editar Objeto</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={objetoSeleccionado.nombre}
                  onChange={(e) => setObjetoSeleccionado({ ...objetoSeleccionado, nombre: e.target.value })}
                />
                <label>Cantidad:</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={objetoSeleccionado.cantidad}
                  onChange={(e) => setObjetoSeleccionado({ ...objetoSeleccionado, cantidad: e.target.value })}
                />
                <label>Estado:</label>
                <select
                  className="form-select mb-3"
                  value={objetoSeleccionado.estado}
                  onChange={(e) => setObjetoSeleccionado({ ...objetoSeleccionado, estado: e.target.value })}
                >
                  <option value="disponible">Disponible</option>
                  <option value="dañado">Dañado</option>
                  <option value="en espera">En espera</option>
                  <option value="agotado">Agotado</option>
                </select>
                <label>Proveedor:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={objetoSeleccionado.proveedor}
                  onChange={(e) => setObjetoSeleccionado({ ...objetoSeleccionado, proveedor: e.target.value })}
                />
                <label>Descripción:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={objetoSeleccionado.descripcion}
                  onChange={(e) => setObjetoSeleccionado({ ...objetoSeleccionado, descripcion: e.target.value })}
                />
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={guardarCambios}>Guardar Cambios</button>
                <button type="button" className="btn btn-danger" onClick={() => eliminarObjeto(objetoSeleccionado._id)}>Eliminar</button>
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Almacen;
