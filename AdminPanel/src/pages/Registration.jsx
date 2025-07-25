import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registration } from '../utils/api/auth';
import { setAuthData } from '../utils/ControlAuthData';
import { FRONT_ENDPOINT_ACCOUNTS } from '@config/api';

export const RegistrationPage = () => {
  const [email, setEmail] = useState('string@mail.com');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('string');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const registrationResponse = await registration({ name, email, password });
      const data = await registrationResponse.json()
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
      <h2 className="text-center mb-4">Registration</h2>

      {error && (
        <div className="alert alert-danger text-center py-2">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label text-light d-block text-start">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            className="form-control bg-dark text-light border-secondary"
            placeholder="type email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerName" className="form-label text-light d-block text-start">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            className="form-control bg-dark text-light border-secondary"
            placeholder="type name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label text-light d-block text-start">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
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
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Registration...' : 'Register'}
        </button>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none text-info">
            Already have account? Log in
          </a>
        </div>
      </form>
    </div>
  </div>
);

};