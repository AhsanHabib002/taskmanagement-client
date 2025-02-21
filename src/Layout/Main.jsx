import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../SharedComponent/Navbar';

const Main = () => {
    const location = useLocation();
    const noNavFoot = location.pathname.includes('login')
    return (
        <div>
            { noNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;