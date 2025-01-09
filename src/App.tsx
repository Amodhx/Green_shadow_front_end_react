import './App.css'
import SignIn from "./pages/SignIn.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Staff from "./pages/Staff.tsx";

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
                // {path : '/items', element : <Items/>}
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
