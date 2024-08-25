import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import { auth, db } from './FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ ...user, role: userData.role });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner component
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/user/login"
          element={user ? <Navigate to="/user-dashboard" /> : <Login />}
        />
        <Route
          path="/worker/login"
          element={user ? <Navigate to="/worker-dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <SignUp />}
        />
        <Route
          path="/user-dashboard"
          element={user && user.role === 'User' ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/worker-dashboard"
          element={user && user.role === 'Worker' ? <WorkerDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
