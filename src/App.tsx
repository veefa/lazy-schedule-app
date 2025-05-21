// src/App.tsx
import React from "react";
import FaceClock from "./components/FaceClock";


const App: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-slate-100 p-2 sm:p-4 w-full min-h-dvh overflow-x-hidden"
      aria-label="Lazy schedule clock application">
      {/* Main title */}
      <h1 className="mb-6 font-bold text-slate-900 text-2xl sm:text-3xl text-center">
        Lazy schedule
      </h1>


      {/* Clock face component */}
      <div className="flex justify-center items-center w-96 sm:w-[30rem] h-96 sm:h-[30rem]">
        <FaceClock />
      </div>
    </div>
  );
};

export default App;
