import React from "react";
import FaceClock from "./components/FaceClock";

const App: React.FC = () => {
  return (
    <main
      className="flex flex-col justify-center items-center bg-slate-100 p-2 sm:p-4 lg:p-6 w-full min-h-dvh overflow-x-hidden"
      aria-label="Lazy schedule clock main interface"
    >
      {/* Main title */}
      <h1 className="mb-4 font-bold text-slate-900 text-2xl sm:text-3xl text-center">
        Lazy Schedule
      </h1>

      {/* Optional subtitle */}
       <p className="mb-6 text-slate-600 text-base sm:text-lg text-center">
        Stay on time, effortlessly.
      </p> 

      {/* Clock face component */}
      <div className="flex justify-center items-center w-96 sm:w-[30rem] h-96 sm:h-[30rem]">
        <FaceClock />
      </div>
    </main>
  );
};

export default App;