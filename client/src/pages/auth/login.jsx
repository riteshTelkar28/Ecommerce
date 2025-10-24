import CommonForm from "@/components/common/form";
import { loginFormControls} from "@/components/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
    email:'',
    password:''
}
function AuthLogin(){
    const [formData,setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function onSubmit(event){
        event.preventDefault()
        dispatch(loginUser(formData)).then((data)=>{
            if(data?.payload?.success){
                console.log(data)
            }else{
                toast(data?.payload?.message,{style:{
                    backgroundColor:'red'
                }})
            }
        })
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
                onSubmit={onSubmit}
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