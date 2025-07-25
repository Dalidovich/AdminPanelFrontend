import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/api/auth';
import { setAuthData } from '../utils/ControlAuthData';
import { FRONT_ENDPOINT_ACCOUNTS } from '@config/api';

export const LoginPage = () => {
  const [email, setEmail] = useState('string@mail.com');
  const [password, setPassword] = useState('string');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginResponse = await authenticate({ email, password });
      const data = await loginResponse.json()
      console.log(data)
      setAuthData(data)
      navigate(FRONT_ENDPOINT_ACCOUNTS);
    }
    catch (err) {
      setError(err.message || 'invalid email or password');
    }
    finally {
      setLoading(false);
    }
  };

  return (
  <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light">
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Log in</h2>

      {error && (
        <div className="alert alert-danger text-center py-2">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label text-light d-block text-start">
            Email
          </label>
          <input
            type="email"
            id="loginEmail"
            className="form-control bg-dark text-light border-secondary"
            placeholder="type email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label text-light d-block text-start">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            className="form-control bg-dark text-light border-secondary"
            placeholder="type password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Enter...' : 'Enter'}
        </button>

        <div className="text-center mt-3">
          <a href="/registration" className="text-decoration-none text-info">
            Registration
          </a>
        </div>
      </form>
    </div>
  </div>
);

};