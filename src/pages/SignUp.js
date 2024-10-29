import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    // Save user data to localStorage
    const userData = { name, email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Sign up successful! Please log in.');
    navigate('/login'); // Navigate to login page after successful sign-up
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Get Started Now</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-green-700 text-white px-4 py-3 rounded-full w-full font-semibold">
            Signup
          </button>
        </form>
        <p className="mt-6 text-center">
          Have an account? <a href="/login" className="text-blue-600 underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;