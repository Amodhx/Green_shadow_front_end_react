import '../css/Sidebar.css'
import greenShadowLogo from '../assets/Green-shadow-logo.png';
import {useNavigate} from "react-router";
import {useState} from "react";

function Sidebar(){
    const navigate = useNavigate();
    const [isDashBoardActive, setDashBoardActive] = useState(false);
    const [isStaffActive, setStaffActive] = useState(false);
    const [isFieldsActive, setFieldsActive] = useState(false);
    const [isCropsActive, setCropsActive] = useState(false);
    const [isEquipmentsActive, setEquipmentsActive] = useState(false);
    const [isVehicleActive, setVehiclesActive] = useState(false);
    const [isLogsActive, setLogsActive] = useState(false);

    function dashBoardBtnClick(){
        navigate("/window/dashboard")
        deActiveAllButtons()
        setDashBoardActive(true)
    }
    function staffBtnClick(){
        navigate("/window/staff")
        deActiveAllButtons()
        setStaffActive(true)
    }
    function fieldsBtnClick(){
        deActiveAllButtons()
        setFieldsActive(true)
    }
    function cropsBtnClick(){
        deActiveAllButtons()
        setCropsActive(true)
    }
    function equipmentBtnClick(){
        deActiveAllButtons()
        setEquipmentsActive(true)
    }
    function vehicleBtnClick(){
        deActiveAllButtons()
        setVehiclesActive(true)
    }
    function logsBtnClick(){
        deActiveAllButtons()
        setLogsActive(true)
    }

    function deActiveAllButtons(){
        setDashBoardActive(false)
        setFieldsActive(false)
        setCropsActive(false)
        setEquipmentsActive(false)
        setVehiclesActive(false)
        setLogsActive(false)
        setStaffActive(false)
    }
    return(
        <>
            <div className="sidebar">

                <div className="logo">
                    <img src={greenShadowLogo} alt="Logo"/>
                </div>

                <button onClick={dashBoardBtnClick} className={`sidebar-btn ${isDashBoardActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zM13 3v6h8V3h-8z"/>
                    </svg>
                    <span>Dashboard</span>
                </button>

                <div className="separator"></div>

                <button onClick={staffBtnClick} className={`sidebar-btn ${isStaffActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45v1.5h6v-1.5c0-1.49-.81-2.61-1.97-3.45-.35-.03-.68-.05-.97-.05z"/>
                    </svg>
                    <span>Staff</span>
                </button>

                <div className="separator"></div>

                <button onClick={fieldsBtnClick} className={`sidebar-btn ${isFieldsActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-7v-5h7v5zm0-7h-7V5h7v7zm-9 7H5v-7h5v7zm0-9H5V5h5v5z"/>
                    </svg>
                    <span>Fields</span>
                </button>

                <div className="separator"></div>

                <button onClick={cropsBtnClick} className={`sidebar-btn ${isCropsActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M12 2C10.34 2 9 3.34 9 5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm0 4.5C11.17 6.5 10.5 5.83 10.5 5S11.17 3.5 12 3.5 13.5 4.17 13.5 5 12.83 6.5 12 6.5zm7 7c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 9c1.66 0 3-1.34 3-3S6.66 3 5 3 2 4.34 2 6s1.34 3 3 3zm0-4.5C5.83 4.5 6.5 5.17 6.5 6S5.83 7.5 5 7.5 3.5 6.83 3.5 6 4.17 4.5 5 4.5zm6 9H9v8h2v-3h2v3h2v-8h-2zm3.3-2.8L9.5 12.7 6.7 10 5.3 11.4 9.5 15.7l7-7L14.3 6.7z"/>
                    </svg>
                    <span>Crops</span>
                </button>

                <div className="separator"></div>

                <button onClick={equipmentBtnClick} className={`sidebar-btn ${isEquipmentsActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M19.36 2.64a3 3 0 00-4.24 0l-1.54 1.54c-.37.37-.58.87-.58 1.41s.21 1.04.58 1.41l1.18 1.18L7.4 14.53l-1.06-1.06c-.28-.28-.67-.44-1.06-.44s-.78.16-1.06.44L2.64 15.53a1.5 1.5 0 000 2.12l4.71 4.71a1.5 1.5 0 002.12 0l1.59-1.59c.28-.28.44-.67.44-1.06s-.16-.78-.44-1.06l-1.06-1.06 6.85-6.85 1.18 1.18c.37.37.87.58 1.41.58s1.04-.21 1.41-.58l1.54-1.54a3 3 0 000-4.24L19.36 2.64zM4.82 17.77L6.53 16.06l2.83 2.83-1.71 1.71-2.83-2.83z"/>
                    </svg>
                    <span>Equipment</span>
                </button>

                <div className="separator"></div>

                <button onClick={vehicleBtnClick} className={`sidebar-btn ${isVehicleActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M5 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7 11V7c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v4h3c1.1 0 2 .9 2 2v4c0 .55-.45 1-1 1h-1v1c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1H8v1c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1H4c-.55 0-1-.45-1-1v-4c0-1.1.9-2 2-2h3zm10 0V7H7v4h10z"/>
                    </svg>
                    <span>Vehicle</span>
                </button>

                <div className="separator"></div>

                <button onClick={logsBtnClick} className={`sidebar-btn ${isLogsActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 18h16V4H4v16zm11-12h-6v2h6V8zm-6 4h4v2h-4v-2zm10.5 1H18v-1.5h-2V13h2v1.5h1.5v2H18V18h-1.5v-1.5h-2v-2h2V13h1.5v-1.5h2v2z"/>
                    </svg>
                    <span>Logs</span>
                </button>
            </div>

        </>
    )
}

export default Sidebar;