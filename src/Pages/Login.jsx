import React from "react";

const Login = () => {
  return (
    <div className="px-[120px] my-[90px]">
      <div className="flex justify-center gap-8">
        <div className="flex flex-col gap-8 max-w-[450px] text-center">
          <h2 className="font-black text-xl md:text-6xl">Daily Task</h2>
          <p className="text-[20px]">
            Manage All your daily task & project with Daily Task management
            application.
          </p>

          <div>
            <div className="px-8 w-full">
              <div className="divider"></div>
              <button className="btn btn-primary w-full">
                Login With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
