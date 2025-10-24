import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
    userName:'',
    email:'',
    password:''
}
function AuthRegister(){
    const [formData,setFormData] = useState(initialState)
    // console.log(formData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    function onSubmit(event){
        event.preventDefault()
        dispatch(registerUser(formData)).then((data)=>{
            // console.log("data ",data)
            if(data?.payload?.success){
                toast(data?.payload?.message)
                navigate('/auth/login')
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
                <h1 className="text-3xl font-bold text-foreground">Sign up</h1>
            </div>  
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
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