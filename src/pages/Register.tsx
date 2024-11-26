import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {toast} from 'react-toastify';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {motion} from 'framer-motion'
import axios, {AxiosError} from "axios";

export default function Register() {
  const navigate = useNavigate();

  const validateForm = ({
                          fullName,
                          email,
                          password,
                          confirmPassword
                        }: { fullName: string, email: string, password: string, confirmPassword: string }) => {

    if (!fullName.trim().length) {
      toast.error('Full name is required');
      return false;
    }

    // todo: strong validation
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const payload = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    if (!validateForm({
      ...payload,
      confirmPassword: formData.get('confirmPassword') as string,
    })) return;

    try {
      const response = await axiosInstance.post('/auth/sign-up', payload);

      if (response.status === 201) {
        toast.success('Registration successful, please log in!');
        navigate('/'); // Redirect to login page
      }
    } catch (err) {
        toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{
          y: 40
        }}
        animate={{
          y: 0
        }} className="p-6 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
                id="fullName"
                name="fullName"
                label="full name"
                type="text"
                required
            />
          </div>
          <div className="mb-4">
            <Input
                id="email"
                name="email"
                label="email"
                type="email"
                required
            />
          </div>
          <div className="mb-4">
            <Input
                id="password"
                label="password"
                name="password"
                type="password"
                required
            />
          </div>
          <div className="mb-4">
            <Input
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="confirmPassword"
                required
            />
          </div>
          <Button
              type="submit"
          >
            Register
          </Button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
