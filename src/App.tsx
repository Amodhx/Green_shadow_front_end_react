import './App.css'
import SignIn from "./pages/SignIn.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {

    const routes = createBrowserRouter([
        {
            path : '',
            element : <SignIn/>,
        },
        {
            path: '/dashboard',
            element : <RootLayout/>,
            children : [
                {path : '' , element : <Dashboard/>},
                // {path : '/customers', element : <Customer/>},
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
