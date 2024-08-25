import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to landing page or login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-600 text-white p-2 rounded hover:bg-red-800"
    >
      Logout
    </button>
  );
};

export default Logout;
