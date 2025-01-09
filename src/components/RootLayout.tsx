import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router";

function RootLayout(){
    return(
        <>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </>
    )
}
export default RootLayout;