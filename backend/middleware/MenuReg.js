import { API_URL_ALMACEN } from '../config.js';

document.getElementById("registerObjectForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const objetoData = {
        nombre: document.getElementById("nombre").value,
        peso: document.getElementById("peso").value,
        cantidad: document.getElementById("cantidad").value,
        fechaIngreso: document.getElementById("fechaIngreso").value,
        estado: document.getElementById("estado").value,
        proveedor: document.getElementById("proveedor").value,
        descripcion: document.getElementById("descripcion").value
    };

    try {
        const response = await fetch(`${API_URL_ALMACEN}/almacen`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Cambié el tipo de contenido
            },
            body: JSON.stringify(objetoData)  // Convertí el objeto a JSON
        });

        const result = await response.json();
        if (response.status === 201) {
            alert("Objeto agregado exitosamente");
        } else {
            alert("Error al agregar objeto: " + result.message);
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un problema al agregar el objeto");
    }
});
