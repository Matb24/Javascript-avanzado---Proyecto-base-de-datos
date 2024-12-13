import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx';
import Almacen from './components/MenuAlm/MenuAlm.jsx';
import Registrar from './components/MenuReg/MenuReg.jsx';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/almacen" element={<Almacen />} />
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
