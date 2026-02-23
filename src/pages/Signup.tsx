import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Square, CheckSquare } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .refine((val) => /[A-Z]/.test(val), 'Must contain at least 1 uppercase letter')
        .refine((val) => /[a-z]/.test(val), 'Must contain at least 1 lowercase letter')
        .refine((val) => /[0-9]/.test(val), 'Must contain at least 1 number')
        .refine((val) => /[@$!%*?&]/.test(val), 'Must contain at least 1 special symbol (@$!%*?&)')
        .refine((val) => !/\s/.test(val), 'Must not contain spaces'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRobotChecked, setIsRobotChecked] = useState(false);
    const [robotError, setRobotError] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: SignupFormValues) => {
        if (!isRobotChecked) {
            setRobotError(true);
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockUser = {
                id: 'user_' + Math.random().toString(36).substring(2, 9),
                name: data.name,
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
                    className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lift relative"
                >
                    <div className="text-center mb-8">
                        <h1 className="font-oswald text-3xl font-bold text-fresqo-dark mb-2">
                            Create Account
                        </h1>
                        <p className="text-fresqo-gray">
                            Join Fresqo to manage orders faster
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

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

                        {/* Custom Simple Captcha */}
                        <div className="mt-4 p-4 border rounded-xl bg-gray-50 flex items-center gap-3">
                            <button
                                type="button"
                                className="focus:outline-none text-fresqo-dark"
                                onClick={() => {
                                    setIsRobotChecked(!isRobotChecked);
                                    setRobotError(false);
                                }}
                            >
                                {isRobotChecked ? <CheckSquare className="w-6 h-6 text-fresqo-lime" /> : <Square className="w-6 h-6" />}
                            </button>
                            <span className="text-sm font-medium">I am not a robot</span>
                        </div>
                        {robotError && <p className="text-red-500 text-sm mt-1">Please verify you are not a robot</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary mt-6 !py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-fresqo-dark text-sm">
                        Already have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-semibold text-fresqo-green hover:underline">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
