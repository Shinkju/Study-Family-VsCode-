import { Outlet } from "react-router-dom";
import NavbarStudent from "../components/common/NavbarStudent";

function LayoutStudent() {

    return (
        <>
            <NavbarStudent/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default LayoutStudent;