import React, { useContext, useRef } from "react";
import src from "../utils/4169390-middle.png";
import panel from "../utils/328495682_717188410062159_1656544900350786780_n.jpg";
import AuthContext from "../context/AuthContext";
export const Login = () => {
  const { loginUser } = useContext(AuthContext);

 

  const username = useRef("");
  const password = useRef("");

  const onClickLogin = (e) => {
    loginUser(e, username.current.value, password.current.value);
    username.current.value = "";
    password.current.value = "";
  }

  return (
    <div className="container m-auto h-screen p-8">
      {/* Over Box */}
      <div className="w-100 h-full rounded-md overflow-hidden text-[#0E5E6F]  ">
        {/* Login Box */}
        <section id='login' className=" w-[30%] bg-[#FFEFD6] float-left h-full flex gap-5 flex-col px-10 py-24 ">
          <img src={src} alt="" width="50%" className="mx-auto" />

          <div className="mt-8">
            <h2 className="text-[30px] font-semibold">Welcom back</h2>
            <p className=" font-light text-sm">Please enter your detail</p>
          </div>

          <form action="" className="mt-2">
            {/* Username */}
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-0"
                hrmlfor="username"
              >
                Username
              </label>
              <input
                ref={username}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-0"
                hrmlfor="password"
              >
                Password
              </label>
              <input
                ref={password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
              {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <button
              type="submit"
              onClick={(e) => onClickLogin(e)}
              className="bg-[#0E5E6F] text-[#FFEFD6] text-sm px-9 py-2 font-medium rounded-md hover:bg-[#3A8891] transition-all"
            >
              Login
            </button>
          </form>
          <p className="text-black text-sm">
            Don't have an account?
            <a href="/" className="font-medium underline">
              Login
            </a>
          </p>
        </section>

        {/* Image Box */}
        <section className="w-[70%] float-right flex justify-center items-center h-full bg-[#FFEFD6] p-5 rounded-tr-[50px]">
          <div className="w-full m-auto h-full flex bg-[#ffc664] rounded rounded-tr-3xl rounded-bl-[25px]">
            <img src={panel} alt="" className="h-auto w-fit object-contain" />
          </div>
        </section>
      </div>
    </div>
  );
};
