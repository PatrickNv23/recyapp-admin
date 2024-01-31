import React, { useState, useEffect } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Usuarios from '../Usuarios';
import Recompensas from '../Recompensas';
import Materiales from '../Materiales';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <BrowserRouter>
            <header className='header' style={{ width: '100%', backgroundColor: 'lightblue', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <nav className='nav-header' style={{ width: '80%', display: 'flex', justifyContent: 'space-around' }}>
                <Link to={`/recyapp/`} relative="path" style={{ color: 'black', fontWeight: 'bold' }}>
                  Usuarios
                </Link>
                <Link to="/recyapp/materiales" relative="path" style={{ color: 'black', fontWeight: 'bold' }}>
                  Materiales
                </Link>
                <Link to="/recyapp/recompensas" relative="path" style={{ color: 'black', fontWeight: 'bold' }}>
                  Recompensas
                </Link>
              </nav>
            </header>
            <Routes>
              <Route path='/recyapp/' element={<Usuarios setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/recyapp/materiales' element={<Materiales setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/recyapp/recompensas' element={<Recompensas setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </BrowserRouter>
        </>
        // <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
