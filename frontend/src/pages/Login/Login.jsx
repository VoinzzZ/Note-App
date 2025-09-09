import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../../utils/helper'
import axiosInstance from '../../../utils/axiosIntance'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        };

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("")

        //  LOGIN API Call
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email: email,
                password: password,
            });

            // handle successfull login
            if(response.data && response.data.accessToken) {
                localStorage.setItem( "token", response.data.accessToken )
                navigate('/dashboard')
            }
        } catch (error) {
            // handle login error
            if( error.response && error.response.data && error.response.data.message ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occured. Please try again.");
            }
        }
    }

return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className='flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full rounded-lg shadow-md p-8 bg-white border-2 border-solid border-black'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl font-bold text-center mb-8 text-black'>Login</h4>
                    <div className='space-y-6'>
                        <div>
                            <input  
                            type='text' 
                            placeholder='Email' 
                            className="w-full text-black px-4 py-2 border bg-transparent rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <PasswordInput value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs'>{error}</p>}

                        <button type='submit' className='w-full btn-primary py-2.5'>
                            Login
                        </button>
                    </div>

                    <p className='text-sm text-center mt-6 text-black'>
                        Don't have an account yet?{" "}
                        <Link to="/signup" className='font-medium text-primary hover:text-primary-dark underline'>
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
);
};

export default Login