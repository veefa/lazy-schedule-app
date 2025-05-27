import React from "react";
import { useNavigate } from "react-router-dom";



const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 px-4 min-h-screen text-gray-800 transition-colors duration-300">
      <h1 className="mb-4 font-extrabold text-5xl text-center">
        Welcome to Lazy Schedule
      </h1>
      <p className="mb-8 max-w-md text-gray-700 text-lg text-center">
        Visualize and plan your day with a 24-hour clock. Add tasks, pick
        colors, and see your schedule at a glance!
      </p>
      <button
        className="bg-violet-600 hover:bg-violet-700 shadow-md px-6 py-3 rounded-xl text-white transition duration-200"
        onClick={() => navigate("/clock")}>
        Go to Clock
      </button>
    </div>
  );
};

export default Home;
