'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent page refresh

        try {
            const response = await axios.post("https://vishal-test-production.up.railway.app/api/login", {
                email,
                password
            });

            console.log("Login success:", response.data);
            // You can store token in localStorage if backend sends one
            localStorage.setItem("token", response.data.token);
            

        } catch (error: any) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-xl p-6 w-80 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
        />

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
    )
}

export default Login;
