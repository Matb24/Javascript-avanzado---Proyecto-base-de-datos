import { API_URL_AUTH } from '../../config.js';

// Registro de usuario
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        document.getElementById("registerMessage").textContent = "Las contraseñas no coinciden. Inténtalo de nuevo.";
        return; // Detener la ejecución si las contraseñas no coinciden
    }

    try {
        const response = await fetch(`${API_URL_AUTH}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById("registerMessage").textContent = "Registro exitoso!";
        } else {
            document.getElementById("registerMessage").textContent = data.message || "Error en el registro";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("registerMessage").textContent = "Ocurrió un error. Por favor intenta más tarde.";
    }
});