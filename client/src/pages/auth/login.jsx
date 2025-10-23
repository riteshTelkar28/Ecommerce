import CommonForm from "@/components/common/form";
import { loginFormControls} from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    email:'',
    password:''
}
function AuthLogin(){
    const [formData,setFormData] = useState(initialState)

    function onSubmit(){

    }
    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">Sign in your account</h1>
            </div>  
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onsubmit}
            />
            <div className="text-center">
                <p className="mt-2">Don't have an account?  
                    <Link className='font-medium text-primary hover:underline' to='/auth/register' > register</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthLogin;