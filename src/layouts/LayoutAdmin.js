import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/common/NavbarAdmin";

function LayoutAdmin() {

    return (
        <>
            <NavbarAdmin/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default LayoutAdmin;