import React, {useState} from 'react'

import { RedirectToSignIn} from '@clerk/clerk-react'

export default function Welcome() {

	// use react state to handle signing in clerk component
	const [redirect, setRedirect] = useState(false)

    const redirectToSignIn = () => {
        setRedirect(prevState => !prevState)
    }


  return (
    <div className="limiter">
		{
			!redirect ? // has the user clicked the sign in button, if no leave the below component on page
			<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-title p-b-26">
						Welcome to <br/> <span className="text-primary">JobTracker</span>
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>
					<div className="justify-content-center pt-5">
                        <div className="text-center pt-3">
                            <span className="txt1">
                                Please sign-in to continue
                            </span>
						</div>
                        <div className="text-center pt-3">
                            <button className="btn btn-primary" onClick={redirectToSignIn}>
                                Sign In
                            </button>
						</div>
					</div>
				</form>
			</div>
		</div>
		: <RedirectToSignIn/>}
	</div>
  )
}
