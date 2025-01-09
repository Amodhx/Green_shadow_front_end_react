import './App.css'
import SignIn from "./pages/SignIn.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Staff from "./pages/Staff.tsx";
import Crops from "./pages/Crops.tsx";
import Equipment from "./pages/Equipment.tsx";
import Fields from "./pages/Fields.tsx";
import Vehicle from "./pages/Vehicle.tsx";
import Logs from "./pages/Logs.tsx";

function App() {

    const routes = createBrowserRouter([
        {
            path : '',
            element : <SignIn/>,
        },
        {
            path: '/window',
            element : <RootLayout/>,
            children : [
                {path : '' , element : <Dashboard/>},
                {path : 'dashboard' , element : <Dashboard/>},
                {path : 'staff', element : <Staff/>},
                {path : 'crops', element : <Crops/>},
                {path: 'equipments', element : <Equipment/>},
                {path: 'fields', element : <Fields/>},
                {path: 'vehicles', element : <Vehicle/>},
                {path: 'logs', element : <Logs/>},
            ]
        }
    ]);
  return (
    <>
        <RouterProvider router={routes} />
    </>
  )
}

export default App
