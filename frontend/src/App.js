import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Almacen from './components/MenuAlm/MenuAlm';
import Registrar from './components/MenuReg/MenuReg';

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
