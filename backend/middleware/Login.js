import { API_URL_AUTH } from '../../config.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
          const response = await fetch(`${API_URL_AUTH}/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          
          if (response.ok) {
              document.getElementById("loginMessage").textContent = "Inicio de sesión exitoso!";
              window.location.href = '/almacen';
          } else {
              document.getElementById("loginMessage").textContent = data.message || "Error en el inicio de sesión";
          }
      } catch (error) {
          console.error("Error:", error);
      }
  });
});


