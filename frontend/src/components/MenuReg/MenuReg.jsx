import React, { useState, useEffect } from "react";
import { API_URL_ALMACEN } from "../../config";
import { Link } from "react-router-dom";
import "./MenuReg.css";

const MenuReg = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [proveedor, setProveedor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // useEffect para forzar la recarga del CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./MenuReg.css?v=${new Date().getTime()}`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!nombre || !peso || !cantidad || !fechaIngreso) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const objetoData = {
      nombre,
      peso,
      cantidad,
      fechaIngreso,
      estado,
      proveedor,
      descripcion,
    };

    try {
      const response = await fetch(`${API_URL_ALMACEN}/almacen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoData),
      });

      const result = await response.json();

      if (response.status === 201) {
        setMessage("Objeto agregado exitosamente");
        setNombre("");
        setPeso("");
        setCantidad("");
        setFechaIngreso("");
        setEstado("disponible");
        setProveedor("");
        setDescripcion("");
      } else {
        setError(result.message || "Error al agregar objeto");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setError("Hubo un problema al agregar el objeto");
    }
  };

  return (
    <div className="container">
      {/* Barra Superior */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          <span>Almacén</span>
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
                <Link className="nav-link" to="/almacen">
                  Almacenar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-danger nav-link" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Formulario de Registro */}
      <div className="header">
        <h1>Registrar Nuevo Objeto</h1>
      </div>

      <form id="registerObjectForm" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre del objeto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (kg)</label>
          <input
            type="number"
            id="peso"
            name="peso"
            min="0"
            placeholder="Peso del objeto"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            min="1"
            placeholder="Cantidad disponible"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
          <input
            type="date"
            id="fechaIngreso"
            name="fechaIngreso"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="disponible">Disponible</option>
            <option value="dañado">Dañado</option>
            <option value="en espera">En espera</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="proveedor">Proveedor</label>
          <input
            type="text"
            id="proveedor"
            name="proveedor"
            placeholder="Nombre del proveedor"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar Objeto
        </button>
      </form>
    </div>
  );
};

export default MenuReg;
