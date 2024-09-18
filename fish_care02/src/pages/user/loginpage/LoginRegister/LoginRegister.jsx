import React, {useEffect, useState} from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = () => {

    const [action, setAction] = useState('');
    const [userDetails, setUserDetails] = useState({ email: '', password: '', username: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const registerLink = () => {
        setAction(' active');
        setErrorMessage('');
    };

    const loginLink = () => {
        setAction('');
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: userDetails.email,
                password: userDetails.password
            });
            if (response.data.statusCode === 200) {
                console.log('Login successful:', response.data);
                setErrorMessage('');
            } else {
                console.error('Login failed with status code:', response.data);
                setErrorMessage('Wrong email or password.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Login error:', error.response.data);
                setErrorMessage('Wrong email or password.');
            } else {
                console.error('Error during login:', error.message);
                setErrorMessage('An error has occurred. Please try again later.');
            }
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', {
                username: userDetails.username,
                password: userDetails.password,
                email: userDetails.email
            });
            if (response.status === 200) {
                console.log('Registration successful:', response.data);
                window.location.reload();
            } else {
                console.error('Registration failed with status code:', response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error('Registration error:', error.response.data);
            } else {
                console.error('Error during registration:', error.message);
            }
        }
    };

    return (
        <div className='bodyLogin'>
            <div className={`wrapper${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={userDetails.email}
                                onChange={handleInputChange}
                                required
                            />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={userDetails.password}
                                onChange={handleInputChange}
                                required
                            />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label><input type='checkbox' />Remember</label>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        {/* Hiển thị thông báo lỗi khi đăng nhập thất bại */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Don't have an account?
                                <a href="#" onClick={registerLink}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder='Username'
                                value={userDetails.username}
                                onChange={handleInputChange}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={userDetails.email}
                                onChange={handleInputChange}
                                required
                            />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={userDetails.password}
                                onChange={handleInputChange}
                                required
                            />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label><input type='checkbox' />I agree to the terms & conditions</label>
                        </div>

                        <button type="submit">Register</button>

                        <div className="register-link">
                            <p>Already have an account?
                                <a href="#" onClick={loginLink}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(LoginRegister);
