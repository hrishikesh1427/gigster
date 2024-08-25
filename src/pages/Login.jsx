import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import Navbar1 from '../components/Navbar1';
import loginimage from '../assets/loginpageimage.png'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.includes('worker') ? 'Worker' : 'User';

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
  
      if (userCredential) {
        const userId = userCredential.user.uid;
        const userDoc = await getDoc(doc(db, "users", userId));
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role.toLowerCase(); // Convert to lowercase for consistent comparison
  
          if (userRole === 'user') {
            navigate('/user-dashboard');
          } else if (userRole === 'worker') {
            navigate('/worker-dashboard');
          } else {
            alert("Unknown role, cannot redirect");
          }
        } else {
          console.error("No such user!");
        }
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };
  

  return (
    <>
    <Navbar1/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-200">Login as {role}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 rounded"
      />
      <button onClick={handleLogin} className="bg-green-600 text-slate-200 p-2 rounded">Login</button>
      <p className="text-slate-200 mt-4">Don't have an account? 
        <button 
          onClick={() => navigate('/signup', { state: { role } })} 
          className="text-blue-500 underline ml-2">
          Sign Up
        </button>
      </p>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
      <div className=''>
       <img src={loginimage} alt="" className='h-[200px] w-auto mt-7' />

    </div>
    </div>

    </>
  );
};

export default Login;
