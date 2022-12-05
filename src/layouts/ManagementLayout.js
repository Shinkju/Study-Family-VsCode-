import { Outlet } from "react-router-dom";
import ManagementSidebar from "../components/common/ManagementSidebar";
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