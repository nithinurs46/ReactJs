import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';

const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;