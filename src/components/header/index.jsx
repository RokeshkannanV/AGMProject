/* eslint-disable */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 static top-0 left-0 h-12 border-b place-content-end place-items-center items-right bg-yellow-400'>
            {
                userLoggedIn
                    ?
                    <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-xl text-blue-600 underline'>Logout</button>
                    :
                    <>
                        <Link className='text-xl text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-xl text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }
        </nav>
    );
};

export default Header;