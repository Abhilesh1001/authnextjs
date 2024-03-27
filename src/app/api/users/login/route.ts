import { connect } from "@/dbConfig/dbConfig";
import Userauth from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try{

        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)


        const user = await Userauth.findOne({email})

        if(!user){
            return NextResponse.json({error:"User Not Avilable",success:false},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)

        if (!validPassword){
            return NextResponse.json({error:"Check your credentials"},{status:500})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

         const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

          const response  =  NextResponse.json({
            message : 'Loged in successs',
            success : true
         })

         response.cookies.set('token',token,{httpOnly:true})

         return response

    }catch(error:any){
        return NextResponse.json({error :error.message})
        
    }
}