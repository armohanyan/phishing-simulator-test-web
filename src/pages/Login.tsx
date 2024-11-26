import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {toast} from 'react-toastify';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import React, {useContext} from "react";
import {motion} from 'framer-motion'
import AuthContext from "../contexts/AuthContext.tsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

  const validateForm = ({email, password}: { email: string, password: string }) => {

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!password) {
      toast.error('Password is required.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    if (!validateForm(payload)) return;

    try {
      const response = await axiosInstance.post('/auth/sign-in', payload);

      if (response.status === 200) {
        const {access_token} = response.data;

        login(access_token)
        toast.success('Login successful!');
        navigate('/phishing-simulation'); // Redirect to the dashboard or protected route
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed.');
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
        }}
        className="p-6 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id="email"
              name="email"
              label="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              id="password"
              label="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
