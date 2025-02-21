import React, { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const {googleLogin,setUser} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data) {
            setTimeout(() => {
              navigate(from);
            }, 2000);
            Swal.fire("Logged In", "Your Login is Successful.", "success");
          }
        });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className="px-[120px] my-[90px]">
       <ToastContainer position="top-right" autoClose={3000} />
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
              <button onClick={handleGoogleLogin} className="btn btn-primary w-full">
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
