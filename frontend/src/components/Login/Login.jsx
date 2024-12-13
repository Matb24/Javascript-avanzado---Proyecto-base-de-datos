import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link en una sola línea
import { API_URL_AUTH } from '../../config';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa navigate

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./Login.css?v=${new Date().getTime()}`;
    document.head.appendChild(link);
    
    // Limpiar el enlace cuando el componente se desmonte
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`${API_URL_AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Inicio de sesión exitoso!');
        // Redirigir después del inicio de sesión exitoso usando navigate
        navigate('/almacen'); // Usar navigate en lugar de window.location.href
      } else {
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem', padding: '2rem' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Login</h3>
                {/* Mostrar el error si está presente */}
                {error && <div className="alert alert-danger" id="error-message" style={{ fontSize: '1rem' }}>{error}</div>}
                {/* Mostrar el mensaje de éxito si está presente */}
                {message && <div className="alert alert-success" id="success-message" style={{ fontSize: '1rem' }}>{message}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-outline mb-4">
                    <input
                      id="email"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      id="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    id="login-button"
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    style={{ padding: '1rem', fontSize: '1.2rem' }}
                  >
                    Iniciar sesión
                  </button>
                  <p className="mt-3 texto" style={{ fontSize: '1rem' }}>
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="link-primary" id="register-link" style={{ fontSize: '1rem' }}>
                      Registrarse
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
