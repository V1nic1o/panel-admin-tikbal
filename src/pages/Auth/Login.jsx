// src/pages/Auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im'; // Spinner
import api, { setAuthToken } from '../../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        correo: form.email,
        password: form.password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] px-4">
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <ImSpinner8 className="text-white text-6xl animate-spin" />
            <p className="mt-4 text-white font-semibold text-lg">Ingresando...</p>
          </div>
        </div>
      )}

      <div className={`bg-white rounded-xl shadow-lg p-8 w-full max-w-md ${loading ? 'opacity-40 pointer-events-none' : ''}`}>
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Panel Administrativo
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none"
                placeholder="admin@tikbal.com"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}