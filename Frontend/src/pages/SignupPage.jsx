import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BASE_URL = 'http://localhost:8000';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        profilePicture: '',
        terms: false,
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { username, email, password, confirmPassword, name, profilePicture, terms } = formData;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onCheckboxChange = e => setFormData({ ...formData, [e.target.name]: e.target.checked });
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors([{ msg: 'Passwords do not match' }]);
            return;
        }
    
        // console.log('Form data:', formData); // Log form data
        try {
            const res = await axios.post(`/api/auth/signup`, formData);
            localStorage.setItem('token', res.data.token);
            alert("Signup successful! Redirecting to posts page...🚀")
            navigate('/posts');
        } catch (err) {
            // console.error('Signup error:', err.response ? err.response.data : err.message); // Log error details
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors([{ msg: 'An error occurred during signup' }]);
            }
            alert("Signup failed! Please try again.🚧");
        }
    };
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 to-blue-500">
        <section className="rounded-md bg-slate-300 shadow-md p-10 w-1/2">
            <div className="flex items-center justify-center">
                <div className="xl:w-full 2xl:max-w-md">
                    <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign up to see posts</h2>
                    <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="username" className="text-base font-medium text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username"
                                            id="username"
                                            name="username"
                                            value={username}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Name (optional)"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="Password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={onChange}
                                            required
                                        />
                                         <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 end-0 p-3.5 rounded-e-md"
                                >
                                    <svg
                                        className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {passwordVisible ? (
                                            <>
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </>
                                        ) : (
                                            <>
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                <line x1="2" x2="22" y1="2" y2="22"></line>
                                            </>
                                        )}
                                    </svg>
                                </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="text-base font-medium text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={onChange}
                                            required
                                        />
                                        <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 end-0 p-3.5 rounded-e-md"
                                >
                                    <svg
                                        className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {passwordVisible ? (
                                            <>
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </>
                                        ) : (
                                            <>
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                <line x1="2" x2="22" y1="2" y2="22"></line>
                                            </>
                                        )}
                                    </svg>
                                </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="profilePicture" className="text-base font-medium text-gray-900">
                                        Profile Picture URL
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border
                                            border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-purple-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Profile Picture URL (optional)"
                                            id="profilePicture"
                                            name="profilePicture"
                                            value={profilePicture}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={terms}
                                        onChange={onCheckboxChange}
                                        required
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-black rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                                {errors.length > 0 && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.map((error, index) => (
                                            <p key={index}>{error.msg}</p>
                                        ))}
                                    </div>
                                )}
                                <div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Create Account <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
    <button
        type="button"
        className="relative inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-800"
    >
        <span className="mr-2">
            <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
        </span>
        Sign up with Google
    </button>
    <button
        type="button"
        className="relative inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-800"
    >
        <span className="mr-2">
            <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
            </svg>
        </span>
        Sign up with Facebook
    </button>
</div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;
