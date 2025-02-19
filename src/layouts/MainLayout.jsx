import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div>
            <section>
                {noHeaderFooter || <Navbar></Navbar>}
                
                <Outlet></Outlet>
            </section>

            {noHeaderFooter || <Footer></Footer>}
    
        </div>
    );
};

export default MainLayout;