import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Briefcase } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('EMPLOYEE');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left side - Branding (Desktop: Half screen, Mobile: Top section) */}
      <div className="w-full md:w-1/2 bg-primary-900 text-white flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
        <div className="max-w-md mx-auto md:mx-0">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Dayflow</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary-50">
            Every workday, perfectly aligned.
          </h2>
          <p className="text-primary-200 text-base md:text-lg">
            Sign in to access your dashboard, track attendance, apply for leave, and manage your HR tasks seamlessly.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Welcome back</h2>
            
            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
              <button
                type="button"
                onClick={() => setRole('EMPLOYEE')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'EMPLOYEE' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'ADMIN' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Admin / HR
              </button>
            </div>
          </div>

          <LoginForm role={role} />

        </div>
      </div>
    </div>
  );
};

export default Login;
