"use client"
import { LogOut, UserCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'



const MainHeader = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
      sessionStorage.clear();
      await signOut({ redirect: false });  // Prevent automatic redirect
      router.push('/');  // Manually push to the login page
  };

  return (
    <div className='bg-vcblue py-4 flex justify-between items-center flex-1'>

      <div className=''>
        <div className='pl-8'>
        <h3 className='text-white'>Welcome Back, {session?.user.adminName}</h3>
        </div>
      </div>
      <div className="relative pr-6">
        <div className='flex gap-4 items-center'>
          <p className="text-vcbgold text-sm">Last Login: 10-05-2024  10:40</p>
          <div>
           <button onClick={handleSignOut}><LogOut className='text-vcblue bg-white p-2 rounded-full text-2xl' /></button> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
