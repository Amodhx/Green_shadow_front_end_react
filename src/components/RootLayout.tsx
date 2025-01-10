import {Outlet} from "react-router";
import SideBar from "./SideBar.tsx";

function RootLayout(){
    return(
        <>
            <div className="h-screen w-screen flex">
                <div className="w-[100px]">
                    <SideBar/>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white p-6 overflow-x-hidden overflow-y-auto ">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}

export default RootLayout;