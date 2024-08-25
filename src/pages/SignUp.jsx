import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential) {
        const userId = userCredential.user.uid;
        await setDoc(doc(db, "users", userId), {
          name: name,
          email: email,
          phone: phone,
          role: role
        });

        navigate(`/${role}/login`);
      }
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="flex flex-col items-center justify-center md:min-h-screen py-32 bg-slate-800 p-4">
        <h1 className="md:text-3xl text-xl font-bold mb-8 text-slate-200">Sign Up as {role}</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-4 p-2 rounded"
        />
        {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 rounded"
        />
        {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 rounded"
        />
        {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="mb-4 p-2 rounded"
        />
        {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
        
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="mb-4 p-2 rounded"
        />
        {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
        
        <button onClick={handleSignup} className="bg-green-600  text-slate-200 p-2 rounded">Sign Up</button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </>
  );
};

export default SignUp;
