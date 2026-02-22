import React, { useState } from 'react';
import { useAuth } from '@/admin/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) {
                onLogin(); // Call prop if provided, though routing handles redirect
                navigate('/admin');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Fresqo Admin</h2>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="fresqo.in@gmail.com"
                            className="w-full pl-10 pr-4 py-3 bg-fresqo-cream border border-fresqo-border rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="admin"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-fresqo-gray bg-white py-2 px-4 rounded-full inline-block shadow-sm">
                        Use fresqo.in@gmail.com / admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
