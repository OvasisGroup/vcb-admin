import React from 'react'
import { Button } from "@/components/ui/button"


const Roles = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <p className='text-3xl text-vcblue'>Roles</p>
            <Button variant="outline" className='bg-vcbgold text-vcblue hover:bg-vcblue hover:text-white'>+ Create Role</Button>
        </div>
      
    </div>
  )
}

export default Roles
