import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    userName:'',
    email:'',
    password:''
}
function AuthRegister(){
    const [formData,setFormData] = useState(initialState)
    console.log(formData);
    
    function onSubmit(){

    }
    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">Sign up</h1>
            </div>  
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onsubmit}
            />
            <div className="text-center">
                <p className="mt-2">Already have an account 
                    {/* <Link className='font-medium text-primary hove:underling' to='/auth/login' >Login</Link> */}
                    <Link className='font-medium text-primary hover:underline' to='/auth/login' > Login</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthRegister;