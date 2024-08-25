import React, { useState, useEffect } from "react";
import { auth, db } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ArrowImage from "../assets/right-arrow.png"; // Import your arrow image
import Logout from "../components/Logout";
import Navbar1 from "../components/Navbar1";

const categories = [
  { name: "Cleaners" },
  { name: "Hotel Workers" },
  { name: "Electricians" },
  { name: "Plumbers" },
  { name: "Car Washers" },
];

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (user) => {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.name || "User");
        setUserPhoneNumber(userData.phone || "");
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleWhatsAppRedirect = (category) => {
    const companyPhoneNumber = "6361769148"; // Your company number
    const message = `Hello, my name is ${userName}. I am interested in the ${category.name} service. My phone number is ${userPhoneNumber}.`;

    const whatsappURL = `https://wa.me/${companyPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 p-6 flex items-center justify-center text-slate-200">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar1 />
      <div className="min-h-screen bg-slate-800 p-6">

        <h1 className="  lg:text-4xl md:text-2xl text-sm  text-slate-200 text-center mb-2">
          Welcome, <span className="text-orange-300">{userName}</span>
        </h1>
        <h2 className="lg:text-3xl md:text-xl text-md font-bold text-slate-200 text-center mb-8">
        Find Workers for Your Needs
        </h2>
        <div className="flex flex-col justify-center items-center gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-300 rounded-lg overflow-hidden shadow-lg cursor-pointer  w-56 md:w-72"
              onClick={() => handleWhatsAppRedirect(category)}
            >
             <div className="flex justify-between items-center gap-4 p-4">
  <h2 className="text-xl font-bold text-slate-800">
    {category.name}
  </h2>
  <img
    src={ArrowImage}
    alt="arrow"
    className="w-8 h-8 object-contain"
  />
</div>

            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Logout />
        </div>
      </div>
    </>
  );
  
};

export default UserDashboard;
