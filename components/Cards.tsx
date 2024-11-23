import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Building2, Network, UserRoundCheck, Users } from 'lucide-react'
import Link from 'next/link'
import CorporateCount from './counts/CorporateCount'
import RolesCount from './counts/RolesCount'
import AdminCount from './counts/AdminCount'
import RetailCount from './counts/RetailCounts'
// import RetailCount from '@/utils/retailCount'
// import RolesCountDisplay from '@/utils/rolesCount'



const HomepageCards = () => {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-2 w-full">
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between">
               <div className="flex flex-row justify-between items-center">
                <p className="text-vcblue font-light">Total Retail Clients</p>
                <Users/>
               </div>
               <div className="flex justify-between items-center">
               <h4 className='font-thin text-4xl mt-8 text-vcbgold'><RetailCount/></h4>
                <Link href="/corporate_maintenance/user-registration"><p className="text-xs bg-vcblue text-white py-2 px-4 rounded-3xl  hover:bg-vcbgold cursor-pointer mt-8">VIEW ALL  &rarr;</p></Link>
               </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between">
               <div className="flex flex-row justify-between items-center">
                <p className="text-vcblue font-light">Total Roles</p>
                <Network />
               </div>
               <div className="flex justify-between items-center ">
                <h4 className='font-thin text-4xl mt-8 text-vcbgold'><RolesCount /></h4>
                <Link href="/maintenance/roles"><p className="text-xs bg-vcblue text-white py-2 px-4 rounded-3xl  hover:bg-vcbgold cursor-pointer mt-8">VIEW ALL  &rarr;</p></Link>
               </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between">
               <div className="flex flex-row justify-between items-center">
                <p className="text-vcblue font-light">Total Corporate Clients</p>
                <Building2 />
               </div>
               <div className="flex justify-between items-center ">
                <h4 className='font-thin text-4xl mt-8 text-vcbgold'><CorporateCount /></h4>
                <Link href="/corporate_maintenance/corporate-registration"><p className="text-xs bg-vcblue text-white py-2 px-4 rounded-3xl  hover:bg-vcbgold cursor-pointer mt-8">VIEW ALL  &rarr;</p></Link>
               </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between">
               <div className="flex flex-row justify-between items-center">
                <p className="text-vcblue font-light">Active Users</p>
                <UserRoundCheck />
               </div>
               <div className="flex justify-between items-center ">
               <h4 className='font-thin text-4xl mt-8 text-vcbgold'><AdminCount /></h4>
                <p className="text-xs bg-vcblue text-white py-2 px-4 rounded-3xl  hover:bg-vcbgold cursor-pointer mt-8">VIEW ALL &rarr;</p>
               </div>
            </div>
        </div>
    )
}

export default HomepageCards
