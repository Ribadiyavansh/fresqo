import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Square, CheckSquare, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

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

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function AuthModal() {
    const {
        isAuthModalOpen,
        authModalMode,
        authModalRedirect,
        closeAuthModal,
        openAuthModal,
        login
    } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRobotChecked, setIsRobotChecked] = useState(false);
    const [robotError, setRobotError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSuccess = (mockUser: any) => {
        login(mockUser, 'mock_token_123');
        closeAuthModal();

        if (authModalRedirect === 'checkout') {
            setTimeout(() => {
                if (location.pathname !== '/') {
                    navigate('/#pre-order');
                } else {
                    const preOrderSection = document.querySelector('#pre-order');
                    if (preOrderSection) {
                        preOrderSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.hash = 'pre-order';
                    }
                }
            }, 300);
        }
    };

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        reset: resetLogin
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors },
        reset: resetSignup
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    });

    const onLogin = async (data: LoginFormValues) => {
        setIsLoading(true);
        setTimeout(() => {
            const mockUser = {
                id: 'user_' + Math.random().toString(36).substring(2, 9),
                name: data.email.split('@')[0],
                email: data.email,
            };
            setIsLoading(false);
            handleSuccess(mockUser);
        }, 1000);
    };

    const onSignup = async (data: SignupFormValues) => {
        if (!isRobotChecked) {
            setRobotError(true);
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const mockUser = {
                id: 'user_' + Math.random().toString(36).substring(2, 9),
                name: data.name,
                email: data.email,
            };
            setIsLoading(false);
            handleSuccess(mockUser);
        }, 1000);
    };

    // Lock body scroll and stop Lenis smooth scrolling when modal is open
    useEffect(() => {
        if (isAuthModalOpen) {
            document.body.style.overflow = 'hidden';
            if ((window as any).lenis) (window as any).lenis.stop();
        } else {
            document.body.style.overflow = 'unset';
            if ((window as any).lenis) (window as any).lenis.start();
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
            if ((window as any).lenis) (window as any).lenis.start();
        };
    }, [isAuthModalOpen]);

    // Reset states when switching modes
    const handleSwitchMode = (mode: 'login' | 'signup') => {
        resetLogin();
        resetSignup();
        setShowPassword(false);
        setIsRobotChecked(false);
        setRobotError(false);
        openAuthModal(mode, authModalRedirect || undefined);
    };

    if (!isAuthModalOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeAuthModal}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl z-10 flex flex-col max-h-[85vh] overflow-hidden"
                >
                    {/* Close Button - absolute to wrapper so it stays sticky */}
                    <button
                        onClick={closeAuthModal}
                        className="absolute top-4 right-4 p-2 text-fresqo-gray hover:bg-fresqo-cream rounded-full transition-colors z-20 bg-white shadow-sm sm:bg-transparent sm:shadow-none"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content Container */}
                    <div
                        className="overflow-y-auto custom-scrollbar p-6 sm:p-8 w-full flex-1 min-h-0"
                        data-lenis-prevent="true"
                    >

                        {authModalMode === 'login' ? (
                            // Login Form
                            <div>
                                <div className="text-center mb-6">
                                    <h2 className="font-oswald text-3xl font-bold text-fresqo-dark mb-2">
                                        Welcome Back
                                    </h2>
                                    <p className="text-fresqo-gray">Sign in to continue to Fresqo</p>
                                </div>

                                <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                            <input
                                                {...registerLogin('email')}
                                                type="email"
                                                placeholder="hello@example.com"
                                                className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                            />
                                        </div>
                                        {loginErrors.email && (
                                            <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                            <input
                                                {...registerLogin('password')}
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
                                        {loginErrors.password && (
                                            <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full btn-primary mt-6 !py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                <p className="text-center mt-8 text-fresqo-dark text-sm">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => handleSwitchMode('signup')}
                                        className="font-semibold text-fresqo-green hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        ) : (
                            // Signup Form
                            <div>
                                <div className="text-center mb-6">
                                    <h2 className="font-oswald text-3xl font-bold text-fresqo-dark mb-2">
                                        Create Account
                                    </h2>
                                    <p className="text-fresqo-gray">Join Fresqo to manage orders faster</p>
                                </div>

                                <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                            <input
                                                {...registerSignup('name')}
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                            />
                                        </div>
                                        {signupErrors.name && (
                                            <p className="text-red-500 text-sm mt-1">{signupErrors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                            <input
                                                {...registerSignup('email')}
                                                type="email"
                                                placeholder="hello@example.com"
                                                className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                                            />
                                        </div>
                                        {signupErrors.email && (
                                            <p className="text-red-500 text-sm mt-1">{signupErrors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                                            <input
                                                {...registerSignup('password')}
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
                                        {signupErrors.password && (
                                            <p className="text-red-500 text-sm mt-1">{signupErrors.password.message}</p>
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
                                        className="w-full btn-primary mt-4 !py-3.5 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? 'Creating account...' : 'Create Account'}
                                    </button>
                                </form>

                                <p className="text-center mt-5 text-fresqo-dark text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => handleSwitchMode('login')}
                                        className="font-semibold text-fresqo-green hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
