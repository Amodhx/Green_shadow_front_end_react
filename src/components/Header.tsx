import adminIcon from "../assets/maleIcon.png";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";


function Header() {
    const navigate = useNavigate()
    function onIconClick(){
        Swal.fire({
            title: "Do you want to sign out?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `Stay In`
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
                Swal.fire("Log Outed!", "", "success");
            } else if (result.isDenied) {
            }
        });

    }
    return (
        <>
            <div className="w-full h-full border-b-2 mx-4 border-b-gray-400 flex items-center">
                <img
                    onClick={onIconClick}
                    src={adminIcon} alt="Admin Icon" className="cursor-pointer mx-4 h-8 w-8 ml-auto"/>
            </div>
        </>
    )
}

export default Header