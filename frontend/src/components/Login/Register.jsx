import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar useNavigate
import { API_URL_AUTH } from '../../config';
import "./Login.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa navigate

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./Login.css?v=${new Date().getTime()}`; // Agrega un parámetro único basado en el tiempo actual
    document.head.appendChild(link);
    
    // Limpiar el enlace cuando el componente se desmonte
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (email === '' || password === '' || confirmPassword === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${API_URL_AUTH}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        // Redirigir después del registro exitoso usando navigate
        navigate('/login'); // Usar navigate en lugar de window.location.href
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Registrarse</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleRegister}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">
                    Registrarse
                  </button>
                  <p className="mt-3 texto">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/" className="link-primary" id="register-link" style={{ fontSize: '1rem' }}>
                      Inicia sesión
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

export default Register;
