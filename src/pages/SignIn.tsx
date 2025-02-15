import "../css/SignIn.css"
import greenShadowLogo from '../assets/Green-shadow-logo.png';
import {useNavigate} from "react-router";
import {useState} from "react";
import UserModel from "../model/UserModel.ts";
import Api_call from "../services/api.call.ts";
import {useDispatch} from "react-redux";
import {setToken} from "../slices/TokenSlice.ts";
import Swal from "sweetalert2";

function SignIn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("")
    async function signInBtnClick(){
        // @ts-ignore
        event.preventDefault();
        const model = new UserModel('',userName,password,'')
        const response:any = await Api_call.postApiCall('/auth/signIn', model);
        if (response.status === 201) {
            dispatch(setToken(response.data));
            navigate("/window");
        } else if (response.status === 400) {
            Swal.fire({
                title: "Bad Request",
                text: "Invalid input or missing fields.",
                icon: "question"
            });
        } else if (response.status === 401) {
            Swal.fire({
                title: "Unauthorized",
                text: "Invalid credentials.",
                icon: "question"
            });
        } else if (response.status === 403) {
            Swal.fire({
                title: "Forbidden",
                text: "You don’t have permission.",
                icon: "question"
            });
        } else if (response.status === 404) {
            Swal.fire({
                title: "Not Found:",
                text: "The requested resource does not exist.",
                icon: "question"
            });
        } else if (response.status === 409) {
            Swal.fire({
                title: "Conflict:",
                text: "The resource already exists.",
                icon: "question"
            });
        } else if (response.status === 500) {
            Swal.fire({
                title: "Server Error:",
                text: "Something went wrong on the server.",
                icon: "question"
            });
        } else {
            Swal.fire({
                title: "Unexpected response",
                text: response,
                icon: "question"
            });
        }

    }
    return(
        <>
            <section id='loginForm'>
                <div id='signInSection'  className='flex flex-row absolute inset-0'>
                    <div>
                        <div className='mt-12 text-center place-items-center'>
                            <img src={greenShadowLogo} alt="Logo" width='85px'/>
                            <h3 className='font-medium'>Green Shadow</h3>
                            <p>Please Log in to your Account!</p>
                        </div>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <input type="email" name="email" id="email"
                                           onChange={(event)=>{
                                               setUserName(event.target.value)
                                           }}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com"/>
                                </div>
                                <div>
                                    <input type="password" name="password" id="password"
                                           onChange={(event)=>{
                                               setPassword(event.target.value)
                                           }}
                                           placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <button onClick={signInBtnClick} id='submitBtn'
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in
                                </button>
                            </form>
                        </div>


                    </div>
                    <div className='grid place-items-center'>
                        <div className='place-items-center'>
                            <h3>Green shadow (PVT) Ltd.</h3>
                            <p>We are more than just a company</p>
                            <button className="btn btn-block"
                                    data-bs-toggle="modal"
                                    data-bs-target="#forgotPasswordModal">
                                Forgot Password
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;