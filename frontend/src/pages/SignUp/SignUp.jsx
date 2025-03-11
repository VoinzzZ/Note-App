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
      setError("Please enter your name");
      return;
    };

    if (!validateEmail(email)) {
        setError("Please enter a valid email addres.");
        return;
    };
    
    if (!password) {
        setError("Pleease enter the password");
        return;
    };

    setError("")

    //SignUp API Call
    try {
        const response = await axioInstance.post("/create-account", {
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
            setError("An unexpected error occured. Please try again.");
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full rounded-lg shadow-md p-8 bg-white border-2 border-solid border-slate-600'>
                <form onSubmit={handleSignUp}>
                    <h4 className='text-2xl font-bold text-center mb-6 text-black'>Sign Up</h4>
                    <div className='space-y-4'>
                        <div>
                            <input  
                            type='text' 
                            placeholder='Name' 
                            className="w-full text-black px-4 py-2 border bg-transparent rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <input  
                            type='text' 
                            placeholder='Email' 
                            className="w-full text-black px-4 py-2 border bg-transparent rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <PasswordInput value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs'>{error}</p>}

                        <button type='submit' className='w-full btn-primary py-2.5'>
                            Create Account
                        </button>
                    </div>

                    <p className='text-sm text-center mt-6 text-black'>
                        Already have an account?{" "}
                        <Link to="/login" className='font-medium text-primary hover:text-primary-dark underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignUp