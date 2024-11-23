"use client"
import { CircleUserRound, ClipboardMinus, Construction, LayoutDashboard, LogOut, PencilRuler, Settings, Grid3X3, ChartNoAxesCombined } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



type DropdownProps = {
    icon?: React.ReactNode;  // Optional icon prop
    title: string;
    items: { label: string; link: string; icon: string }[];
};


const Dropdown: React.FC<DropdownProps> = ({ title, items, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=" hover:bg-vcblue  py-1 focus:bg-vcblue cursor-pointer pl-4 text-sm font-thin border-b-2 border-gray-100 transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full p-2 pr-4 text-vcblue hover:text-white text-sm font-thin border-b-0 border-gray-200 hover:border-b-0 transition-all duration-300"
            >
                <div className='flex justify-start items-center'>
                    {icon && <span className="mr-2 text-vcbgold">{icon}</span>}
                    <span className='text-left transition-all duration-300'>{title}</span>
                </div>
                <span>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <ul className="pl-4 transition-all duration-500">
                    {items.map((item, index) => (
                        <li key={index} className="py-1">

                            <Link
                                href={item.link}
                                className="text-vcbgold divide-x-2 divide-slate-600 hover:text-white block"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default function MainSidebar () {

    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        sessionStorage.clear();
        await signOut({ redirect: false });  // Prevent automatic redirect
        router.push('/');  // Manually push to the login page
    };

    return (
        <aside className='w-60 bg-white border-r-1 border-vcblue h-full  fixed'>
            <div className='w-full flex justify-center items-center'>
                <Image
                    width={180}
                    height={75}
                    className="p-4 mt-4"
                    src="/assets/images/vcblogo.svg"
                    alt="logo"
                />
            </div>
            <ul className='mt-4'>
               <Link href="/dashboard"> <Dropdown
                    icon={<LayoutDashboard className="" />}
                    title="Dashboard"
                    items={[
                        { icon: '', label: '', link: '/dashboard' },
                    ]}
                /></Link>
                <Dropdown
                    icon={<Construction className="" />}
                    title="Maintenance"
                    items={[
                        { icon: '', label: 'Roles', link: '/dashboard/maintenance/roles' },
                        { icon: '', label: 'Security Parameters', link: '/dashboard/maintenance/security-parameters' },
                        { icon: '', label: 'Bank Admin', link: '/dashboard/maintenance/bank-admin' },
                    ]}
                />
                <Dropdown
                    icon={<PencilRuler className="" />}
                    title="Corporate Maintenance"
                    items={[
                        { icon: '', label: 'Corporate Registration', link: '/dashboard/corporate-maintenance/corporate-registration' },
                        { icon: '', label: 'Create Workgroup', link: '/dashboard/corporate-maintenance/create-workgroup' },
                        { icon: '', label: 'User Registration', link: '/dashboard/corporate-maintenance/user-registration' },
                        { icon: '', label: 'Map Workgroup', link: '/dashboard/corporate-maintenance/map-workgroup' },
                    ]}
                />
                <Dropdown
                    icon={<CircleUserRound className="" />}
                    title="Manage Corp User"
                    items={[
                        { icon: '', label: 'CIF Mapping', link: '/manage_corp_user/cif-mapping' },
                        { icon: '', label: 'CIF Account Mapping', link: '/manage_corp_user/cif-account-mapping' },
                        { icon: '', label: 'Delink Account', link: '/manage_corp_user/delink-account' },
                        { icon: '', label: 'Delink CIF', link: 'manage_corp_user/delink-cif' },
                    ]}
                />
                <Dropdown
                    icon={<ClipboardMinus className="" />}
                    title="Reports"
                    items={[
                        { icon: '', label: 'App Usage', link: 'reports/app-usage' },
                        { icon: '', label: 'Transaction Volumes', link: '/reports/transactions-volumes' },
                        { icon: '', label: 'User Activity', link: '/reports/user-activity' },
                        { icon: '', label: 'Active/Inactive Users', link: '/reports/active-inactive-users' },
                    ]}
                />
                <Dropdown
                    icon={<Settings className="" />}
                    title="Settings"
                    items={[
                        { icon: '', label: 'Reset Password', link: '/settings/reset-password' },
                        { icon: '', label: 'Enable User', link: '/settings/enable-user' },
                        { icon: '', label: 'Disable User', link: '/settings/disable-user' },
                    ]}
                />
                <Dropdown
                    icon={<Grid3X3 className="" />}
                    title="Parameters"
                    items={[
                        { icon: '', label: 'GLS', link: '/parameters/gls' },
                        { icon: '', label: 'Exchange Rates', link: '/parameters/exchange-rates' },
                        { icon: '', label: 'Charge', link: '/parameters/charge' },
                        { icon: '', label: 'Excise Duty', link: '/parameters/excise-duty' },
                    ]}
                />
                <Dropdown
                    icon={<ChartNoAxesCombined className="" />}
                    title="Monitoring"
                    items={[
                        { icon: '', label: 'Transaction Logs', link: '/dashboard/monitoring/transaction-logs' },
                        { icon: '', label: 'User Activity', link: '/monitoring/user-activity' },
                        { icon: '', label: 'Reversals', link: '/monitoring/reversals' },
                    ]}
                />
            </ul>
            <div className='flex gap-4 justify-center items-center mt-6 bg-vcblue m-4 py-6 rounded-2xl'>
                <div className='bg-white rounded-full p-2 cursor-pointer' onClick={handleSignOut}>
                <LogOut/>
                </div>
                <div>
                    <p className='text-xs text-white font-bold'>{session?.user.adminName}</p>
                    <p className='text-xs text-vcbgold'  >www.victoriabank.co.ke</p>
                </div>
            </div>
        </aside>
    );
};


