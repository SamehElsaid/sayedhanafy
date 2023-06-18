"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { GET_admin } from "../redux/admin/adminSlice";
function Login() {
  const router =useRouter()
  const dispatch = useDispatch()
  const login = (e)=>{
    e.preventDefault()
    axios.get(`${process.env.API_URL}/dashboard/${e.target.name.value}`).then(res=>{
      if(res.data.password === e.target.password.value){
        dispatch(GET_admin())
        router.push("/admin/dashboard")
      }else{
      toast.error(`Wroung Password`);
      }
    }).catch(_=>{
      toast.error(`Wroung Name`);
    })

  }
  return (
    <div className="h-screen || bg-[#5e90f9] || flex || justify-center || items-center || flex-col || admin">
      <form onSubmit={login} className="w-[50%] || bg-white || flex || flex-col || gap-4 || p-5">
        <input required name="name" type="text" placeholder="Name" className="py-2 || px-3 || | border || outline-none || border-[#e0e0e0]" />
        <input required name="password" type="Password" placeholder="Password" className="py-2 || px-3 || | border || outline-none || border-[#e0e0e0]" />
        <button type="submit" className="bg-[#5e90f9] || py-2 || font-semibold || text-white">Login</button>
      </form>
    </div>
  );
}

export default Login;
