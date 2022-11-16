import { Outlet } from "react-router-dom";
import NavbarProfessor from "../components/common/NavbarProfessor";

function LayoutProfessor() {

    return (
        <>
            <NavbarProfessor/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default LayoutProfessor;