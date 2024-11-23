
import React from 'react'
import { Progress } from "@/components/ui/progress"
import MobileCount from './counts/MobileCount'
import WebCount from './counts/WebCount'



const Stats = () => {
  return (
    <div>
      <p className="mt-4 text-vcblue text-lg font-bold px-4 font-light">Device Usage</p>

      <div className='grid md:grid-cols-2 grid-cols-1 gap-4 p-4' >

        <div>
            <p className='text-vcbgold text-sm pb-4'>Desktop User Logins to Date</p>
            <h2 className='text-3xl font-medium text-vcblue pb-4'><WebCount/></h2>
            <Progress value={85.4} className='bg-vcbgold'/>
        </div>
        <div>
            <p className='text-vcbgold text-sm pb-4'>Mobile User Logins to Date</p>
            <h2 className='text-3xl font-medium text-vcblue pb-4'><MobileCount/></h2>
            <Progress value={14.6} className='bg-vcbgold' />
        </div>
        
      </div>
      {/* ))} */}
    </div>
  )
}

export default Stats
