import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we need to redirect back to checkout
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Mock user login
            const mockUser = {
                id: 'user_' + Math.random().toString(36).substring(2, 9),
                name: data.email.split('@')[0],
                email: data.email,
            };

            login(mockUser, 'mock_token_123');
            setIsLoading(false);

            if (redirect === 'checkout') {
                navigate('/#pre-order');
            } else {
                navigate('/');
            }
        }, 1000);
    };

    return (
        <section className="min-h-screen pt-32 pb-20 flex items-center justify-center gradient-bg">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lift"
                >
                    <div className="text-center mb-8">
                        <h1 className="font-oswald text-3xl font-bold text-fresqo-dark mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-fresqo-gray">
                            Sign in to continue to Fresqo
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-fresqo-gray hover:text-fresqo-dark transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary mt-6 !py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-fresqo-dark text-sm">
                        Don't have an account?{' '}
                        <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'} className="font-semibold text-fresqo-green hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
