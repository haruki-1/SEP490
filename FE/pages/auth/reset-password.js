'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, KeyRound, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import Link from 'next/link';

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get userId and code from URL query parameters
	const userId = searchParams.get('userId');
	const code = searchParams.get('code');

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// For password matching validation
	const password = watch('password', '');

	// Validate that URL contains necessary parameters
	useEffect(() => {
		if (!userId || !code) {
			toast.error('Invalid password reset link');
		}
	}, [userId, code]);

	const onSubmit = async (data) => {
		if (!userId || !code) {
			toast.error('Invalid reset link parameters');
			return;
		}

		setLoading(true);
		try {
			const response = await fetch('https://duongcongson-001-site1.jtempurl.com/api/Auth/reset-password', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: userId,
					password: data.password,
					code: code,
				}),
			});

			if (response.ok) {
				setResetSuccess(true);
				toast.success('Password has been reset successfully!');
			} else {
				const errorData = await response.json();
				toast.error(
					`Failed to reset password: ${errorData.message || 'Please try again or request a new reset link'}`
				);
			}
		} catch (error) {
			toast.error('An error occurred. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	// Password strength validation indicators
	const hasMinLength = password.length >= 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

	return (
		<div className='relative flex items-center justify-center min-h-screen p-4 bg-gray-100'>
			<Image src='/images/authen/bg-authen.jpg' fill alt='bg-authen' className='object-cover' />

			<Card className='relative z-50 w-full max-w-md shadow-lg bg-white/90'>
				<CardHeader className='space-y-1'>
					<div className='flex justify-center mb-2'>
						<KeyRound size={36} className='text-primary' />
					</div>
					<CardTitle className='text-2xl font-bold text-center'>Reset Password</CardTitle>
					<CardDescription className='text-center'>Create a new password for your account</CardDescription>
				</CardHeader>

				{resetSuccess ? (
					<CardContent className='space-y-4 text-center'>
						<div className='p-3 mx-auto bg-green-100 rounded-full w-fit'>
							<Check size={24} className='text-green-600' />
						</div>
						<h3 className='text-xl font-medium'>Password Reset Successful!</h3>
						<p className='text-gray-600'>Your password has been changed successfully.</p>
						<Button className='w-full mt-4' onClick={() => router.push('/auth/login')}>
							Return to Login
						</Button>
					</CardContent>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='password'>New Password</Label>
								<div className='relative'>
									<Input
										id='password'
										type={showPassword ? 'text' : 'password'}
										className='pr-10 border border-gray-300'
										placeholder='••••••••'
										{...register('password', {
											required: 'Password is required',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters',
											},
											pattern: {
												value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
												message:
													'Password must include uppercase, lowercase, number and special character',
											},
										})}
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute inset-y-0 flex items-center text-gray-500 right-3'
									>
										{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
								{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}

								{/* Password strength indicators */}
								<div className='mt-2 space-y-2 text-sm'>
									<p className='font-medium text-gray-700'>Password must contain:</p>
									<ul className='space-y-1'>
										<li className='flex items-center'>
											{hasMinLength ? (
												<Check size={16} className='mr-2 text-green-500' />
											) : (
												<X size={16} className='mr-2 text-gray-400' />
											)}
											<span className={hasMinLength ? 'text-green-700' : 'text-gray-500'}>
												Minimum 8 characters
											</span>
										</li>
										<li className='flex items-center'>
											{hasUpperCase ? (
												<Check size={16} className='mr-2 text-green-500' />
											) : (
												<X size={16} className='mr-2 text-gray-400' />
											)}
											<span className={hasUpperCase ? 'text-green-700' : 'text-gray-500'}>
												Uppercase letter (A-Z)
											</span>
										</li>
										<li className='flex items-center'>
											{hasLowerCase ? (
												<Check size={16} className='mr-2 text-green-500' />
											) : (
												<X size={16} className='mr-2 text-gray-400' />
											)}
											<span className={hasLowerCase ? 'text-green-700' : 'text-gray-500'}>
												Lowercase letter (a-z)
											</span>
										</li>
										<li className='flex items-center'>
											{hasNumber ? (
												<Check size={16} className='mr-2 text-green-500' />
											) : (
												<X size={16} className='mr-2 text-gray-400' />
											)}
											<span className={hasNumber ? 'text-green-700' : 'text-gray-500'}>
												Number (0-9)
											</span>
										</li>
										<li className='flex items-center'>
											{hasSpecialChar ? (
												<Check size={16} className='mr-2 text-green-500' />
											) : (
												<X size={16} className='mr-2 text-gray-400' />
											)}
											<span className={hasSpecialChar ? 'text-green-700' : 'text-gray-500'}>
												Special character (!@#$%^&*)
											</span>
										</li>
									</ul>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='confirmPassword'>Confirm Password</Label>
								<div className='relative'>
									<Input
										id='confirmPassword'
										type={showConfirmPassword ? 'text' : 'password'}
										className='pr-10 border border-gray-300'
										placeholder='••••••••'
										{...register('confirmPassword', {
											required: 'Please confirm your password',
											validate: (value) => value === password || 'Passwords do not match',
										})}
									/>
									<button
										type='button'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className='absolute inset-y-0 flex items-center text-gray-500 right-3'
									>
										{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
								{errors.confirmPassword && (
									<p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
								)}
							</div>
						</CardContent>

						<CardFooter className='flex flex-col gap-4'>
							<Button type='submit' className='w-full' disabled={loading}>
								{loading ? 'Resetting Password...' : 'Reset Password'}
							</Button>
							<div className='text-sm text-center'>
								<Link href='/auth/login' className='text-blue-500 hover:underline'>
									Return to Login
								</Link>
							</div>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
};

export default ResetPassword;