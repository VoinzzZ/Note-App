import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../../utils/helper'
import axioInstance from '../../../utils/axiosIntance'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your full name.");
      return;
    };

    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    };
    
    if (!password) {
        setError("Please enter a password.");
        return;
    };

    setError("")

    //SignUp API Call
    try {
        const response = await axioInstance.post("/api/auth/create-account", {
            fullName: name,
            email: email,
            password: password,
        });

        // handle successfull regist response
        if(response.data && response.data.error) {
            setError(response.data.message)
            return
        }

        if(response.data && response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken)
            navigate("/dashboard")
        }
    } catch (error) {
        // handle regist error response
        if( error.response && error.response.data && error.response.data.message ) {
            setError(error.response.data.message);
        } else {
            setError("An unexpected error occurred. Please try again.");
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        
        <div className='flex-grow flex items-center'>
            <div className='w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-20'>
                <div className='grid lg:grid-cols-2 gap-10 items-center'>
                    <div className='relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-white/80 dark:bg-slate-900/70 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-xl'>
                        <div className='absolute inset-0 opacity-40 pointer-events-none'>
                            <div className='absolute -left-10 top-6 w-52 h-52 bg-primary/20 blur-3xl' />
                            <div className='absolute right-0 -bottom-6 w-64 h-64 bg-secondary/20 blur-3xl' />
                        </div>
                        <p className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold'>
                            Built for teams and individuals
                        </p>
                        <h1 className='mt-4 text-3xl sm:text-4xl font-semibold leading-tight'>
                            Create an account and start organizing your notes instantly.
                        </h1>
                        <p className='mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl'>
                            Sync across devices, keep private notes secure, and collaborate when you need to. Your workspace adapts to light or dark preferences automatically.
                        </p>
                        <div className='mt-6 grid grid-cols-2 gap-4 text-sm'>
                            <div className='rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3 bg-white/60 dark:bg-slate-900/60'>
                                <p className='font-semibold'>Secure by default</p>
                                <p className='text-slate-600 dark:text-slate-300 mt-1'>Protected sessions and quick logout keep your data safe.</p>
                            </div>
                            <div className='rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3 bg-white/60 dark:bg-slate-900/60'>
                                <p className='font-semibold'>Stay organized</p>
                                <p className='text-slate-600 dark:text-slate-300 mt-1'>Tags, pins, and search help surface what matters.</p>
                            </div>
                        </div>
                    </div>

                    <div className='max-w-lg w-full mx-auto'>
                        <div className='rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 sm:px-8 py-8 sm:py-10'>
                            <h4 className='text-2xl font-semibold text-center mb-8'>Create your account</h4>
                            <form onSubmit={handleSignUp} className='space-y-5'>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-slate-700 dark:text-slate-200'>Full name</label>
                                    <input  
                                    type='text' 
                                    placeholder='Alex Johnson' 
                                    className="w-full text-black dark:text-slate-100 px-4 py-3 border bg-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-slate-700 dark:text-slate-200'>Email</label>
                                    <input  
                                    type='text' 
                                    placeholder='you@example.com' 
                                    className="w-full text-black dark:text-slate-100 px-4 py-3 border bg-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:border-slate-700" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-slate-700 dark:text-slate-200'>Password</label>
                                    <PasswordInput value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && <p className='text-red-500 text-xs'>{error}</p>}

                                <button type='submit' className='w-full btn-primary py-3 rounded-xl text-lg font-semibold'>
                                    Create account
                                </button>
                            </form>

                            <p className='text-sm text-center mt-6 text-slate-700 dark:text-slate-300'>
                                Already have an account?{" "}
                                <Link to="/login" className='font-semibold text-primary hover:text-primary-dark underline'>
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignUp
