import React, { useEffect, useState } from 'react';
import { API_URL_ALMACEN } from '../config.js';
import './MenuAlm.css'; // Asegúrate de que las clases CSS estén en este archivo

const Almacen = () => {
  const [objetos, setObjetos] = useState([]);

  // Función para obtener los objetos
  const obtenerObjetos = async () => {
    try {
      const response = await fetch(`${API_URL_ALMACEN}/almacen`);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      setObjetos(data); // Guardamos los objetos en el estado
    } catch (error) {
      console.error("Error al cargar los objetos:", error);
      alert("Hubo un problema al cargar los objetos.");
    }
  };

  useEffect(() => {
    obtenerObjetos();
  }, []); // Este hook se ejecuta solo una vez, cuando se carga el componente

  // Función para convertir la fecha ISO a formato local
  const convertirFechaISOAFormatoLocal = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toISOString().split("T")[0]; // Extrae solo la parte de la fecha
  };

  // Función para abrir el modal de edición
  const abrirModalEdicion = (idProducto, objeto) => {
    // Aquí debes manejar la apertura del modal y la carga de los datos en el formulario
    console.log('Abriendo modal de edición para el objeto:', objeto);
  };

  return (
    <div id="contenedorObjetos">
      <div className="grid">
        {objetos.map((objeto, index) => {
          // Creación de las cards por cada objeto
          return (
            <div
              key={objeto._id}
              className={`card ${objeto.estado.toLowerCase()}`}
              onClick={() => abrirModalEdicion(objeto._id, objeto)}
            >
              <div className="info">
                <h3>{objeto.nombre}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Almacen;
