import "../css/SignIn.css"
import greenShadowLogo from '../assets/Green-shadow-logo.png';

function SignIn(){
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

                    </div>
                    <div className='bg-amber-100'></div>
                </div>
            </section>
        </>
    )
}
export default SignIn;