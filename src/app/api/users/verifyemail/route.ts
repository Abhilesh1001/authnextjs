import { connect } from "@/dbConfig/dbConfig";
import Userauth from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try{
        const rebody = await request.json()
        const {token} = rebody
        const user = await Userauth.findOne({verifyToken:token,verifyTokenExpire:{$gt:Date.now()}})

        if (!user){
            return NextResponse.json({error:'Invalid Token Details'},{status:400})
        }
        console.log(user)
        
        
            user.isVerified =true
            user.verifyToken = undefined
            user.verifyTokenExpire=undefined       
            await user.save()

            return NextResponse.json({message:'Email Verified successfullly',sucess : true})

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})

    }
}