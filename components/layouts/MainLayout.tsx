import React, { ReactNode } from 'react'
import MainSidebar from './MainSidebar';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

interface MainProps {
    children: ReactNode; // defines children 
}

const MainLayout: React.FC<MainProps> = ({ children }) => {
    return (
        <div className='flex w-screen h-screen '>
            <MainSidebar />
            <main className='flex-1 ml-60'>
                <MainHeader />
                {children}
                <MainFooter/>
            </main>
        </div>
    )
}

export default MainLayout
