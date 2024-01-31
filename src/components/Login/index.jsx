import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('qwerty');

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <section style={{ backgroundColor: '#7A947E' }}>
      <div style={{ marginLeft: '300px', marginRight: '300px' }}>

        <div className="container flex-row">
          <div className='flex-large'>
            <div style={{ marginTop: '20px' }}>
              <img src="/src/assets/LOGO_RECYAPP.png" alt="logo" style={{ width: '100vh', height: '85%', marginRight: '50px' }} />
            </div>
          </div>
          <div className='flex-large' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#7A947E' }}>
            <form onSubmit={handleLogin}>
              <h1>Iniciar Sesión</h1>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="qwerty"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input style={{ marginTop: '12px' }} type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
