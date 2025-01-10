import adminIcon from "../assets/maleIcon.png";


function Header() {
    return (
        <>
            <div className="w-full h-full border-b-2 mx-4 border-b-gray-400 flex items-center">
                <img src={adminIcon} alt="Admin Icon" className="mx-4 h-8 w-8 ml-auto"/>
            </div>
        </>
    )
}

export default Header