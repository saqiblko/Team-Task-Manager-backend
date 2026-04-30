// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-brand-50 to-blue-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-brand-600 to-brand-600 px-6 py-8 text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h2 className="text-3xl font-bold text-white">Join TaskFlow</h2>
            <p className="text-brand-100 mt-1">Start managing your projects</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                ⚠️ {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">👤 Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📧 Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🔐 Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                placeholder="Min. 6 characters"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </form>
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-600">
              Already registered?{' '}
              <Link to="/login" className="text-brand-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}