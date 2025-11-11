import bcrypt from 'bcryptjs'
import User from '../../model/User.js';
import jwt from 'jsonwebtoken'

export const registerUser = async(request,response)=>{
    try{
        const {userName,email,password} = request.body;
        const checkUser = await User.findOne({email})
        if(checkUser){
            return response.json({
                success:false,
                message:'user already exists'
            })
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        })
        await newUser.save()
        return response.status(200).json({
            success:true,
            message:'registration Successful'
        })
    }catch(error){
        console.log(error);
        return response.status(500).json({
            status:false,
            message:'error while register'
        })        
    }
}


export const loginUser = async(request,response)=>{
    try{
        const {email,password} = request.body;
        const checkUser = await User.findOne({email})
        if(!checkUser)  response.json({
            success:false,
            message:'Please register first'
        })

        const passwordMatch = await bcrypt.compare(password,checkUser.password);
        if(!passwordMatch) response.json({
            success:false,
            message:'Password is wrong'
        })

        const token = jwt.sign(
            {
                id:checkUser._id,
                role:checkUser.role,
                email:checkUser.email,
                userName:checkUser.userName
            },
            'CLIENT_SECRET_KEY',
            {expiresIn:'24h'}
        )

        response.cookie('token',token,{httpOnly:true}).json({
            success:true,
            message:'Logged In successfully',
            user:{
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser._id,
                userName:checkUser.userName
            }
        })

    }catch(error){
        console.log(error);
        return  response.status(500).json({
            status:false,
            message:'Something Went Wrong'
        })        
    }
}

export const logoutUser = (request,response)=>{
    response.clearCookie('token').json({
        success:true,
        message:'logged out successfully'
    })
}

export const authenticateUser = async(request,response,next)=>{
    const token = request.cookies.token;
    console.log("token ",token)
    if(!token)  response.status(401).json({
        success:false,
        message:'not authenticated'
    })

    try{
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY')
        console.log("decoded token ",decoded)
        request.user = decoded
        next()
    }catch(error){
        console.log(error)
        response.status(401).json({
        success:false,
        message:'not authenticated'
    })
    }
}
