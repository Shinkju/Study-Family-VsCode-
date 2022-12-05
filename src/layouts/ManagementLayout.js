import { Outlet } from "react-router-dom";
import Managementsidebar from "../components/common/Managementsidebar";
import Navbar from "../components/common/Navbar";

function ManagementLayout() {

    return(
        <>
            <Navbar />
            <Managementsidebar />
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default ManagementLayout;