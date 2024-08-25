import React from 'react';
import { useNavigate } from 'react-router-dom';

import userImg from '../assets/userImg.png'
import Navbar1 from '../components/Navbar1';
import imagelanding from '../assets/landingpageimg.png'
const Card = ({ image, title, onClick }) => {
    return (
        <div 
        className="card flex items-center justify-evenly bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition w-[200px] sm:w-[300px] lg:w-[400px] p-4"
        onClick={onClick}
    >
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-charcoal">{title}</h2>
        <img 
            src={image} 
            alt={title} 
            className="h-10 sm:h-12 lg:h-16 w-auto object-cover ml-4 rounded-lg" 
        />
    </div>
    
    
    );
};

const LandingPage = () => {
    const navigate = useNavigate();

    const handleCardClick = (role) => {
        navigate(`/${role}/login`);
    };

    return (
        <>
        <Navbar1/>
        <div className="flex flex-col items-center  justify-center md:min-h-screen   py-12 bg-slate-800 ">
           
            <h1 className="text-xl  text-center sm:text-4xl font-bold mb-8 text-slate-200">You are a ?</h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Card
                    image={userImg}
                    title="Worker"
                    onClick={() => handleCardClick('worker')}
                />
                <Card
                    image={userImg}
                    title="User"
                    onClick={() => handleCardClick('user')}
                />
            </div>
            <div className="">
                <img src={imagelanding} alt="" className='w-auto h-[300px]'/>
            </div>
        </div>
        </>
    );
};

export default LandingPage;
