import React from 'react';

const Navbar1 = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-charcoal">Gigster</h1>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-800 hover:text-charcoal px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="#" className="text-gray-800 hover:text-charcoal px-3 py-2 rounded-md text-sm font-medium">About</a>
                        <a href="#" className="text-gray-800 hover:text-charcoal px-3 py-2 rounded-md text-sm font-medium">Services</a>
                        <a href="#" className="text-gray-800 hover:text-charcoal px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                    <div className="md:hidden">
                        <button className="text-gray-800 hover:text-charcoal focus:outline-none">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar1;
