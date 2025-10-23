import bcrypt from 'bcryptjs'
import User from '../../model/User.js';

export const registerUser = async(request,response)=>{
    try{
        const {userName,email,password} = request.body;
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        })
        await newUser.save()
        response.status(200).json({
            success:true,
            message:'registration Successful'
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            status:false,
            message:'error while register'
        })        
    }
}


export const loginUser = async(request,response)=>{
    try{

    }catch(error){
        console.log(error);
        response.status(500).json({
            status:false,
            message:'error while login'
        })        
    }
}
