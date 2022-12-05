import { Outlet } from "react-router-dom";
import ManagementSidebar from '../components/common/Managementsidebar';
import Navbar from "../components/common/Navbar";

function ManagementLayout() {

    return(
        <>
            <Navbar />
            <ManagementSidebar />
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default ManagementLayout;