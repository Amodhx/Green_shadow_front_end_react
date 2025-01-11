import {Outlet} from "react-router";
import SideBar from "./SideBar.tsx";
import Header from "./Header.tsx";

function RootLayout(){
    return(
        <>
            <div className="h-screen w-screen flex">
                <div className="w-[100px]">
                    <SideBar/>
                </div>
                <div className="flex-1 bg-white overflow-x-hidden overflow-y-auto">
                    <div className="w-full h-12 bg-white flex items-center justify-center">
                        <Header/>
                    </div>
                    <div className="mt-2 mx-4 overflow-hidden">
                        <Outlet/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RootLayout;