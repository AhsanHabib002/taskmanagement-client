import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="px-[120px] my-[90px]">
      <div>
        <div className="flex gap-3 items-center">
          <img
            className="w-[120px] h-[120px] object-cover rounded-full"
            src={user.photoURL}
            alt=""
          />
          <h1 className="font-medium text-xl md:text-6xl">
            Welcome, {user.displayName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
