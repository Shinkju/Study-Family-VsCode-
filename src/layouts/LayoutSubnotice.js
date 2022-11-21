import { Outlet } from "react-router-dom";
import NavbarSubnotice from "../pages/subnotice/NavbarSubnotice";
import LayoutCSS from "./Layout.module.css"

function LayoutSubnotice() {

    return (
        <>
            <NavbarSubnotice/>
            <main className={ LayoutCSS.main}>
                <Outlet/>
            </main>
        </>
    );
}

export default LayoutSubnotice;
