import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router";

function RootLayout(){
    return(
        <>
            <div>

            </div>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </>
    )
}
export default RootLayout;